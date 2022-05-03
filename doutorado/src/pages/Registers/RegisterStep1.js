import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox, Paragraph } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Title from '../../components/Title';

import SvgStep1Component from '../../assets/Icons/SvgStep1Component';
import ReturnModal from '../AddRemedy/Modals/ReturnModal';

import style from './style';
import globalStyle from '../styles/global';

export default function RegisterStep1(){
    
    const [ visibleConfirm, setVisibleConfirm ] = useState(false);
    const hideDialog = () => {
        setVisibleConfirm(false);
    }

    const navigation = useNavigation();
    const goStep2 = (data) => navigation.navigate('RegisterStep2', {data});

    const [ checked0, setChecked0 ] = useState('unchecked');
    const [ checked1, setChecked1 ] = useState('unchecked');
    const [ checked2, setChecked2 ] = useState('unchecked');
    const [ checked3, setChecked3 ] = useState('unchecked');
    
    const Check = (e) => {
        if(e === 0) {
            if(checked0 === 'unchecked'){
                setChecked0('checked')
                setFieldValue('sinaisVitais.pressao1', '')
                setFieldValue('sinaisVitais.pressao2', '')
               
            } else{
                setChecked0('unchecked')
            }
        }
        if(e === 1) checked1 === 'unchecked' ? (setChecked1('checked'), setFieldValue('sinaisVitais.freqCardiaca', '')) : setChecked1('unchecked');
        if(e === 2) checked2 === 'unchecked' ? (setChecked2('checked'), setFieldValue('sinaisVitais.saturacao', '')) : setChecked2('unchecked');
        if(e === 3) checked3 === 'unchecked' ? (setChecked3('checked'), setFieldValue('sinaisVitais.glicemia', '')) : setChecked3('unchecked');
    }
    
    const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue, setSubmitting } = useFormik({
        initialValues: {
            sinaisVitais:{
                pressao1: '',
                pressao2: '',
                freqCardiaca: '',
                saturacao: '',
                glicemia: '',
            },
           
        },

        validationSchema: Yup.object().shape({
            sinaisVitais: Yup.object().shape({
                pressao1: Yup.string().when('sinaisVitais.pressao1', {
                    is: () => checked0 === 'unchecked',
                    then: Yup.string().required('Insira um valor ou marque "Não informar"'),
                    otherwise: Yup.string()
                }),
                pressao2: Yup.string().when('sinaisVitais.pressao2', {
                    is: () => checked0 === 'unchecked',
                    then: Yup.string().required('Insira um valor ou marque "Não informar"'),
                    otherwise: Yup.string()
                }),
                freqCardiaca: Yup.string().when('sinaisVitais.freqCardiaca', {
                    is: () => checked1 === 'unchecked',
                    then: Yup.string().required('Insira um valor ou marque "Não informar"'),
                    otherwise: Yup.string()
                }),
                saturacao: Yup.string().when('sinaisVitais.saturacao', {
                    is: () => checked2 === 'unchecked',
                    then: Yup.string().required('Insira um valor ou marque "Não informar"'),
                    otherwise: Yup.string()
                }),
                glicemia: Yup.string().when('sinaisVitais.glicemia', {
                    is: () => checked3 === 'unchecked',
                    then: Yup.string().required('Insira um valor ou marque "Não informar"'),
                    otherwise: Yup.string()
                })
            })
        }),

        onSubmit: async (values) => {
            goStep2(values);
            setSubmitting(false);
        }
    })

    return(
        <>
            <Header title='Adicionar Registros' setVisibleConfirm={setVisibleConfirm}/>

            <View style={style.container}>
                <View style={style.topContainer}>
                    <SvgStep1Component />
                    <Text style={style.title}>SINAIS VITAIS</Text>
                    <Paragraph style={style.subTitle}>Insira os dados ou selecione "Não informar" para prosseguir.</Paragraph>
                </View>

                <View style={style.formContainer}>
                <ScrollView style={{width: '100%'}}>
                <View style={style.formContainer}>

                    <ReturnModal visible={visibleConfirm} setVisibleConfirm={setVisibleConfirm} hideDialog={hideDialog}/>

                    <View style={style.containerTitle}>
                        <Title>Pressão Arterial</Title>
                        <TouchableOpacity style={style.checkContainer} onPress={()=>Check(0)}>
                            <Checkbox 
                                key={0}
                                uncheckedColor='#F9A749' 
                                color='#F9A749'  
                                status={checked0}
                            />
                                <Text style={style.textCheckContainer}>Não informar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={style.containerPressaoInput}>
                        <TextInput  
                            placeholder='1º valor'
                            keyboardType="numeric"
                            disabled={ checked0 === 'checked' ? true : false}
                            style={style.pressaoInput}
                            onChangeText={(text) => setFieldValue('sinaisVitais.pressao1', text)}
                            value={values.sinaisVitais.pressao1}
                        />    

                        <MaterialCommunityIcons name="close" size={22}/>
                        <TextInput  
                            placeholder='2º valor'
                            keyboardType="numeric"
                            disabled={ checked0 === 'checked' ? true : false}
                            style={style.pressaoInput}
                            onChangeText={(text) => setFieldValue('sinaisVitais.pressao2', text)}
                            value={values.sinaisVitais.pressao2}
                        />    
                    </View>                    

                    <View style={style.containerTitle}>
                        <Title>Frequência Cardíaca</Title>
                        <TouchableOpacity style={style.checkContainer} onPress={()=>Check(1)}>
                            <Checkbox 
                                key={1}
                                uncheckedColor='#F9A749' 
                                color='#F9A749'  
                                status={checked1}
                            />
                                <Text style={style.textCheckContainer}>Não informar</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput  
                        placeholder='BPM'
                        style={style.input}
                        keyboardType="numeric"
                        disabled={ checked1 === 'checked' ? true : false}
                        onChangeText={(text) => setFieldValue('sinaisVitais.freqCardiaca',text)}
                        value={values.sinaisVitais.freqCardiaca}
                    /> 
                                     

                    <View style={style.containerTitle}>
                        <Title>Saturação</Title>
                        <TouchableOpacity style={style.checkContainer} onPress={()=>Check(2)}>
                            <Checkbox 
                                key={2}
                                uncheckedColor='#F9A749' 
                                color='#F9A749'  
                                status={checked2}
                            />
                                <Text style={style.textCheckContainer}>Não informar</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput  
                        placeholder='%'
                        style={style.input}
                        keyboardType="numeric"
                        disabled={ checked2 === 'checked' ? true : false}
                        onChangeText={(text) => setFieldValue('sinaisVitais.saturacao',text)}
                        value={values.sinaisVitais.saturacao}
                    />  
                                    

                    <View style={style.containerTitle}>
                        <Title>Glicemia</Title>
                        <TouchableOpacity style={style.checkContainer} onPress={()=>Check(3)}>
                            <Checkbox 
                                key={3}
                                uncheckedColor='#F9A749' 
                                color='#F9A749'  
                                status={checked3}
                            />
                                <Text style={style.textCheckContainer}>Não informar</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput  
                        placeholder='mg/dl'
                        style={style.input}
                        keyboardType="numeric"
                        disabled={ checked3 === 'checked' ? true : false}
                        onChangeText={(text) => setFieldValue('sinaisVitais.glicemia',text)}
                        value={values.sinaisVitais.glicemia}
                    />  
                    
                    <View style={style.buttonsContainer}>                                
                        <Button 
                            children='Voltar' 
                            color='#FFF' 
                            style={globalStyle.button}
                            onPress={()=>setVisibleConfirm(true)}
                            disabled={isSubmitting}
                        />
                        <Button 
                            children='Avançar' 
                            color='#fff' 
                            style={globalStyle.buttonFinish}
                            onPress={()=>handleSubmit()}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        />
                    </View>
                    
                </View>
                </ScrollView>
                </View>
            </View>
        </>
    )
}