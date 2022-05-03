import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Scale = Dimensions.get('window').scale;

export default function Header(props){
    
    const { title, setVisibleConfirm } = props;

    const navigation = useNavigation();
    const route = useRoute();
   
    const goBack = () => {
        if(route.name === 'AddRemedy'){
            setVisibleConfirm(true)
            return
        } 
        if(route.name === 'RegisterStep1'){
            setVisibleConfirm(true)
            return
        }else {
            navigation.goBack();
        }
        
    }

    return(
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction color="#fff" onPress={()=>goBack()}/>
            <Appbar.Content 
                titleStyle={{fontSize: Scale < 1.6 ? 20 : 22}} 
                color="#fff" 
                title={title}
            />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        height: Scale < 1.6 ? Constants.statusBarHeight + hp('2%') : Constants.statusBarHeight + hp('3%'),
        backgroundColor: '#F9A749'
    },
})