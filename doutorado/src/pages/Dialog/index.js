import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator, Divider, Card } from 'react-native-paper';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import {style} from './style';

import { AuthContext } from '../../context/authContext';
import { height } from '../../config/constants';

export default function RemedyDialog({ data, visible, setVisible }) {
  
  const [ loading, setLoading ] = React.useState(false);
  
  const { state } = React.useContext(AuthContext);
  
  const Confirm = (item, index) => {

    let id = {
      id: data[index].id
    }

    const values = {
      "medicamento_id": item.medicamento_id,
      "paciente_id": state.userId,
      "resp": 1
    }

    try {
      setLoading(true)
      api.post('/medicamento_tomado', values).then(async (resp)=>{
        
        if(resp.status === 200){
          await api.post('/notifications/update', id, { headers:{
            authorization: state.userId
          }})

          await api.get(`/estoque/update?id=${item.medicamento_id}`, {
            headers :{
              authorization: state.userId
            }
          })
        }
      })
    } catch (error) {
      console.log(error.message);

    } finally {
        setVisible(false)
        setLoading(false)
    }
  }

  const Cancel = (item, index) => {

    let id = {
      id: data[index].id
    }

    const values = {
      "medicamento_id": item.medicamento_id,
      "paciente_id": state.userId,
      "resp": 0
    }
    
    try {
      setLoading(true)
      api.post('/medicamento_tomado', values).then((resp)=>{
        if(resp.status === 200){
          api.post('/notifications/update', id, { headers:{
            authorization: state.userId
        }}).then((resp)=>{
            if(resp.status === 200){
              setLoading(false)
              setVisible(false)
            }
          })
        }
      })
    } catch (error) {
      console.log(error.message);
      setVisible(false)
      setLoading(false)
    }
  }

  return (
      <View>
        <Portal>
          {!loading && (
            <Dialog style={{ maxHeight: height * 0.7}} visible={visible} onDismiss={()=>setVisible(false)}>
                
              <Dialog.Content>
                <FlatList
                  data={data}
                  extraData={data}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={<>
                    <Dialog.Title style={style.textNotification}>
                        <Icon style={{marginRight: '5%'}} name="ios-notifications" color="#000" size={20} />    
                        Notificações
                    </Dialog.Title>

                    <Divider style={style.divider}/>
                  </>}
                  renderItem={({item, index})=>{
                    return(
                      <View style={style.card}>
                        <View style={style.rowContent}>
                          <Paragraph>Data: 
                            <Paragraph style={style.bold}>
                              {
                                ' ' + new Date(item.date).toLocaleDateString("pt-BR").substring(3, 6) +
                                new Date(item.date).toLocaleDateString("pt-BR").substring(0, 2)
                              }
                            </Paragraph>
                          </Paragraph>
                          <Paragraph>Horário:
                            <Paragraph style={style.bold}>  
                              {' ' +new Date(item.date).toLocaleTimeString().substring(0, 5) + 'h'}
                            </Paragraph>
                          </Paragraph>
                        </View>
                              
                        <View style={style.rowContent2}>
                          <IconMaterial name="alarm-light" size={35} color={'#F9F9F9'}/>
                          <View style={{width: '85%'}}>
                            <Paragraph style={style.title}>{item.dosagem} de {item.nome}</Paragraph>
                          </View>
                        </View>
          
                        <Divider />

                        <View style={style.list}>
                          <Button color="#000" onPress={()=>Cancel(item, index)}>
                            <Icon name='close-circle' size={22} color="#F64C4C"/>
                              PERDI
                          </Button> 
                          <Button color="#000" onPress={()=>Confirm(item, index)}>
                              TOMEI
                              <Icon name='checkmark-circle' size={22} color="#15881D"/>
                          </Button>
                        </View>
                      </View>
                    )
                  }}
                />      
              </Dialog.Content>
            </Dialog>
          )}
          
          {loading && (
            <Dialog visible={visible} dismissable={false}>
              <Dialog.Title>Carregando...</Dialog.Title>
              <Dialog.Content>
                <ActivityIndicator size="large"/>
              </Dialog.Content>
            </Dialog>
          )}
      </Portal>
      </View>
  );
};