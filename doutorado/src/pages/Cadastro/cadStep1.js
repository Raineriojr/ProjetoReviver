import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Picker, Item, Form } from 'native-base';
import { useNavigation }from '@react-navigation/native'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import style from './style';
import globalStyle from '../styles/global';

import Header from '../../components/Header';
import MyDate from '../../components/MyDate'
import SvgUserComponent from '../../assets/Icons/SvgUserComponent';


export default function cadStep1(){

    const phoneRegex = /\([1-9]{2}\)\ ?[0-9]{4,5}?\-?[0-9]{4}/
    const cpfRegex = /([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})/

    //navegação
    const navigation = useNavigation();
    
    const goBack = () => navigation.goBack();
    
    function goStep2(data) {
        navigation.navigate('cadStep2', {data});
    }

    //estados
    const [ genero, setGenero ] = useState({selected: ''});
    const [ diagnostico, setDiagnostico ] = useState({selected: ''});   
    
    function FormattedInputMask(){
        const cpf = values.cpf.replace(/[\.-]/g, "")
        const telefone = values.contatoPaciente.replace(/[\ ()-]/g, "")

        setFieldValue('cpf', cpf)
        setFieldValue('contatoPaciente', telefone)
        handleSubmit()
    }

    //formulário
    const { handleSubmit, setFieldValue, setSubmitting, isSubmitting, values, errors, touched } = useFormik({
        initialValues: {
            nomePaciente: '',
            cpf: '',
            nascPaciente: '',
            sexoPaciente: '',
            contatoPaciente: '',
            diagnostico: ''
        },

        validationSchema: Yup.object({
            nomePaciente: Yup.string().required('Insira seu Nome'),
            cpf: Yup.string().required('Insira seu CPF').matches(cpfRegex, 'Informe um cpf válido.'),
            contatoPaciente: Yup.string().required('Insira seu contato').matches(phoneRegex, 'Informe um número válido.'),
            sexoPaciente: Yup.string().required('Selecione o sexo'),
            diagnostico: Yup.string().required('Selecione o Diagnóstico')
        }),

        onSubmit:(values) => {            
            setSubmitting(false);
            goStep2(values);
        }
    })

    return(
        <>
            <Header title='Cadastro'/>
            
            <View style={style.container}>
                <View style={style.topContainer}> 
                    <SvgUserComponent/>
                    <Text style={style.title}>Dados do Paciente</Text>
                </View>
                
                <ScrollView style={style.scroll}>

                    <Form  style={style.formContainer}>
                        <TextInput 
                            placeholder='Nome' 
                            returnKeyType='next' 
                            style={globalStyle.input} 
                            onChangeText={text => setFieldValue('nomePaciente', text)}
                            value={values.nomePaciente}
                        />
                        {touched.nomePaciente && errors.nomePaciente &&
                            <Text style={globalStyle.textError}>{errors.nomePaciente}</Text>}

                
                        <TextInput 
                            placeholder='CPF' 
                            returnKeyType='next'
                            keyboardType="numeric"
                            style={globalStyle.input} 
                            render={(props) => (
                                <TextInputMask
                                  {...props}
                                  value={values.cpf}
                                  type="cpf"
                                  onChangeText={text => setFieldValue('cpf', text)}
                                />
                              )}
                        />
                        {touched.cpf && errors.cpf &&
                            <Text style={globalStyle.textError}>{errors.cpf}</Text>}
                            
                        
                        <MyDate name="nascPaciente" values={values} setFieldValue={setFieldValue} />

                        <Item style={style.itemPicker}>
                            <Picker 
                                style={{padding: "5.5%"}}
                                selectedValue={genero.selected} 
                                onValueChange={(text) => {
                                    setFieldValue('sexoPaciente', text)
                                    setGenero({selected: text})
                                }} 
                            >
                                <Picker.Item color="#7B7B7B" label="Sexo" value="" key={0}/>
                                <Picker.Item color='#2F364B' label="Masculino" value="m" key={1}/>
                                <Picker.Item color='#2F364B' label="Feminino" value="f" key={2}/>
                            </Picker>
                        </Item>
                        {touched.sexoPaciente && errors.sexoPaciente &&
                            <Text style={globalStyle.textError}>{errors.sexoPaciente}</Text>}

                        <TextInput  
                            placeholder='Contato'
                            keyboardType="numeric"
                            style={globalStyle.input}                            
                            render={(props) => (
                                <TextInputMask
                                  {...props}
                                  value={values.contatoPaciente}
                                  type="cel-phone"
                                  onChangeText={(text) => setFieldValue('contatoPaciente',text)}
                                />
                              )}
                            />
                        {touched.contatoPaciente && errors.contatoPaciente &&
                            <Text style={globalStyle.textError}>{errors.contatoPaciente}</Text>}

                        
                        <Item style={style.itemPicker}>
                            <Picker 
                                style={{padding: "5.5%"}}
                                selectedValue={diagnostico.selected} 
                                onValueChange={(text) => {
                                    setFieldValue('diagnostico', text)
                                    setDiagnostico({selected: text})
                                }} 
                            >
                                <Picker.Item color="#7B7B7B" label="Diagnóstico" value="" key={0}/>
                                <Picker.Item color='#2F364B' label="Parkinson" value="parkinson" key={1}/>
                                <Picker.Item color='#2F364B' label="Alzheimer" value="alzheimer" key={2}/>
                                <Picker.Item color='#2F364B' label="Parkinson e Alzheimer" value="parkinson e alzheimer" key={3}/>
                            </Picker>
                        </Item>
                        {touched.diagnostico && errors.diagnostico &&
                            <Text style={globalStyle.textError}>{errors.diagnostico}</Text>}

                    </Form>
                    <View style={style.buttonsContainer}>
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

