import React, {useEffect} from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import style from './style';
import globalStyle from '../styles/global';

import SvgConfirmPicture from '../../assets/Icons/SvgConfirmPicture';


export default function finishStep(){

    const navigation = useNavigation();
    const Finish = () => navigation.navigate('Login');

    useEffect(() => { //bloqueia função de voltar no android
        const backAction = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
      }, []);

    
    return(
        <View style={style.containerConfirmStep}> 
            <SvgConfirmPicture />
            <Text style={style.titleConfirm}>Cadastro concluído</Text>
            <Paragraph style={style.paragraph}>
                Clique para fazer seu login
            </Paragraph>
            <Button 
                children="Iniciar"
                onPress={Finish}
                style={globalStyle.buttonFinish}
                color="#fff"
            />
        </View>
    )
}