import React, { useEffect } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import globalStyle from '../../styles/global';
import style from '../style'

export default function ReturnModal(props) {

    const { visible, setVisibleConfirm, hideDialog } = props;

    const navigation = useNavigation();
    
    const goBack = () => {
        navigation.navigate('Home')
        setVisibleConfirm(false)
    }

    useEffect(() => {
        const backAction = () => {
            setVisibleConfirm(true)
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    return(
        <View> 
            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={style.titleModal}>Confirmação</Dialog.Title>
                <Dialog.Content>
                    <Text>Deseja sair sem salvar?</Text>              
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={globalStyle.containerButtonModal}>
                        <Button color="#F9A749" onPress={hideDialog}>CANCELAR</Button>
                        <Button color="#F9A749" onPress={()=>goBack()}>SAIR</Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </View>
    )
}

