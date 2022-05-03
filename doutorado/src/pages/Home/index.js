import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Paragraph, Card, Title, Appbar, FAB, IconButton, Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';

import api from '../../services/api';
import style from './style';

import SvgMedicalComponent from '../../assets/Icons/SvgMedicalComponent';
import SvgRegistersComponent from '../../assets/Icons/SvgRegistersComponent';
import SvgPictureHomeComponent from '../../assets/Icons/SvgPictureHomeComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import RemedyDialog from '../Dialog';

export default function Home({ navigation }){
    const [ visible, setVisible ] = React.useState(false);
    const { dispatch, state } = React.useContext(AuthContext);
    const [ data, setData ] = React.useState([]);  
    
    /* useEffect(() => {
        getNotifications()
        const backAction = () => {
            Alert.alert('Sair', 'Deseja fechar o App?', [
            {
                text: 'CANCELAR',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'CONFIRMAR', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove();
    }, []); */

    React.useEffect(()=>{
        Reload()
    },[visible])

    async function getNotifications(){
        const resp = await api.get('/notifications/0', { headers: { 
            authorization: state.userId}
        })
        setData(resp.data)
    }

    async function Reload(){
        getNotifications()
    }
    
//Navegações de telas
    const pageAddRemedy = () => navigation.navigate('AddRemedy');
    const pageListRemedy = () => navigation.navigate('ListRemedy');
    const RegisterStep1 = () => navigation.navigate('RegisterStep1');
    const pageGraphic = () => navigation.navigate('Graphic');

//Logout do aplicativo
    async function quitApp(){
        const id = state.userId
        await api.post('/logout', { id: id })   
        await AsyncStorage.clear();
        dispatch({ type: 'logout' })
    }

    return(
        <View style={style.container}>
            <Appbar.Header style={style.appbar}>
                <Appbar.Content 
                    color="#fff" 
                    title="Projeto Reviver" 
                    titleStyle={style.titleHeaderBar}
                />
                
                <View>
                    {data.length !== 0 && (<Badge style={{ position: 'absolute', alignSelf: 'center', zIndex: 111}} size={18}>{data.length}</Badge>)}
                    <IconButton
                        onPress={()=>setVisible(true)} 
                        icon={()=> <Ionicons style={{width: '100%'}} name="ios-notifications" color="#fff" size={28} />}
                    />
                </View>

                <TouchableOpacity style={style.containerQuitApp} onPress={()=>quitApp()}>
                    <IconButton 
                        icon={()=><MaterialCommunityIcons style={{width: '100%'}} name="account-circle" color="#fff" size={28} />}
                    />
                    <Text style={style.textQuit}>Sair</Text>
                </TouchableOpacity>
            </Appbar.Header>

            <ScrollView style={{flex: 1}}>
            <View style={style.header}>
                <View style={style.containerTextHeader}>
                    <Text style={style.titleHeader}>Bem-Vindo(a) {String(state.username).split(" ")[0]}</Text>
                    <Paragraph style={style.paragraph}>Gerencie seus medicamentos e horários, obtenha relatórios...</Paragraph>
                </View>
                <View>
                    <SvgPictureHomeComponent/>
                </View>
            </View>

            <View style={style.cardsContainer}>
                <RemedyDialog data={data} visible={visible} setVisible={setVisible}/>
                
                <Card style={style.card} onPress={() => pageListRemedy()}>
                    <View style={style.viewContentCard}>
                    <View><SvgMedicalComponent /></View>
                    <Card.Content>
                        <Title style={style.titleCard}>Medicamentos</Title>
                        <Paragraph style={style.subTitleCard}>Veja sua lista de medicamentos</Paragraph>
                    </Card.Content>
                    </View>
                </Card>
         
                <Card style={style.card} onPress={()=> RegisterStep1()}>
                    <View style={style.viewContentCard}>
                    <View style={{padding: '1.5%'}}><SvgRegistersComponent /></View>
                    <Card.Content>
                        <Title style={style.titleCard}>Dados de Saúde</Title>
                        <Paragraph style={style.subTitleCard}>Registro de sinais e sintomas</Paragraph>
                    </Card.Content>
                    </View>
                </Card>

                <Card style={style.card} onPress={()=> pageGraphic()}>
                    <View style={style.viewContentCard}>
                    <View><Icon name='chart-timeline-variant' size={37} color='#F9A749'/></View>
                    <Card.Content>
                        <Title style={style.titleCard}>Meus Registros</Title>
                        <Paragraph style={style.subTitleCard}>Veja dados de sua evolução</Paragraph>
                    </Card.Content>
                    </View>
                </Card>               
            </View>
            </ScrollView>

            <FAB 
                icon={() => <MaterialCommunityIcons color="#fff" name="plus" size={24}/>} 
                style={style.fab} 
                onPress={()=>pageAddRemedy()} 
            />
        </View>
    )
}