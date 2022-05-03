import React, {useEffect} from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import style from '../Cadastro/style';
import globalStyle from '../styles/global';

import SvgConfirmPicture from '../../assets/Icons/SvgConfirmPicture';


export default function finishRegister(){

    const navigation = useNavigation();
    const Feedback = () => navigation.navigate('Teste')
    const goHome = () => navigation.navigate('Home')

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
                Contribua deixando sua opinião sobre o App.
            </Paragraph>
            <Button 
                children="Deixar Opinião"
                onPress={()=>Feedback()}
                style={globalStyle.buttonFinish}
                color="#fff"
            />

            <Button 
                children="Sair para a Home"
                onPress={()=>goHome()}
                style={globalStyle.buttonFinish}
                color="#fff"
            />
        </View>
    )
}