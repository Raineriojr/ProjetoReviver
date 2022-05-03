import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Portal, Dialog } from 'react-native-paper';

import style from '../style';
import globalStyle from '../../styles/global';

export default function QntDiasModal(props) {

    const { visible, hideDialog, setFieldValue } = props;
   
    const [value , setValue] = useState('');

    function Confirm(){
      setFieldValue('qntDias', value);
      hideDialog()
    }

    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={style.titleModal}>Duração</Dialog.Title>
            <Dialog.Content>
              <Text>Qual a quantidade de dias?</Text>
              <TextInput
                style={style.modalInput}
                textAlign="center"
                keyboardType="numeric"
                defaultValue='0'
                value={value}
                onChangeText={(text) => setValue(text)}
                right={<TextInput.Icon name="plus"/>}
                left={<TextInput.Icon name="minus"/>}
              />
                   
            </Dialog.Content>
            <Dialog.Actions>
              <View style={globalStyle.containerButtonModal}>
                <Button color="#F9A749" onPress={hideDialog}>CANCELAR</Button>
                <Button color="#F9A749" onPress={Confirm}>DEFINIR</Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };
  