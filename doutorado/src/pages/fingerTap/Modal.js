import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import style from './style';

export default function Modal(props) {

    const [ visible, setVisible ] = useState(true);
    const [ visibleCount, setVisibleCount ] = useState(false);
    const [ senconds, setSeconds ] = useState(false);

    const { Timer } = props;

    const Count = () =>{
        setVisibleCount(true)
        let time = 4;
        const resp = setInterval(()=>{
            time -= 1;
            setSeconds(time)
            if(time <= 0){
                clearInterval(resp);
                setVisible(false)
                setVisibleCount(false)
                Timer()
            }
        }, 1000)
    }

    return(
        <View> 
            {visibleCount ? 
            (<Portal>
                <Dialog style={style.count} visible={visibleCount}>
                    <Dialog.Title >Carregando...</Dialog.Title>
                    <Dialog.Content >
                        <Text style={style.textCount}>{senconds}</Text>           
                    </Dialog.Content>
                </Dialog>
            </Portal>)
            :
            (<Portal>
                <Dialog visible={visible} dismissable={false}>
                    <Dialog.Title>FINGER TAP</Dialog.Title>
                    <Dialog.Content>
                        <Text style={style.textContentModal}>
                            Este teste consiste em clicar com o dedo indicador o mais rápido 
                            que conseguir na área delimitada da tela durante 15 segundos.
                        </Text>              
                    </Dialog.Content>
                    <Dialog.Actions >
                            <Text style={[style.textContentModal, { textAlign: 'justify', marginRight: '2%'}]}>Para começar tecle</Text>
                            <Button color="#F9A749" mode='contained' onPress={()=>Count()}>INICIAR</Button>
                    </Dialog.Actions>
                </Dialog>
                </Portal>) 
            }
        </View>
    )
}

