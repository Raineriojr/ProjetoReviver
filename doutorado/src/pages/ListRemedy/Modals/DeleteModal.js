import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Button, Portal, Dialog, ActivityIndicator } from 'react-native-paper';
import api from '../../../services/api';

import globalStyle from '../../styles/global';

export default function DeleteModal(props) {

    const { visible, setVisible, item, index } = props;

    const confirm = async () => {
        let id = String(item[index].id_medcadastrado);
        await api.delete(`/medicamento/delete/${id}`, {
            headers: {
                Authorization: item[index].idPaciente
            }
        }).then(resp => {
            if(resp.status == 200){
                setVisible(false)
            } else {
                setVisible(false)
                Alert.alert('Erro ao deletar medicamento. Tente novamente!')
            }
        })
    }
    const cancel = () => {
        setVisible(false)
    }
    
    
    return(
        <View>
            <Portal>
            <Dialog visible={visible}>
                <Dialog.Title>Confirmação</Dialog.Title>
                <Dialog.Content>
                    <Text>Deseja Remover Este Medicamento?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <View style={globalStyle.containerButtonModal}>
                        <Button color="#F9A749" onPress={()=>cancel()}>CANCELAR</Button>
                        <Button color="#F9A749" onPress={()=>confirm()}>CONFIRMAR</Button>
                    </View>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </View>
    )
}    

