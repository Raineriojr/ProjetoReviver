import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Form } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';

import style from './style';
import globalStyle from '../styles/global';

import SvgSecurityComponent from '../../assets/Icons/SvgSecurityComponent';
import Header from '../../components/Header';


export default function cadStep3(){

    //navegação
    const navigation = useNavigation();
    const goBack = () => navigation.goBack();
    const pageLogin = () =>  navigation.navigate('Login')
    const pageConfirm = () => navigation.navigate('finishStep');

    //Recebe dados vindos do step2
    const route = useRoute();
    const data = route.params.data;

    //formulário
    const { handleSubmit, setFieldValue, setSubmitting, isSubmitting, values, touched, errors } = useFormik({
        initialValues:{
            ...data,
            senha: '',
            confirmaSenha: ''
        },

        validationSchema: Yup.object().shape({
            senha: Yup.string()
                    .required('Insira uma senha')
                    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
            confirmaSenha: Yup.string()
                    .required('Confirme sua senha')
                    .oneOf([Yup.ref('senha'), null], 'As senhas não são iguais')
        }),

        onSubmit: (values) => {
            try {
                api.post('/cadastro', values).then((resp)=>{
                    if(resp.status == 200){
                        setSubmitting(false)
                        pageConfirm();
                    } 
                })

                
            } catch (error) {
                setSubmitting(false)
                Alert.alert('Erro','Usuário já cadastrado')
                setTimeout(()=>{
                    pageLogin();
                }, 2000)
            }
        }
    })

    return(
        <>
            <Header title='Cadastro'/>
            
            <View style={style.container}>
                <View style={style.topContainer}> 
                    <SvgSecurityComponent/>
                    <Text style={style.title}>Segurança</Text>
                </View>
                
                <ScrollView style={style.scroll}>
                    <Form style={style.formContainer}>
                        <TextInput 
                            placeholder='Senha' 
                            returnKeyType='next' 
                            style={globalStyle.input} 
                            onChangeText={text => setFieldValue('senha', text)}
                            value={values.senha}
                        />
                        {touched.senha && errors.senha &&
                         <Text style={globalStyle.textError}>{errors.senha}</Text>}

                        <TextInput 
                            placeholder='Confirmar Senha' 
                            style={globalStyle.input}
                            onChangeText={text => setFieldValue('confirmaSenha', text)}
                            value={values.confirmaSenha}
                        />
                        {touched.confirmaSenha && errors.confirmaSenha &&
                         <Text style={globalStyle.textError}>{errors.confirmaSenha}</Text>}

                    </Form>
                        <View style={style.buttonsContainer3}>                                
                            <Button 
                                children='Voltar' 
                                color='#FFF' 
                                style={globalStyle.button}
                                onPress={goBack}
                                disabled={isSubmitting}
                            />
                            <Button 
                                children='Confirmar' 
                                color='#fff' 
                                style={globalStyle.buttonFinish}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                            />
                        </View> 
                </ScrollView>
                        
            </View>
                   
        </>
        
    )
}