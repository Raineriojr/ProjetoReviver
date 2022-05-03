import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import Title from '../../components/Title';
import OptionsModal from './OptionsModal';

import SvgStep4Component from '../../assets/Icons/SvgStep4Component';

import style from './style';
import globalStyle from '../styles/global';

export default function RegisterStep4(){
    const route = useRoute();
    const data = route.params.data;

    const navigation = useNavigation();
    const goBack = () => navigation.goBack();
    const goFingerTap = (data) => navigation.navigate('fingerTap', {data})

    const [ levantar, setLevantar ] = useState('');
    const [ postura, setPostura ] = useState('');
    const [ marcha, setMarcha ] = useState('');
    const [ lentidao, setLentidao ] = useState('');
    const [ tremor, setTremor ] = useState('');

    const [ visibleLevantar, setVisibleLevantar ] = useState(false);
    const [ visiblePostura, setVisiblePostura ] = useState(false);
    const [ visibleMarcha, setVisibleMarcha ] = useState(false);
    const [ visibleLentidao, setVisibleLentidao ] = useState(false);
    const [ visibleTremor, setVisibleTremor ] = useState(false);

    const hideDialog = () => {
        setVisibleLevantar(false)
        setVisiblePostura(false)
        setVisibleMarcha(false)
        setVisibleLentidao(false)
        setVisibleTremor(false)
    }

    const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            ...data,
            sintomas: {
                ...data.sintomas,
                levantar: '',
                postura: '',
                marcha: '',
                lentidao: '',
                tremor: '',
            }
        },

        validationSchema: Yup.object().shape({
            sintomas: Yup.object().shape({
                levantar: Yup.string().required('Selecione um valor'),
                postura: Yup.string().required('Selecione um valor'),
                marcha: Yup.string().required('Selecione um valor'),
                lentidao: Yup.string().required('Selecione um valor'),
                tremor: Yup.string().required('Selecione um valor'),
            })
        }),

        onSubmit: (values)=>{
            goFingerTap(values)
            setSubmitting(false)
        }
    })

    return(
        <>
            <Header title='Adicionar Registros'/>

            <View style={style.container}>
                <View style={style.topContainer}>
                    <SvgStep4Component />
                    <Text style={style.title}>SINTOMAS</Text>
                </View>

                <View style={style.formContainer}>
                <ScrollView style={{width: '100%'}}>
                <View style={style.formContainer}>

                    <View style={style.containerTitle}>
                        <Title>Tremor</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleTremor(true)}
                    >
                        <Text style={tremor[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { tremor[1] === undefined ? 'Selecione um valor' : tremor[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Tremor" 
                        hideDialog={hideDialog} 
                        visible={visibleTremor} 
                        setTremor={setTremor}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.tremor}</Text>}

                    <View style={style.containerTitle}>
                        <Title>Levantar da cadeira</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleLevantar(true)}
                    >
                        <Text style={ levantar[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { levantar[1] === undefined ? 'Selecione um valor' : levantar[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Levantar da cadeira" 
                        hideDialog={hideDialog} 
                        visible={visibleLevantar} 
                        setLevantar={setLevantar}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.levantar}</Text>}

                   
                    <View style={style.containerTitle}>
                        <Title>Postura</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisiblePostura(true)}
                    >
                        <Text style={postura[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { postura[1] === undefined ? 'Selecione um valor' : postura[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Postura" 
                        hideDialog={hideDialog} 
                        visible={visiblePostura} 
                        setPostura={setPostura}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.postura}</Text>}


                    <View style={style.containerTitle}>
                        <Title>Marcha</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleMarcha(true)}
                    >
                        <Text style={marcha[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { marcha[1] === undefined ? 'Selecione um valor' : marcha[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Marcha" 
                        hideDialog={hideDialog} 
                        visible={visibleMarcha} 
                        setMarcha={setMarcha}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.marcha}</Text>}


                    <View style={style.containerTitle}>
                        <Title>Lentidão dos Movimentos</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleLentidao(true)}
                    >
                        <Text style={lentidao[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { lentidao[1] === undefined ? 'Selecione um valor' : lentidao[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Lentidão dos movimentos" 
                        hideDialog={hideDialog} 
                        visible={visibleLentidao} 
                        setLentidao={setLentidao}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.lentidao}</Text>}
                    <View style={style.buttonsContainer}>                                
                        <Button 
                            children='Voltar' 
                            color='#FFF' 
                            style={globalStyle.button}
                            onPress={()=>goBack()}
                            disabled={isSubmitting}
                        />
                        <Button 
                            children='Próximo' 
                            color='#fff' 
                            style={globalStyle.buttonFinish}
                            onPress={handleSubmit}
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