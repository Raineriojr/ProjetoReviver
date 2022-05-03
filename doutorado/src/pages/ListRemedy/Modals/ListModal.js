import React from 'react';
import { Text, View } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import globalStyle from '../../styles/global';

export default function ListModal(props) {

    const { visible, setVisible } = props;

    const navigation = useNavigation();
    function pageAddRemedy() {
        navigation.navigate('AddRemedy');
        setVisible(false)
    }
    function cancel(){
        navigation.navigate('Home');
        setVisible(false)
    }
    
    return(
        <View>
            <Portal>
            <Dialog visible={visible}>
                <Dialog.Title>Sem medicamentos cadastrados</Dialog.Title>
                <Dialog.Content>
                    <Text>Deseja cadastrar novo medicamento?</Text>              
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={globalStyle.containerButtonModal}>
                        <Button color="#F9A749" onPress={()=>cancel()}>CANCELAR</Button>
                        <Button color="#F9A749" onPress={()=>pageAddRemedy()}>CONFIRMAR</Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </View>
    )
    }

