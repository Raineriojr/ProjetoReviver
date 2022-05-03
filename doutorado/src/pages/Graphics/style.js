import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { height, width } from "../../config/constants";

export const style = StyleSheet.create({
    container:{
        marginHorizontal: width * 0.04,
    },

    informations:{
        marginHorizontal: width * 0.04,
        marginTop: '6%'
    },

    textInfo:{
        fontSize: wp('4%')
    },

    rowContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    title:{
        marginTop: hp('4%'),
        marginBottom: hp('1%'),
        fontSize: hp('2.7%'),
        fontWeight: 'bold'
    },

    subtitle: {
        marginBottom: hp('1%')
    },

    loading:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    containerChart:{
        marginBottom: height * 0.035,
    },

    chart:{ 
        height: height * 0.28, 
        width: width * 0.92, 
        borderRadius: 15,
        backgroundColor: '#ffa502' 
    },

    yText:{
        fontWeight: 'bold',
        fontSize: 10,
        color: '#000',
        marginLeft: '2%',

    },

    titleChart:{
        color: '#fff',
        fontSize: 13,
        fontWeight: '700'
    },

    headerChart:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '1%'
    },

    semanas:{
        fontWeight: 'bold',
        fontSize: 10,
        color: '#fff',
        bottom: -200,
        right: -315
    },

    rowContentHeader:{
        flexDirection: "row",
        justifyContent: "flex-start"
    },  

    legenda:{
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: '1%',
    },

    emojiContainer:{
        height: '100%',
        width: '7%',
        position: "absolute",
        alignItems: "center",
        paddingVertical: '40%',
        justifyContent: 'space-between',
    },

    yText2:{
        width: 50,
        height: '10%',
        fontWeight: 'bold',
        fontSize: 10,
        color: '#000',
        transform: [{
            rotate: '-90deg'
        }]
    },

    titleFooter:{
        marginVertical: '2.1%',
        height: '93.3%',
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
    },

    titleModal:{
        fontWeight: 'bold'
    }
})