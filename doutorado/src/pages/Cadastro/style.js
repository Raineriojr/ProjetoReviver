import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Height = Dimensions.get('window').height;

const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: (16, 32),
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    topContainer:{
        marginTop: Height < 550 ? wp('1%') : Constants.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title:{
        marginTop: hp('2%'),
        fontSize: 18
    },  

    formContainer:{
        marginTop: hp('3%'),
        alignItems: 'center',
        
    },

    itemPicker:{
        marginTop: hp('2%'),
        paddingHorizontal: wp('1.4%'), 
        paddingVertical: wp('2.5%'), 
        width: wp('84%'),
        marginHorizontal: wp('3.8%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#ffff'
    },

    scroll:{
        width: wp('100%'),
    },

    buttonsContainer:{
        alignSelf: 'center',
        flexDirection: 'row', 
        marginTop: Height < 550 ? hp('3%') : hp('8%')            
    },

    buttonsContainer2:{
        alignSelf: 'center',
        flexDirection: 'row', 
        marginTop: Height < 550 ? hp('3%') : hp('25%')            
    },

    buttonsContainer3:{
        alignSelf: 'center',
        flexDirection: 'row', 
        marginTop: Height < 550 ? hp('22%') : hp('43%')            
    },

    //ESTILO TELA DE CONFIRMAÇÃO

    containerConfirmStep:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    titleConfirm:{
        fontSize: 24,
        fontWeight: '600',
        marginTop: hp('5%')
    },

    paragraph:{
        alignItems: 'center',
        marginHorizontal: wp('9%'),
        marginTop: hp('4%'),
        marginBottom: hp('5%'),
        textAlign: 'justify',
        fontSize: 14
    }

})

export default style;