import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';

import { AuthContext } from '../../context/authContext';
import api from '../../services/api';

import Modal from './Modal';
import style from './style';
import globalStyle from '../styles/global';

export default function FingerTap({ navigation }){
    const { state } = React.useContext(AuthContext);
//estados
    const [ count, setCount ] = useState(0);
    const [ seconds, setSeconds ] = useState(0);
    const [ loading, setLoading ] = useState(false);

//dados vindos de RegisterStep4
    const route = useRoute();
    const data = route.params.data;

//navegação
    const Finish = () => navigation.navigate('finishRegister');
    const goHome = () => navigation.navigate('Home')

    useEffect(() => { //evita voltar para screen anterior
            const backAction = () => {
              
            };
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
            return () => backHandler.remove();
    }, []);

    const { handleSubmit, setFieldValue } = useFormik({
        initialValues:{
            ...data,
            fingerTap: ''
        },

        onSubmit: async (values) =>{
            setLoading(true)
            try {
                const userId = state.userId;
                await api.post('/registros/novo', values, {headers:{
                        authorization: userId 
                    }}).then((resp)=>{
                        if(resp.status === 200){
                            setLoading(false)
                            Finish();
                        } 
                    })
            } catch (error) {
                setLoading(false)
                Alert.alert('Erro ao salvar registro.')
                setTimeout(()=>{
                    goHome();
                }, 2000)
            }
            
            setLoading(false)
        }
    })

    const setFingerTap = () =>{
        setFieldValue('fingerTap', count);
        handleSubmit();
    }
    
    const Timer = () =>{
        let time = 0;
        const resp = setInterval(()=>{
            time += 1;
            setSeconds(time)

            if(time > 14){
                clearInterval(resp);
            }
        }, 1000)
    }


    return(
        <>
        <Modal Timer={Timer}/>
        <View style={style.container}>
            <View style={style.topContainer}>
                <Text style={style.title}>FINGER TAP</Text>
                <Text style={[style.textContentModal, { marginTop: '5%' }]}> 
                    Clique na área abaixo o mais rápido que puder! 
                </Text>
            </View>
            <View style={style.timeContainer}>
                <Text style={style.subTitle}>Cliques: <Text style={{fontWeight: '100', fontSize: 20}}>{count}</Text></Text>
                <Text style={style.subTitle}>Tempo: <Text style={{fontWeight: '100', fontSize: 20}}>{seconds}</Text></Text> 
            </View>
            <TouchableOpacity 
                style={style.button}
                onPress={()=> seconds===15 ? null : setCount(count + 1)}
                disabled={seconds === 15 ? true : false }
            >
                <Text>CLIQUE AQUI!</Text>
            </TouchableOpacity>
            <Button 
                children='Continuar' 
                color='#F9A749' 
                style={[globalStyle.button2, {marginTop: "20%"}]}
                onPress={setFingerTap}
                disabled={(seconds === 15 && !loading) ? false : true }
                loading={loading}
            />
        </View>
        
        </>
    )
}