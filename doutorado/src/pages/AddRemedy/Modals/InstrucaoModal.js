import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, RadioButton, Portal, Dialog } from 'react-native-paper';

import style from '../style';
import globalStyle from '../../styles/global';

export default function InstrucaoModal(props) {

    const { visible, hideDialog, setFieldValue, setColorInstrucao, cancelDialogInstrucao } = props;

    const [ value, setValue ] = useState('');
    const [ text, setText ] = useState('');

    const Confirm = () =>{
      if(value != "" && text.length <= 3){
        setFieldValue('instrucao', value)
        setColorInstrucao('#040404')
        hideDialog()
      }
      else {
        setFieldValue('instrucao', text)
        setColorInstrucao('#040404')
        hideDialog()
      }
    }

    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={style.titleModal}>Instruções</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                <RadioButton.Item label="Antes das Refeições" value="Antes das Refeições" />
                <RadioButton.Item label="Durante as Refeições" value="Durante as Refeições" />
                <RadioButton.Item label="Depois das Refeições" value="Depois das Refeições" />
                <RadioButton.Item label="Não necessariamente" value="Não necessariamente" />
              </RadioButton.Group>
              <TextInput
                multiline
                placeholder="Outra Instrução"
                style={style.modalInput}
                onChangeText={(text) => setText(text)}
              >

              </TextInput>
            </Dialog.Content>
            <Dialog.Actions>
              <View style={globalStyle.containerButtonModal}>
                <Button color="#F9A749" onPress={cancelDialogInstrucao}>CANCELAR</Button>
                <Button color="#F9A749" onPress={Confirm}>DEFINIR</Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };
  