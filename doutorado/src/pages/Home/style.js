import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { height, width, scale } from '../../config/constants'

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: '#F2F6FE'
    },

    appbar:{
        width: wp('100%'),
        height: Constants.statusBarHeight + (height * 0.07),
        backgroundColor: '#F9A749'
    },

    header:{
        flex: scale < 1.6 ? 0.6 : 0.3,
        marginTop: hp('5%'),
        width: wp('100%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp('2%'),
        backgroundColor: '#fff'
    },

    containerTextHeader:{
        width: scale < 1.6 ? wp('45%') : wp('55%')
    },

    titleHeaderBar:{
        fontSize: scale < 1.6 ? 22 : 28, 
    },

    containerQuitApp:{
        flexDirection: 'column',
        height: '100%', 
        alignItems: 'center',
        marginRight: wp('2%'),
        marginLeft: wp('4%')
    },

    textQuit:{
        color: '#fff',
        fontWeight: '700',
        fontSize: scale < 1.6 ? 15 : 16,
        marginTop: wp('-2%') //corrige espaçamento entre icone e texto "sair"
    },

    titleHeader:{
        fontSize: scale < 1.6 ? 22 : 28, 
        fontFamily: 'Roboto_700Bold',
        color: '#F9A749'
    },

    paragraph:{
        marginTop: hp('2%'),
        fontSize: scale < 1.6 ? 13 : 15
    },

    subTitleCard:{
        fontSize: scale < 1.6 ? 13 : 15
    },

    //lista de opções
    cardsContainer:{
        flex: 1,
        alignItems: 'center',
        marginTop: hp('2.5%'),
        width: wp('100%')
    },

    card:{
        marginTop: hp('1.2%'),
        paddingVertical: hp('3%'),
        width: wp('100%')
    },

    viewContentCard:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: '5%',  
    },

    titleCard:{
        fontSize: scale < 1.6 ? 20 : 22,
        fontWeight: '700'
    },

    fab:{
        position: 'absolute',
        zIndex: 1,
        left: width * 0.77,
        bottom: height * 0.08,
        backgroundColor: '#2F364B',
    }

})

export default style;