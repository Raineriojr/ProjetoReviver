import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const style = StyleSheet.create({

    textNotification:{
        marginBottom: '10%'
    },

    card:{
        borderRadius: 10,
        marginBottom: '10%',
        elevation: 5,
        backgroundColor: '#F9A749'
    },  

    list:{
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
    },

    title:{
        fontSize: wp('4.3%'),
        marginLeft: '4%',
        fontWeight: '700',
        color: '#fff'
    },

    rowContent:{
        flexDirection: "row",
        alignItems: "center",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        padding: 5,
        backgroundColor: '#F5F5F5',
        justifyContent: "space-between",
    },

    rowContent2:{
        flexDirection: "row",
        alignItems: "center",
        padding: '4%',
    },

    bold:{
        fontWeight: "bold",
        padding: 20
    },

    divider:{
        marginBottom: '8%'
    }
})