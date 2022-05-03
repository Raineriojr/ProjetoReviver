import React, { useState, useEffect } from  'react';
import { View, Image, FlatList, Text, RefreshControl } from 'react-native';
import { Paragraph, Card, Title, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AuthContext } from '../../context/authContext'; 
import Header from '../../components/Header';

import img from '../../assets/images.png';
import style from './style';

import ListModal from './Modals/ListModal';
import DeleteModal from './Modals/DeleteModal';

export default function ListRemedy(){

    const { state } = React.useContext(AuthContext);

    const [ visible, setVisible ] = useState(false);
    const [ visibleDeleteModal, setVisibleDeleteModal ] = useState(false);
    const [ total, setTotal ] = useState(0);
    const [ list, setList ] = useState([]);
    const [ isRefresh, setIsRefresh] = useState(false);

    const [ message, setMessage ] = React.useState(false);

    const [ indexItem, setIndexItem ] = useState(0);

    const navigation = useNavigation();
    const EditRemedy = (data) => navigation.navigate('EditRemedy', { data: data })

    useEffect(()=>{
        loadList()
        onRefresh()
    }, [])

    // const goBack = () => navigation.goBack();

    // useEffect(() => {
    //     const backAction = () => {
    //         goBack();
    //     };

    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    //     return () => backHandler.remove();
    // }, []);
    
    async function loadList(){
        const userId = state.userId;
        const cacheList = await AsyncStorage.getItem('@list_remedy');

        try {
            const resp = await api.get(`/medicamento/lista/${userId}`);
            setTotal(resp.headers['x-total-count']);

            if(resp.data < 1){
               setVisible(true);
               return
            }
            else if(JSON.stringify(resp.data) !== cacheList){
                await AsyncStorage.setItem('@list_remedy', JSON.stringify(resp.data))
                setList(JSON.parse(cacheList))
                return
            } 
            setList(JSON.parse(cacheList))
            setMessage(false)
        } catch (error) {
            console.log(error.message);
        }
    }


    if(isRefresh){
     loadList().then(resp => {
        resp ? setIsRefresh(false) : setIsRefresh(false)
     })
    }    
    async function onRefresh(){
        setIsRefresh(true);
    }

    const onToggleSwitch = async (item) => {
        let dados = {
            status: !item.status,
            id_medcadastrado: item.id_medcadastrado
        }
        await api.post('/medicamento/atualiza_status', dados, { headers:{
            authorization: state.userId
        }})
        onRefresh()
    }   
  

    return(
        <>
        <Header title="Meus Medicamentos"/>

        <ListModal visible={visible} setVisible={setVisible}/>
        
        <View style={style.container}>
            {message && (
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 18, marginBottom: '1.5%'}}>Arraste para baixo para atualizar a lista</Text>
                    <MaterialCommunityIcons onPress={()=>loadList()} name='chevron-double-down' size={30}/>
                </View>                
            )}
            <View style={style.headerContainer}>
                <Text style={style.textHeader}>Total: {total === undefined ? 0 : total}</Text>
            </View>
            <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                extraData={[list, ]}
                keyExtractor={ remedy => String(remedy.id_medcadastrado)}
                onRefresh={()=>onRefresh()}
                refreshing={isRefresh}
                renderItem={({item, index})=> (
                    <Card style={style.card} key={index}>
                        <View style={style.headerCard}>
                            <Switch value={item.status === 1 ? true : false} onValueChange={()=>onToggleSwitch(item)} />
                            <DeleteModal 
                                visible={visibleDeleteModal} 
                                setVisible={setVisibleDeleteModal} 
                                item={list} 
                                index={indexItem}
                            />
                            <View style={style.containerIcons}>
                                <MaterialCommunityIcons
                                    color="#F9A749" 
                                    name="pencil" 
                                    size={28}
                                    onPress={() => {
                                        setMessage(true)
                                        EditRemedy(item)
                                        setIndexItem(index)
                                    }}
                                />
                                <MaterialCommunityIcons 
                                    onPress={() => {
                                        setMessage(true)
                                        setVisibleDeleteModal(true)
                                        setIndexItem(index)
                                    }}
                                    color="#F9A749" 
                                    name="delete" 
                                    size={28}
                                />
                            </View>
                        </View>
                        <View style={style.viewContentCard}>
                            <Image source={img} style={style.img}/>
                            <Card.Content style={style.cardContent}>
                                <Title style={style.titleCard}>{item.medicamento}</Title>
                                <Paragraph><Text style={style.textBold}>Frequência:</Text> {item.frequencia == 1 ? 'Uma vez ao dia' : item.frequencia == 2 ? 'Duas vezes ao dia' : item.frequencia == 3 ? 'Três vezes ao dia' : null} </Paragraph>
                                <Paragraph><Text style={style.textBold}>Dosagem:</Text> {item.dosagem}</Paragraph>
                                <Paragraph><Text style={style.textBold}>Horários:</Text> {item.horarios} </Paragraph>
                            </Card.Content>
                        </View>
                    </Card>
                )}
            >

            </FlatList>
        </View>

        </>
    )
}