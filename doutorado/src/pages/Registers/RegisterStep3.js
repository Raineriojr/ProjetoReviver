import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../components/Header';
import Title from '../../components/Title';
import OptionsModal from './OptionsModal';

import SvgStep3Component from '../../assets/Icons/SvgStep3Component';

import style from './style';
import globalStyle from '../styles/global';

export default function RegisterStep3(){
    const route = useRoute();
    const data = route.params.data;

    const navigation = useNavigation();
    const goBack = () => navigation.goBack();
    const goStep4 = (data) => navigation.navigate('RegisterStep4', {data}) 

    const [ fala, setFala ] = useState('');
    const [ degluticao, setDegluticao ] = useState('');
    const [ higiene, setHigiene ] = useState('');
    const [ movimentoNaCama, setMovimentoNaCama ] = useState('');
    const [ caminhar, setCaminhar ] = useState('');

    const [ visibleFala, setVisibleFala ] = useState(false);
    const [ visibleDegluticao, setVisibleDegluticao ] = useState(false);
    const [ visibleHigiene, setVisibleHigiene ] = useState(false);
    const [ visibleMovimentoNaCama, setVisibleMovimentoNaCama ] = useState(false);
    const [ visibleCaminhar, setVisibleCaminhar ] = useState(false);

    const hideDialog = () => {
        setVisibleFala(false)
        setVisibleDegluticao(false)
        setVisibleHigiene(false)
        setVisibleMovimentoNaCama(false)
        setVisibleCaminhar(false)
    }

    const { values, errors, touched, isSubmitting, setSubmitting, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            ...data,
            sintomas:{
                fala: '',
                degluticao: '',
                higiene: '',
                movimentoNaCama: '',
                caminhar: '',
                }
        },

        validationSchema: Yup.object().shape({
            sintomas: Yup.object().shape({
                fala: Yup.string().required('Selecione uma opção'),
                degluticao: Yup.string().required('Selecione uma opção'),
                higiene: Yup.string().required('Selecione uma opção'),
                movimentoNaCama: Yup.string().required('Selecione uma opção'),
                caminhar: Yup.string().required('Selecione uma opção'),
                
            })
        }),

        onSubmit: (values)=>{
            //console.log(values);
            goStep4(values)
            setSubmitting(false)
        }
    })

    return(
        <>
            <Header title='Adicionar Registros'/>

            <View style={style.container}>
                <View style={style.topContainer}>
                    <SvgStep3Component />
                    <Text style={style.title}>SINTOMAS</Text>
                </View>

                <View style={style.formContainer}>
                <ScrollView style={{width: '100%'}}>
                <View style={style.formContainer}>

                    <View style={style.containerTitle}>
                        <Title>Fala</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleFala(true)}
                    >
                        <Text style={fala[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { fala[1] === undefined ? 'Selecione' : fala[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Fala" 
                        hideDialog={hideDialog} 
                        visible={visibleFala} 
                        setFala={setFala}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.fala}</Text>}
    

                    <View style={style.containerTitle}>
                        <Title>Deglutição</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleDegluticao(true)}
                    >
                        <Text style={ degluticao[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { degluticao[1] === undefined ? 'Selecione' : degluticao[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Deglutição" 
                        hideDialog={hideDialog} 
                        visible={visibleDegluticao} 
                        setDegluticao={setDegluticao}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.degluticao}</Text>}


                    <View style={style.containerTitle}>
                        <Title>Higiene</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleHigiene(true)}
                    >
                        <Text style={higiene[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { higiene[1] === undefined ? 'Selecione' : higiene[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Higiene" 
                        hideDialog={hideDialog} 
                        visible={visibleHigiene} 
                        setHigiene={setHigiene}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.higiene}</Text>}


                    <View style={style.containerTitle}>
                        <Title>Movimentar-se na cama</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleMovimentoNaCama(true)}
                    >
                        <Text style={movimentoNaCama[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { movimentoNaCama[1] === undefined ? 'Selecione' : movimentoNaCama[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Movimentar-se na cama" 
                        hideDialog={hideDialog} 
                        visible={visibleMovimentoNaCama} 
                        setMovimentoNaCama={setMovimentoNaCama}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.movimentoNaCama}</Text>}


                    <View style={style.containerTitle}>
                        <Title>Caminhar</Title>
                    </View>
                    <TouchableOpacity 
                        style={style.buttonModal} 
                        onPress={()=>setVisibleCaminhar(true)}
                    >
                        <Text style={caminhar[1] === undefined ? style.textButtonModal : style.textButtonModalSelected}>
                            { caminhar[1] === undefined ? 'Selecione' : caminhar[1] }
                        </Text>
                    </TouchableOpacity>
                    <OptionsModal 
                        name="Caminhar" 
                        hideDialog={hideDialog} 
                        visible={visibleCaminhar} 
                        setCaminhar={setCaminhar}
                        setFieldValue={setFieldValue}
                    />
                    {touched.sintomas && errors.sintomas &&
                        <Text style={globalStyle.textError}>{errors.sintomas.caminhar}</Text>}


                    <View style={style.buttonsContainer}>                                
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