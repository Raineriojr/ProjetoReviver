import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Picker, Item, Form } from 'native-base';
import { useNavigation, useRoute }from '@react-navigation/native'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import style from './style';
import globalStyle from '../styles/global';

import Header from '../../components/Header';
import MyDate from '../../components/MyDate';
import SvgUserComponent from '../../assets/Icons/SvgUserComponent';


export default function cadStep2(){

    const phoneRegex = /\([1-9]{2}\)\ ?[0-9]{4,5}?\-?[0-9]{4}/

    //navegação
    const navigation = useNavigation();
    
    //recebe dados vindos do step1
    const route = useRoute();
    const data = route.params.data;

    const goBack = () => navigation.goBack();
    
    function goStep3(data) {
        navigation.navigate('cadStep3', {data});
    }

    function FormattedInputMask(){
        const telefone = values.contatoPaciente.replace(/[\ ()-]/g, "")
        setFieldValue('contatoCuidador', telefone)
        handleSubmit()
    }

    //estados
    const [ genero, setGenero ] = useState({selected: ''});
    
    //formulário
    const { handleSubmit, setFieldValue, setSubmitting, isSubmitting, values, errors, touched } = useFormik({
        initialValues: {
            ...data,
            nomeCuidador: '',
            nascCuidador: '',
            sexoCuidador: '',
            contatoCuidador: '',
        },

        validationSchema: Yup.object({
            nomeCuidador: Yup.string().required('Insira seu Nome'),
            sexoCuidador: Yup.string().required('Selecione o sexo'),
            contatoCuidador: Yup.string().required('Insira um contato').matches(phoneRegex, 'Informe um número válido'),
        }),

        onSubmit:(values) => {
            setSubmitting(false);
            goStep3(values);
        }
    })

    return(
        <>
            <Header title='Cadastro'/>
            
            <View style={style.container}>
                <View style={style.topContainer}> 
                    <SvgUserComponent/>
                    <Text style={style.title}>Dados do Cuidador</Text>
                </View>
                
                <ScrollView style={style.scroll}>
            
                    <Form  style={style.formContainer}>
                        <TextInput 
                            placeholder='Nome' 
                            returnKeyType='next' 
                            style={globalStyle.input} 
                            onChangeText={text => setFieldValue('nomeCuidador', text)}
                            value={values.nomeCuidador}
                        />
                        {touched.nomeCuidador && errors.nomeCuidador &&
                            <Text style={globalStyle.textError}>{errors.nomeCuidador}</Text>}

                        <MyDate name="nascCuidador" values={values} setFieldValue={setFieldValue}/>

                        <Item style={style.itemPicker}>
                            <Picker 
                                style={{padding: "5.5%"}} 
                                selectedValue={genero.selected} 
                                onValueChange={(text) => {
                                    setFieldValue('sexoCuidador', text)
                                    setGenero({selected: text})
                                }} 
                            >
                                <Picker.Item color="#7B7B7B" label="Sexo" value="" key={0}/>
                                <Picker.Item color='#2F364B' label="Masculino" value="m" key={1}/>
                                <Picker.Item color='#2F364B' label="Feminino" value="f" key={2}/>
                            </Picker>
                        </Item>
                        {touched.sexoCuidador && errors.sexoCuidador &&
                            <Text style={globalStyle.textError}>{errors.sexoCuidador}</Text>}

                        <TextInput  
                            placeholder='Contato'
                            keyboardType="numeric"
                            style={globalStyle.input}                            
                            render={(props) => (
                                <TextInputMask
                                  {...props}
                                  value={values.contatoCuidador}
                                  type="cel-phone"
                                  onChangeText={(text) => setFieldValue('contatoCuidador',text)}
                                />
                              )}
                        />
                        {touched.contatoCuidador && errors.contatoCuidador &&
                            <Text style={globalStyle.textError}>{errors.contatoCuidador}</Text>}
                    </Form>
                    
                    <View style={style.buttonsContainer2}>
                        <Button 
                            onPress={goBack}
                            children='Voltar' 
                            color='#FFF' 
                            style={globalStyle.button}
                            disabled={isSubmitting}
                        />
                        <Button 
                            onPress={()=>FormattedInputMask()}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            children='Próximo' 
                            color='#F9A749' 
                            style={globalStyle.button2}
                        />
                    </View>   
                </ScrollView>
                         
            </View>
                   
        </>
        
    )
}

