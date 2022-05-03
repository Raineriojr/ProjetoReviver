import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp
        } from 'react-native-responsive-screen';

import { height, width, scale } from '../../config/constants'

const style = StyleSheet.create({
    container:{
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.01,
        backgroundColor:'#FFF',
        
    },
    
    //CABEÇALHO
    header:{
        flex: 1,
        marginTop: height * 0.09,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    
    //FORMULARIO
    formContainer:{
        flex: 0.1,
        marginBottom: height * 0.04,
        alignItems: 'center',
        justifyContent: 'space-around'
    }, 

    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },

    textRemember:{
        fontSize: 15,
        color: '#F9A749',
        fontWeight: '500'
    },

    //RODAPÉ
    footerContainer:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    containerTextRegister:{
        flexDirection: 'row'
    },

    textNewUser:{
        fontSize: 15,
        color: '#2F364B'
    },

    textRegister:{
        fontSize: 15,
        color: '#F9A749'
    },

    textProject:{
        fontSize: 13,
        color: '#2F364B',
    },

    teste:{
        borderBottomColor: 'red'
    }
    
})

export default style;