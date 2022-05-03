import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { style } from './style';

export default function GraphicModal(props) {

    const { visible, setVisible } = props;

    const navigation = useNavigation();

    return(
        <View> 
            <Portal>
            <Dialog visible={visible} dismissable={false}>
                <Dialog.Title style={style.titleModal}>Sem registros para exibir!</Dialog.Title>
                <Dialog.Content>
                    <Text>Você ainda não possui registros. Para visualizar seus gráficos, cadastre dados clicando em "Dados de Saúde".</Text>              
                </Dialog.Content>
                <Dialog.Actions>
                        <Button 
                            color="#F9A749" 
                            onPress={()=> {
                                navigation.navigate('Home')
                                setVisible(false)
                            }}>
                            SAIR
                        </Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </View>
    )
}

