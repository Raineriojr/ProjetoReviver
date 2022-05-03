import React,{useState} from 'react'
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {TextInput } from 'react-native-paper'

import DateTimePicker from '@react-native-community/datetimepicker';

import styleFreq from '../../pages/AddRemedy/style';
import globalStyle from '../../pages/styles/global';

export default function MyDate(props){

    const { values, name, setFieldValue } = props;

    const [ date, setDate ] = useState (new Date());
    const [ show, setShow ] = useState(false);
    const [ pressed, setPressed ] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
        };

    function showMode() {
        setShow(true)
    }
    
    const formattedDate = 
        date.getDate()+"/"+
        (date.getMonth()+1)+"/"+
        date.getFullYear();

    const Press = () => setPressed(true);

    const inputDate = pressed !== true ? 'Nascimento' : formattedDate ;
    const inputDateFreq = pressed !== true ? 'Selecione' : formattedDate;

    const styleTextNasc = pressed == true ? globalStyle.textNasc2 : globalStyle.textNasc;
    
 
    const inputDateSelected = () => {
        switch (name){
            case 'nascPaciente':
                return(
                    <TouchableOpacity 
                        style={globalStyle.inputNasc} 
                        onPress={()=>{
                            showMode()
                            Press()
                        }}>
                        <Text style={styleTextNasc}>{inputDate}</Text>
                        <TextInput 
                            style={globalStyle.inputDateBug} 
                            disabled={true}
                            onChangeText={(text) => setFieldValue('nascPaciente', text)}
                            value={values.nascPaciente = inputDate}
                        /> 
                    </TouchableOpacity>
                )
            break;
    
            case 'nascCuidador':
                return(
                    <TouchableOpacity 
                        style={globalStyle.inputNasc} 
                        onPress={()=>{
                            showMode()
                            Press()
                        }}>
                        <Text style={styleTextNasc}>{inputDate}</Text>
                        <TextInput 
                            style={globalStyle.inputDateBug} 
                            disabled={true}
                            onChangeText={(text) => setFieldValue('nascCuidador', text)}
                            value={values.nascCuidador = inputDate}
                        />   
                    </TouchableOpacity>
                )
            break;

            case 'dataInicio':
                return(
                    <TouchableOpacity 
                        style={styleFreq.freqContainer} 
                        onPress={()=>{
                            showMode()
                            Press()
                        }}>
                        <Text style={styleFreq.textFreq}>Início</Text>
                        <TextInput 
                            style={styleFreq.dateFreq}
                            disabled={true}
                            onChangeText={(text) => setFieldValue('dataInicio', text)}
                            value={values.dataInicio = inputDateFreq}
                        />   
                        <Text style={styleFreq.textFreqQuant}>{inputDateFreq}</Text>
                    </TouchableOpacity> 
                    
                )
            break;

            case 'dataFim':
                return(
                    <TouchableOpacity 
                        style={styleFreq.freqContainer} 
                        onPress={()=>{
                            showMode()
                            Press()
                        }}>
                    <Text style={styleFreq.textFreq}>Término</Text>
                    <TextInput 
                        style={styleFreq.dateFreq}
                        disabled={true}
                        onChangeText={(text) => setFieldValue('dataFim', text)}
                        value={values.dataFim = inputDateFreq}
                    />   
                    <Text style={styleFreq.textFreqQuant}>{inputDateFreq}</Text>
                </TouchableOpacity> 
                )
            break;
        }
    }
    if(name == "dataInicio"){
        return (
            <View>
                {inputDateSelected()}
    
                {show && (
                    <DateTimePicker
                        maximumDate={new Date(2050, 0, 1)}
                        minimumDate={new Date(1940, 0, 1)}
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display="spinner"
                        onChange={onChange}
                        textColor='black'
                    />)
                }
            </View>
        )
    }
    else if(name == "dataFim"){
        return (
            <View>
                {inputDateSelected()}
    
                {show && (
                    <DateTimePicker
                        maximumDate={new Date(2050, 0, 1)}
                        minimumDate={new Date()}
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display="spinner"
                        onChange={onChange}
                        textColor='black'
                    />)
                }
            </View>
        )
    } else {
    return (
        <View>
            {inputDateSelected()}

            {show && (
                <DateTimePicker
                    maximumDate={new Date()}
                    minimumDate={new Date(1940, 0, 1)}
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    display="spinner"
                    onChange={onChange}
                    textColor='black'
                />)
            }
        </View>
    )
}
}