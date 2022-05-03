import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Portal, Dialog } from 'react-native-paper';
import { Picker, Item } from 'native-base';

import style from '../style';
import globalStyle from '../../styles/global';

export default function DosagemModal(props) {

    const { visible, hideDialog, setFieldValue } = props;

    const [ type, setType ] = useState({selected: ''});
    const [ value, setValue ] = useState('1');

   
    const Confirm = ()=>{ 
        let dosagem = (value+" "+type.selected);
        setFieldValue('dosagem', dosagem);
        hideDialog();
    }

    //opções de unidades para dosagem
    const dados = [
      'UI', 'ampola(s)', 'aplicação/ões', 'aplicação/ões vaginal(is)', 'colher(es) de chá', 'colher(es) de sopa', 
      'comprimido(s)', 'comprimido(s) vaginal(is)', 'cápsula(s)', 'cápsula(s) vaginal(is)', 'gota(s)', 'grama(s)', 
      'inalação/ões', 'injeção/ões', 'miligrama(s)', 'mililitro(s)', 'pedaço(s)', 'penso(s)', 'pulverização/ões', 
      'sachê(s)', 'supositório(s)', 'unidade(s)', 'óvulo(s)' 
    ]

    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={style.titleModal}>Dosagem</Dialog.Title>
            <Dialog.Content>
                <Text>Quanto deve ser tomado por vez?</Text>
                <TextInput
                    style={style.modalInput}
                    textAlign="center"
                    defaultValue='0'
                    keyboardType="numeric"
                    onChangeText={(text)=>setValue(text)}
                    right={<TextInput.Icon name="plus"/>}
                    left={<TextInput.Icon name="minus"/>}
                    value={value}
                />
                <Item style={style.modalInput}>
                    <Picker
                        style={{padding: "5.5%", marginTop: "3%"}}
                        mode='dropdown'
                        placeholder="Dosagem"
                        selectedValue={type.selected} 
                        onValueChange={(text) => {
                            setType({selected: text})
                        }} 
                    >
                      {dados.map((item, index)=>(
                        <Picker.Item color='#2F364B' label={item} value={item} key={index}/>
                      ))}
                    </Picker>
                </Item>
              
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
  