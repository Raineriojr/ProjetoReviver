import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const Scale = Dimensions.get('window').scale;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    topContainer:{
        paddingBottom: wp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    title:{
        fontFamily: 'Roboto_700Bold',
        fontSize: Scale < 1.6 ? 16 : 20,
        marginTop: hp('3%')
    },

    subTitle:{
        textAlign: 'center',
        marginTop: hp('1%')
    },

    containerTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        width: wp('100%'),
        height: Scale > 1.6 ? hp('7%') : hp('8%'),
        backgroundColor: '#F2F6FE'
    },

    checkContainer:{
        alignItems: 'center',
    },  

    textCheckContainer:{
        fontSize: Scale < 1.6 ? 9 : 11,
        marginBottom: 6
    },

//EMOTICONS
    emoticonsContainer:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 14
    },

    card:{
        alignItems: 'center',
        width: wp('26%'),
        height: hp('12%'),
        margin: wp('2.5%'),
        borderWidth: 0,
        borderColor: "#ffff"
    },

    cardSelected:{
        alignItems: 'center',
        width: wp('26%'),
        height: hp('12%'),
        margin: wp('2.5%'),
        borderWidth: 3,
        borderColor: '#F9A749'
    },

    emojiCard:{
        fontSize: Height * 0.04,
        alignSelf: 'center',
        marginBottom: hp('1.5%'),
    },

    emojiText:{
        fontSize: Height * 0.016,
        textAlign: 'center',
        alignSelf: 'center'
    },

//formulario
    formContainer:{
        flex: 1,
        alignItems: 'center'
    },

    containerPressaoInput:{
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    pressaoInput:{
        width: Width < 350 ? wp('39%') : wp('40%'),
        marginBottom: hp('2%'),
        marginHorizontal: 6,
        borderColor: "transparent", 
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#fff'
    },
    
    input:{
        width: wp('88%'),
        marginBottom: hp('2%'),
        borderColor: "transparent", 
        borderBottomColor: '#D1D1D1',
        backgroundColor: '#fff'
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

//opções de cada pergunta
    buttonModal:{
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        paddingVertical: wp('5%'), 
        width: wp('88%'),
        borderBottomWidth: 0.9,
        borderBottomColor: '#D1D1D1',
    },

    textButtonModal:{
        paddingHorizontal: wp('3%'),
        fontSize: 16,
        color:'#7B7B7B'
    },

    textButtonModalSelected:{
        paddingHorizontal: wp('3%'),
        fontSize: 16,
        color:'#1e1e1e'
    },

//Estilo do Modal
    titleModal:{
        fontWeight: 'bold',
        fontSize: Scale < 1.6 ? 16 : 20,
    },
    textOptions:{
        fontSize: Scale < 1.6 ? 11.5 : 15,
        backgroundColor: 'transparent'
    },
    itemListOptions:{
        paddingVertical: Height * 0.02,
        borderRadius: 10,
        justifyContent: 'center',   
    },

    itemListOptionsSeleted:{
        paddingVertical: Height * 0.02,
        paddingHorizontal: wp('1.5%'),
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#F9A749'
    },
    textItemList:{
        textAlign: 'justify',
        fontSize:  wp('3.5%'),
        paddingHorizontal: wp('1%'),
        color: '#000'
    },


//botões
    buttonsContainer:{
        alignSelf: 'center',
        flexDirection: 'row', 
    },

    buttonsContainer2:{
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: Height < 550 ? hp('-15%') : hp('-15%') 
    }
})

export default styles;