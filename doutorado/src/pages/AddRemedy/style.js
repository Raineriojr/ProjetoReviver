import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center', 
        backgroundColor: '#fff'   
    },
    
    formContainer:{
        flex: 1,
        alignItems: 'center', 
    },

    autoCompleteContainer:{
        maxHeight: 50,
        marginTop: hp('1.2%'),
        marginBottom: hp('2%')
    },

    //input auto complete
    listContainerShow:{
        minHeight: hp('20%'),
        zIndex: 1,
    },

    listContainerHide:{
        minHeight: hp('20%'),
        zIndex: -1
    },

    list:{
        paddingHorizontal: wp('2.5%'),
        width: wp('72%')
    },

    itemListContainer:{
        width: wp('71.5%'),
    },

    listItem:{
        marginTop: hp('2%'),
        fontSize: 16,
        height: hp('3.5%'),
        textAlignVertical: 'center'
    },

    input:{
        width: wp('88%'),
        marginBottom: hp('2.3%'),
        borderColor: "transparent", 
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#fff'
    },
    
    inputFocus:{
        width: wp('88%'),
        borderColor: "transparent", 
        borderBottomColor: '#040404',
        borderBottomWidth: 2
    },

    // autoCompleteInput:{
    //     fontFamily: 'Roboto_400Regular',
    //     fontWeight: '600',
    //     color: '#040404',
    //     fontSize: 16,
    //     padding: wp('2.7%'),
    // },

    //Select
    itemPickerReceita:{
        marginBottom: hp('2.5%'),
        paddingHorizontal: wp('1.4%'), 
        paddingVertical: hp('1.4%'), 
        width: wp('88%'),
        marginHorizontal: wp('3.8%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
    
    },

    itemPicker:{
        marginTop: hp('1.2%'),
        marginBottom: hp('2.5%'),
        paddingHorizontal: wp('1%'),
        paddingVertical: hp('1.4%'), 
        width: wp('88%'),
        marginHorizontal: wp('3.8%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
    },
    
    textInputReceita:{
        paddingHorizontal: wp('1.4%'),
        marginRight: wp('2%'),
        fontSize: 16
    },

    //frequencia
    freqContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('89%'),
        height: hp('6%'),
        paddingHorizontal: wp('3.5%'),
    },

    textFreq:{
        fontSize: 16
    },

    textFreqQuant:{
        fontSize: 20,
        color: '#F9A749',
        fontWeight: '700'
    },

    textFreqType:{
        fontSize: 14,
        color: '#F9A749',
        fontWeight: '300'
    },

    dateFreq:{
        width: wp("0%"),
        height: hp("0%"),
        zIndex: -1,
        backgroundColor: 'transparent',
    },

    hoursContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('81.5%'),
    },

    


    //opcionais
    containerTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        width: wp('100%'),
        height: hp('5.7%'),
        backgroundColor: '#F2F6FE'
    },

    titleOptional:{
        fontSize: 14,
        fontWeight: '300',
    },

    pickerInstrucao:{
        marginTop: hp('1.2%'),
        paddingHorizontal: wp('1%'), 
        paddingVertical: hp('1.4%'),
        width: wp('88%'),
        marginHorizontal: wp('3.8%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
    },

    //modal
    modalInput:{
        marginTop: hp('2%'),
        width: wp('72%'),
        alignSelf: 'center',
        backgroundColor: '#ffff',
    },

    pickerModal:{
        marginTop: hp('2%'),
        width: wp('72%'),
        alignSelf: 'center',
        backgroundColor: '#ffff',
    },

    //botoes
    buttonsContainer:{
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: hp('0.5%')  
    },

    titleModal:{
        fontWeight: 'bold'
    }


})

export default style;