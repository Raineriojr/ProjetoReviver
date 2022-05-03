import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SvgComponent from '../../assets/Icons/SvgLogoComponent';
import { AuthContext } from '../../context/authContext';
import { getDataUser } from '../../lib/storage';
import { getDataStorage } from '../../lib/storage';
import { style } from './style';

export const SplashScreen = ({ navigation }) => {

    const { dispatch } = React.useContext(AuthContext);

    React.useEffect(() => {
        verifyUser()
    })
    
    const verifyUser = async () => {
        const resp = await getDataStorage('@login_user');

        return resp ? 
        dispatch({ 
            type: 'login', 
            payload: await AsyncStorage.getItem('@username'), 
            payload2: parseInt(await AsyncStorage.getItem('@userId')) 
        }) : 
        navigation.navigate('Login')
    }

    return (
        <View style={style.container}>
            <View style={{ transform: [{scale: 1.3}] }}>
                <SvgComponent />
            </View>
            <ActivityIndicator size="small"/>
            <Text>Aguarde...</Text>
        </View>
    )
}