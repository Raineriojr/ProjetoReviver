import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';
import { AuthContext } from '../../context/authContext';
import { cpfRegex } from '../../config/regex';
import requestPermissions from '../../services/notification/requestPermissions';

import style from './style';
import globalStyle from '../styles/global'

import SvgLogoComponent from '../../assets/Icons/SvgLogoComponent';

export default function Login({ navigation }){

    const { dispatch } = React.useContext(AuthContext);
  
    const height = Math.round(Dimensions.get('window').height);
    const accountIcon = <MaterialCommunityIcons name='account' size={22} color='#040404'/>
    const passwordIcon = <MaterialCommunityIcons name='lock' size={20} color='#040404'/>

    useEffect(()=>{
        getToken();
        resetForm();
    }, [])

//navegação
    const pageRegister = () => navigation.navigate('cadStep1');

//estados
    const [remember, setRemember] = useState('checked');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

//pega token dispositivo, gerado em requestPermissions.js
    async function getToken(){
        requestPermissions().then((token)=>{
            setToken(token);
        })
    }
    
//Aciona checkBox
    const Remember = () => remember === 'checked' ? setRemember('unchecked') : setRemember('checked');
    
//formata cpf para apenas numeros
    async function FormattedInputMask(){
        const cpf = values.cpf.replace(/[\.-]/g, "")
        await setFieldValue('cpf', cpf)
        await setFieldValue('token', token);
        handleSubmit()
    }

//Formulario
    const {handleSubmit, setFieldValue, isSubmitting, values, errors, touched, resetForm} = useFormik({
            initialValues: {
                cpf: '',
                senha: '',
                token: '',
            },

            validationSchema: Yup.object({
                cpf: Yup.string().required('Insira seu cpf').matches(cpfRegex, "Informe um cpf válido"),
                senha: Yup.string().required('Insira sua senha'),
                token: Yup.string().required()
            }),

            onSubmit: async (values, {setSubmitting}) => {
                try{
                    const resp = await api.post('/login', values)

                    if(resp.status === 200){
                        setSubmitting(false);
                        resetForm();
                        
                        await AsyncStorage.setItem('@username', resp.data.nomePaciente);
                        await AsyncStorage.setItem('@userId', String(resp.data.id_paciente));

                        if(remember == 'checked'){
                            await AsyncStorage.setItem('@login_user', resp.data.cpf);
                        }

                        dispatch({ type: 'login', payload: resp.data.nomePaciente, payload2: resp.data.id_paciente })  
                    }
                }
                catch(erro) {
                    setSubmitting(false);
                    Alert.alert('Erro', "Usuário ou senha incorretos.")
                }
            }
        })
    
    if(loading){
        return <AppLoading />
    }
    return(
        <ScrollView>
            <SafeAreaView style={[{ minHeight: height }, style.container]}> 
            
                <View style={style.header}>
                   <SvgLogoComponent/>
                </View>

        
                <View style={style.formContainer}>
                    <TextInput 
                        placeholder='CPF' 
                        keyboardType="numeric"
                        style={globalStyle.input}
                        left={<TextInput.Icon disabled name={()=>accountIcon}/>} 
                        render={(props) => (
                            <TextInputMask
                                {...props}
                                value={values.cpf}
                                type="cpf"
                                onChangeText={(text) => setFieldValue('cpf', text)}
                            />
                            )}
                    />
                    {touched.cpf && errors.cpf && 
                        <Text style={globalStyle.textErrorLogin}>{errors.cpf}</Text>}

                    <TextInput 
                        placeholder='Senha'
                        secureTextEntry={true}
                        style={globalStyle.input}
                        left={<TextInput.Icon disabled name={()=>passwordIcon}/>}
                        onChangeText={text => setFieldValue('senha', text)}
                        value={values.senha}
                    />
                        {touched.senha && errors.senha && 
                            <Text style={globalStyle.textErrorLogin}>{errors.senha}</Text>
                        }

                    <View style={style.checkboxContainer}>
                        <Checkbox 
                            onPress={Remember} 
                            status={remember} 
                            uncheckedColor='#F9A749' 
                            color='#F9A749' />
                        <Text style={style.textRemember}>Lembre de mim</Text>
                    </View>

                    <Button 
                        onPress={()=>FormattedInputMask()}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        children='Login' 
                        color='#fff' 
                        style={globalStyle.buttonLogin}/>
                </View>
     
                
                <View style={style.footerContainer}>
                    <View style={style.containerTextRegister}>
                        <Text style={style.textNewUser}>Novo Usuário? </Text>
                            <TouchableOpacity onPress={pageRegister}>
                                <Text style={style.textRegister}>Cadastre-se</Text>
                            </TouchableOpacity>
                    </View>
                    <Text style={style.textProject}>Projeto Reviver 
                        <MaterialCommunityIcons name="copyright" size={14}/>
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
