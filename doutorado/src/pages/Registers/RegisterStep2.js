import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import Title from '../../components/Title';
import OptionsModal from './OptionsModal';

import SvgStep2Component from '../../assets/Icons/SvgStep2Component';

import style from './style';
import globalStyle from '../styles/global'

export default function RegisterStep2(){

    const route = useRoute();
    const data = route.params.data;

    const [ visibleConfirm, setVisibleConfirm ] = useState(false);

    const navigation = useNavigation();
    const goStep3 = (data) => navigation.navigate('RegisterStep3', {data}) 
    const goBack = () => navigation.goBack();

    const [ depressao, setDepressao ] = useState('');
    const [ motivacao, setMotivacao ] = useState('');

    const [ visibleDepressao, setVisibleDepressao ] = useState(false);
    const [ visibleMotivacao, setVisibleMotivacao ] = useState(false);
    
    const hideDialog = () => {
        setVisibleDepressao(false)
        setVisibleMotivacao(false)
        setVisibleConfirm(false);
    }

//EMOTICONS
    const emoticons = ['🤩','😊','😐','😞','😖','😡']
    const emoticonsText = ['Radiante','Bem','Mais ou Menos','Mal','Horrível','Estressado']

    const [ selected, setSelected ] = useState(''); //estado para cor de item selecionado

    const RenderEmoticons = () => (
        emoticons.map((element, index)=>{
            return(
                <Card 
                    key={index} 
                    style={index === selected ? style.cardSelected : style.card} 
                    onPress={()=>{setSelected(index); setFieldValue('humor.emoji', index)}}>
                        <Text style={style.emojiCard}>{element}</Text>
                        <Text style={style.emojiText}>{emoticonsText[index]}</Text>
                </Card>
            )
        })
    )

//FORMULÁRIO
    const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            ...data,
            humor: {
                emoji: '',
                depressao: '',
                motivacao: '',
            }
        },

        validationSchema: Yup.object().shape({
            humor: Yup.object().shape({
                emoji: Yup.string().when('humor.emoji', {
                    is: undefined,
                    then: Yup.string().required('Selecione uma opção')
                }),
                depressao: Yup.string().required('Selecione uma opção'),
                motivacao: Yup.string().required('Selecione uma opção')
            })
        }),

        onSubmit: (values)=>{
            //console.log(values);
            goStep3(values)
            setSubmitting(false)
        }
    })

    return(
        <>
            <Header title='Adicionar Registros' setVisibleConfirm={setVisibleConfirm}/>

            <View style={style.container}>
                <View style={style.topContainer}>
                    <SvgStep2Component />
                    <Text style={style.title}>HUMOR</Text>
                </View>

                <View style={style.formContainer}>
                <ScrollView style={{width: '100%'}}>
                <View style={style.formContainer}>

                    <View style={style.containerTitle}>
                        <Title>Como você está se sentindo hoje?</Title>
                    </View>
                    <View style={style.emoticonsContainer}>
                        {RenderEmoticons()}
                    </View>
                    {touched.humor && errors.humor &&
                        <Text style={globalStyle.textError}>{errors.humor.emoji}</Text>}

                    <View style={style.containerTitle}>
                        <Title>Motivação</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleMotivacao(true)}
                    >
                        <Text style={ motivacao[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { motivacao[1] === undefined ? 'Selecione um valor' : motivacao[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Motivação" 
                        hideDialog={hideDialog} 
                        visible={visibleMotivacao} 
                        setMotivacao={setMotivacao}
                        setFieldValue={setFieldValue}
                    />
                    {touched.humor && errors.humor &&
                        <Text style={globalStyle.textError}>{errors.humor.motivacao}</Text>}

                    <View style={style.containerTitle}>
                        <Title>Depressão</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleDepressao(true)}
                    >
                        <Text style={ depressao[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { depressao[1] === undefined ? 'Selecione um valor' : depressao[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Depressão" 
                        hideDialog={hideDialog} 
                        visible={visibleDepressao} 
                        setDepressao={setDepressao}
                        setFieldValue={setFieldValue}
                    />
                    {touched.humor && errors.humor &&
                        <Text style={globalStyle.textError}>{errors.humor.depressao}</Text>}
                        

                    <View style={style.buttonsContainer2}>                                
                        <Button 
                            children='Voltar' 
                            color='#FFF' 
                            style={globalStyle.button}
                            onPress={()=>goBack()}
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