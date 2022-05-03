import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Scale = Dimensions.get('window').scale;

export default function Title({children}){

    return (
        <View >
            <Text style={style.title}>{children}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    title: {
        fontSize: Scale < 1.6 ? 16 : 20,
        fontWeight: '700'
    }
})