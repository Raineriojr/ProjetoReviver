import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const globalStyle = StyleSheet.create({
    
    //<BOTÕES>
    buttonLogin:{
        justifyContent: 'center',
        marginTop: hp('3.5%'),
        width: wp('84%'),
        height: hp('7.5%'),
        backgroundColor: '#F9A749'
    },

    button:{
        justifyContent: 'center',
        marginTop: hp('3.5%'),
        width: wp('50%'),
        height: hp('7.5%'),
        backgroundColor: '#2F364B'
    },

    button2:{
        justifyContent: 'center',
        marginTop: hp('3.5%'),
        marginBottom: hp('3%'),
        width: wp('50%'),
        height: hp('7.5%'),
        borderWidth: 1,
        borderColor: '#F9A749',
        backgroundColor: '#fff'
    },

    buttonFinish:{
        justifyContent: 'center',
        marginTop: hp('3.5%'),
        width: wp('50%'),
        height: hp('7.5%'),
        backgroundColor: '#F9A749',
    },
    //<INPUTS>
    input:{
        marginTop: hp('1%'),
        width: wp('84%'),
        backgroundColor: '#ffff',   
    },

    //Erro input form
    textError:{
        fontSize: 13,
        marginHorizontal: wp('10%'),
        alignSelf: 'flex-end',
        color:'red'
    },

    textErrorLogin:{
        fontSize: 13,
        alignSelf: 'flex-end',
        color:'red'
    },

    //Campos de data
    textNasc:{
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%'),
        fontSize: 16,
        color: '#7A7A7A'
    },

    textNasc2:{
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('2%'),
        fontSize: 16,
        color: '#2F364B'
    },

    inputDate: {
        width: wp('84%'),
        marginTop: hp('1%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#ffff'
    },

    inputDateBug: {
        width: wp('0%'),
        height: hp('0%'),
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent',
        position: 'absolute'
    },

    inputNasc:{
        width: wp('84%'),
        marginTop: hp('2%'),
        paddingVertical: hp('0.3%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#ffff'
    },

    //modal
    containerButtonModal:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -15
    },

})

export default globalStyle;

export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
            primary: '#919191',
            text: '#040404',
    },
};