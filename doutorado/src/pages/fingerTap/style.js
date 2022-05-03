import { StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { height } from '../../config/constants';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
const Scale = Dimensions.get('window').scale;

const style = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    topContainer:{
        marginBottom: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    timeContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    title:{
        fontFamily: 'Roboto_700Bold',
        fontSize: Scale < 1.6 ? 18 : 24,
        marginTop: hp('3%')
    },  

    subTitle:{
        fontSize: 18,
        marginTop: hp('1%'),
        fontWeight: '600'
    },

    textCount:{
        fontSize: 45
    },  

    button:{
        width: height * 0.35,
        height: height * 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 120,
        marginTop: '20%',
        backgroundColor: '#F9A749'
    },

    count:{
        alignItems: 'center',
        justifyContent: 'center'
    },

    textContentModal:{
        fontSize: wp('4%')
    }    
})

export default style;
