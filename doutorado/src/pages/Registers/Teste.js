import React, { useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import WebView from './WebView'

export default function Teste(){
    
    const navigation = useNavigation();
    const goHome = () => navigation.navigate('Home')

    const [ visible, setVisible ] = useState(false);

    return(
        <>
        <WebView 
            source={{uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfWnulIesWyMVo_dVxuoA-NLaycno6Chvz3Gg-1zh_K2om0Ag/viewform?usp=sf_link'}}
            style={{ marginTop: 20 }}
            onLoadStart={() => setVisible(true)}
            onLoad={() => setVisible(false)}
            />
            {visible ? <ActivityIndicator size="large" /> : null}

        <TouchableOpacity 
            style={{height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9A749'}}
            onPress={()=>goHome()}
        >
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
                Voltar
            </Text>
        </TouchableOpacity>
        </>
    )
}