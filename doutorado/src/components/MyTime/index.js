import React,{useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import array from './array';

export default function MyTime(props){

    const { index } = props;

    const [ time, setTime ] = useState (new Date());
    const [ show, setShow ] = useState(false);
    const [ pressed, setPressed ] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentTime = selectedDate || time;
            setShow(Platform.OS === 'ios');
            setTime(currentTime);
        };

    function showMode() {
        setShow(true)
    }  
    
    const formattedTime = time.toString().substr(16, 5);

    const Press = () => setPressed(true);

    const inputTime = pressed !== true || formattedTime == '' ? '08:00' : formattedTime;

    if(inputTime !== "" && array.includes(inputTime) !== true){ 
        array[index] = inputTime;
    }   

    const inputDateSelected = () => (
            <TouchableOpacity style={styleFreq.hoursContainer} onPressOut={Press} onPress={()=>showMode()}>
                <Text style={styleFreq.textFreq}>{`Horario ${index+1}`}</Text>
                <Text style={styleFreq.textFreqQuant}>{inputTime}</Text>
            </TouchableOpacity>
        )

    return (
        <View>
            {inputDateSelected()}

            {show && (
                <DateTimePicker
                    value={time}
                    mode='time'
                    display="spinner"
                    onChange={onChange}
                    textColor='black'
                />)
            }
        </View>
    )
}

    const styleFreq = StyleSheet.create({
        freqContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: wp('88%'),
            height: hp('6%'),
            paddingHorizontal: wp('3%'),
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
    
        hoursContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: wp('81.5%'),
            height: hp('6%'),
            marginTop: hp('1%')
        }
    })