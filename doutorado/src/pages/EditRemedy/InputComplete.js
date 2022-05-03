import React, { useState, useEffect } from 'react';
import AutoComplete from 'react-native-autocomplete-input';
import { View, Text, TouchableOpacity } from 'react-native';
import { Item } from 'native-base';

import style from './style';

export default function InputComplete(props){

    const { values, setShowReceita, setFieldValue } = props;

    // dados autocomplete
    const [remedy, setRemedy] = useState([]);
    const [filteredRemedy, setFilteredRemedy] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});

    //estilo do auto complete
    const [ positionList, setPositisionList ] = useState(style.listContainerHide);
    const [ styleInput, setStyleInput ] = useState(style.input);
    const set = () =>  {setStyleInput(style.inputFocus)}
    const unset = () => {
        setStyleInput(style.input);
        positionList == style.listContainerShow ? null : setFilteredRemedy([]);
        setShowReceita(true);
    }

    const data = {
        nome: ["Remedio", "Teste", "Teste1","Teste2", "Teste3", "Paracetamol2"]
    }

    useEffect(()=>{
        const [teste] = [data].map((item)=>{
            return item;
        })
        setRemedy(teste.nome)
        console.log(teste.nome);
    },[])
    
    const findRemedy = (query) => {
        if (query) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${query.trim()}`, 'i');
          // filtra dados de acordo com entrada de dados
          const dados = remedy.filter((remedy) => remedy.search(regex) >= 0)
          
            if(dados == '') {
                setPositisionList(style.listContainerHide)
                setFilteredRemedy([])
                setFieldValue('medicamento', query)
            } else {
                setFilteredRemedy(dados);
                setPositisionList(style.listContainerShow)  
            }
        } else {
            setFilteredRemedy([]);
        }
      };


    return(
        <View style={style.autoCompleteContainer}>
            <AutoComplete
                placeholder="Nome do Medicamento"
                placeholderTextColor="#7A7A7A"
                style={style.autoCompleteInput}
                onFocus={set}
                onBlur={unset}
                listContainerStyle={positionList}
                inputContainerStyle={styleInput}
                data={filteredRemedy}
                onChangeText={(text) => findRemedy(text)}
                defaultValue={JSON.stringify(selectedValue) === '{}' ? '' : selectedValue}
                flatListProps={{
                    keyExtractor: (idx) => idx,
                    renderItem: ({ item }) => 
                        <Item>
                            <TouchableOpacity 
                                style={style.list}    
                                onPress={()=>{
                                    setSelectedValue(item);
                                    setFieldValue('medicamento', item)
                                    setFilteredRemedy([]);
                                    setPositisionList(style.listContainerHide)
                                }}>
                                <Text style={style.listItem}>
                                    {item}
                                </Text>
                            </TouchableOpacity> 
                        </Item>
                }}
                >
            </AutoComplete>
        </View>
    )
}