import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: hp('3%'),
        alignItems: 'center',
        backgroundColor: '#F2F6FE'
    },

    card:{
        flex: 1,
        width: wp('88%'),
        marginTop: hp('2.5%')
    },

    headerCard:{
        flexDirection: 'row',
        paddingVertical: hp('1%'), 
        paddingHorizontal: wp('3%'),
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#F2F2f2'
    },

    cardContent:{
        alignSelf: 'flex-start'
    },

    titleCard:{
        color: '#F9A749',
        marginBottom: hp('1.5%'),
        fontSize: hp('2.5%')
    },

    viewContentCard:{
        flex: 1,
        flexDirection: 'row',
        padding: wp('5.5%'),
        alignItems: 'center'
    },

    img:{
        width: wp('12%'),
        height: hp('5%')
    },

    test:{
        color: '#F9A749',
    },

    textBold:{
        fontWeight: 'bold'
    },

    headerContainer:{
        alignSelf: 'flex-start',
    },

    textHeader:{
        fontWeight: '700',
        fontSize: hp('2%'),
    },

    containerIcons:{
        width: '25%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
})

export default style;