import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Item, Form, Picker } from 'native-base';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
//meus componentes
import Header from '../../components/Header';
import Title from '../../components/Title';
import MyTime from '../../components/MyTime'
import MyDate from '../../components/MyDate';
//import InputComplete from './InputComplete';
//modais
import InstrucaoModal from './Modals/InstrucaoModal';
import QntDiasModal from './Modals/QntDiasModal';
import DosagemModal from './Modals/DosagemModal';
import ReturnModal from './Modals/ReturnModal';
//context
import { AuthContext } from '../../context/authContext';

import array from '../../components/MyTime/array';
import style from './style';
import globalStyle from '../styles/global';

export default function EditRemedy({navigation}){

    const { state } = React.useContext(AuthContext);

    const goListRemedy = () => navigation.navigate('ListRemedy');

    const route = useRoute();
    const routeData = route.params.data;
 
//OCULTA MODAIS
    const hideDialog = () => {
        setVisibleQntDias(false);
        setVisibleDosagem(false);
        setVisibleInstrucao(false);
    }
    const cancelDialogInstrucao = () =>{
        setVisibleInstrucao(false);
        setFieldValue('instrucao', '')
    }

//EXIBE MODAIS
    const [ visibleInstrucao, setVisibleInstrucao ] = useState(false); 
    const [ visibleQntDias, setVisibleQntDias ] = useState(false);
    const [ visibleDosagem, setVisibleDosagem ] = useState(false);

//Estados do switch on/off
    const [ instrucaoOn, setInstrucaoOn ] = useState(false);
    const [ estoqueOn, setEstoqueOn ] = useState(false);
    
//Estados para exibição quando switch = on
    const [ showInstrucao, setShowInstrucao ] = useState(false);
    const [ showEstoque, setShowEstoque ] = useState(false);
    const [ renderDuracao, setRenderDuracao ] = useState(false);
    const [ renderDays, setRenderDays ] = useState(false)

//Estados dos selects
    const [ frequencia, setFrequencia ] = useState({selected: routeData.frequencia});
    const [ receita, setReceita ] = useState({selected: routeData.receita});
    const [ duracao, setDuracao ] = useState({selected: ''});
    const [ instrucao, setInstrucao ] = useState({selected: routeData.instrucao});
//MUDA COR DE INSTRUCAO QUANDO SELECIONADO
    const [ colorInstrucao, setColorInstrucao ] = useState('#7B7B7B');

//Alterna Swicth em on/off e exibe o conteudo
    const onToggleSwitchInstrucao = () => {
        setInstrucaoOn(!instrucaoOn)
        instrucaoOn ? setShowInstrucao(false) : setShowInstrucao(true);
        showInstrucao == false ? null : cancelDialogInstrucao();
    }
    const onToggleSwitchEstoque = () => {
        setEstoqueOn(!estoqueOn);
        estoqueOn ? setShowEstoque(false) : setShowEstoque(true);
        showEstoque == false ? null : setFieldValue('estoque', '')
    }
//Exibe modal de Dosagem
    const showDoseModal = () => setVisibleDosagem(true);

//Salva array de horarios no formulario
    function setHours(){
        setFieldValue('horarios', array.toString());
        handleSubmit();
    }

//Formulário
    const { handleSubmit, setFieldValue, setSubmitting, isSubmitting, values, errors, touched } = useFormik({
        initialValues: {
            id_medcadastrado: routeData.id_medcadastrado,
            medicamento: routeData.medicamento,
            receita: routeData.receita,
            frequencia: routeData.frequencia,
            dosagem: routeData.dosagem,
            horarios: routeData.horarios,
            duracao: routeData.duracao,
            qntDias: routeData.qntDias,
            estoque: routeData.estoque,
            instrucao: routeData.instrucao,
            dataInicio: routeData.dataInicio || null,
            dataFim: routeData.dataFim || null,
            contador_alarmes: routeData.contador_alarmes
        },

        validationSchema: Yup.object().shape({
            medicamento: Yup.string().required('Insira o nome do medicamento'),
            duracao: Yup.string().required('Informe a duração')
        }),

        onSubmit: async (values) => {          
            try{
                const userId = state.userId;
                await api.post('/medicamento/update', values, { headers:{
                    authorization: userId
                }}).then((resp)=>{
                    if(resp.status === 200){
                        setSubmitting(false);
                        Alert.alert('Editado com Sucesso', 'Atualize a lista de medicamentos para ver as modificações.')
                        setTimeout(()=>{
                            goListRemedy()
                        }, 1500)
                    }
                
                });
            }
            catch(erro) {
                setSubmitting(false);
                Alert.alert('Erro', "Erro ao editar medicamento.")
                setTimeout(()=>{
                    goListRemedy()
                }, 1500)
            }
        }
    })
    
    
//Ativa Modal Qnt de dias
    function AlterDuracao(value){
        if(value == 0 || 1){
            setRenderDuracao(false)
            setRenderDays(false)
        }
        if(value == 2){
            setRenderDays(true)
            setFieldValue('qntDias', '1')
        }
        if(value == 3){
            setRenderDuracao(true)
            setFieldValue('dataInicio', '')
            setFieldValue('dataFim', '')
        }
    }

//calcula a quantidade de alarmes de acordo com frequencia selecionada
    let cont = [0];
    for (let i = 1 ; i<frequencia.selected ; i++){
        cont.push(i);  
    }
//remove posição do array de horarios se o tamanho do array for maior que a quantidade selecionada
    if(array.length > frequencia.selected){
        for(let j = 3; j >= frequencia.selected ; j--){
            array.pop(j)
        }
    }   

//EXIBE VALOR DA INSTRUCAO NO SELECT
    const valorInstrucao = values.instrucao != '' ? values.instrucao : 'Instruções';


return (
    <>
    <Header title="Editar Medicamento"/>
        <View style={style.container}>
            
            <Form style={style.formContainer}>
                    
            <ScrollView style={{width: '100%'}} >
            <View style={style.formContainer}>          
                <View style={style.containerTitle}>
                    <Title>Medicamento *</Title>
                </View>
    
                <TextInput  
                    placeholder='Nome do Medicamento'
                    style={style.input}
                    onChangeText={(text) => setFieldValue('medicamento',text)}
                    value={values.medicamento}
                />
                {touched.medicamento && errors.medicamento &&
                            <Text style={globalStyle.textError}>{errors.medicamento}</Text>}

                 <Item style={style.itemPickerReceita}>
                        <Text style={style.textInputReceita}>Necessita de Receita?</Text>
                        <Picker
                            style={{padding: "5.5%"}}
                            mode="dropdown"
                            placeholder="Necessita "
                            selectedValue={receita.selected}
                            onValueChange={(text)=>{
                                setFieldValue('receita', text)
                                setReceita({selected: text})
                            }}
                        >
                            <Picker.Item color='#2F364B' label="Não" value={0} key={0}/>
                            <Picker.Item color='#2F364B' label="Sim" value={1} key={1}/>
                        </Picker>
                    </Item>


                <View style={style.containerTitle}>
                    <Title>Frequência *</Title>
                </View>

                <Item style={style.itemPicker}>
                    <Picker
                        style={{padding: "5.5%"}}
                        mode='dropdown'
                        placeholder="Frequência"
                        selectedValue={frequencia.selected} 
                        onValueChange={(text) => {
                            setFieldValue('frequencia', text)
                            setFrequencia({selected: text})
                        }} 
                    >
                        <Picker.Item color='#2F364B' label="Uma vez ao dia" value={1} key={1}/>
                        <Picker.Item color='#2F364B' label="Duas vezes ao dia" value={2} key={2}/>
                        <Picker.Item color='#2F364B' label="Três vezes ao dia" value={3} key={3}/>
                        <Picker.Item color='#2F364B' label="Quatro vezes ao dia" value={4} key={4}/>
                    </Picker>
                </Item>
                    
                <TouchableOpacity style={style.freqContainer} onPress={showDoseModal}>
                    <Text style={style.textFreq}>Dosagem</Text>    
                    <Text style={style.textFreqQuant}>{values.dosagem.split(" ", 1)} <Text style={style.textFreqType}>{values.dosagem.split(" ")[1]} <Text style={style.textFreqType}>{values.dosagem.split(" ")[2]}</Text></Text></Text>
                </TouchableOpacity>
                <DosagemModal setFieldValue={setFieldValue} hideDialog={hideDialog} visible={visibleDosagem}/>

            
                <View>
                    {cont.map((element, index)=>(
                        <MyTime key={index} index={index} />
                    ))}
                </View>
            
                <View style={style.containerTitle}>
                    <Title>Duração *</Title>
                </View>

                <Item style={style.itemPicker}>
                    <Picker
                        style={{padding: "5.5%"}}
                        mode='dropdown'
                        placeholder="Duração"
                        selectedValue={duracao.selected} 
                        onValueChange={(text) => {
                            AlterDuracao(text)
                            setFieldValue('duracao', text)
                            setDuracao({selected: text})
                        }} 
                    >
                        <Picker.Item color='#7B7B7B' label="Duração" value=""/>
                        <Picker.Item color='#2F364B' label="Sem data de término" value={1} key={1}/>
                        <Picker.Item color='#2F364B' label="Até a data específica" value={2} key={2}/>
                        <Picker.Item color='#2F364B' label="Quant. de dias" value={3} key={3}/>
                    </Picker>
                </Item>
                {touched.duracao && errors.duracao &&
                    <Text style={globalStyle.textError}>{errors.duracao}</Text>}

                {renderDuracao && (
                <TouchableOpacity onPress={()=>setVisibleQntDias(true)} style={style.freqContainer}>
                    <Text style={style.textFreq}>Dias</Text>
                    <Text style={style.textFreqQuant}>{values.qntDias}</Text>
                </TouchableOpacity>              
                )}
                <QntDiasModal 
                    visible={visibleQntDias} 
                    hideDialog={hideDialog} 
                    setFieldValue={setFieldValue}
                />
                {renderDays && (
                    <View>
                        <MyDate name="dataInicio" values={values} setFieldValue={setFieldValue} />
                        <MyDate name="dataFim" values={values} setFieldValue={setFieldValue} />
                    </View>
                )}
                    
                <View style={style.containerTitle}>
                    <Title>Instruções <Text style={style.titleOptional}>(Opcional)</Text></Title>
                    <Switch 
                        value={instrucaoOn} 
                        onValueChange={onToggleSwitchInstrucao}
                        trackColor={{ false: "#cfd2d9", true: "#a8adba" }}
                        thumbColor={instrucaoOn ? "#2F364B" : "#a3a6ab"}
                    />
                </View>

                {showInstrucao && (
                    <TouchableOpacity onPress={() => setVisibleInstrucao(true)}>
                        <Item style={style.pickerInstrucao} onPress={() => setVisibleInstrucao(true)}>
                            <Picker
                                style={{padding: "5.5%"}}
                                enabled={false}
                                placeholder="Instruções"
                                selectedValue={instrucao} 
                                onValueChange={(text) => {
                                    setInstrucao({selected: text})
                                }} 
                            >
                                <Picker.Item color={colorInstrucao} label={valorInstrucao} value="" key={0}/>
                            </Picker>
                        </Item>
                    </TouchableOpacity>
                )}
                <InstrucaoModal 
                    visible={visibleInstrucao} 
                    cancelDialogInstrucao={cancelDialogInstrucao} 
                    hideDialog={hideDialog} 
                    setFieldValue={setFieldValue} 
                    setColorInstrucao={setColorInstrucao}
                />


                <View style={{margin: "3%"}}></View>


                <View style={style.containerTitle}>
                    <Title>Estoque <Text style={style.titleOptional}>(Opcional)</Text></Title>
                    <Switch 
                        value={estoqueOn} 
                        onValueChange={onToggleSwitchEstoque}
                        trackColor={{ false: "#cfd2d9", true: "#a8adba" }}
                        thumbColor={estoqueOn ? "#2F364B" : "#a3a6ab"}
                    />
                </View>

                {showEstoque && (
                    <TextInput  
                        placeholder='Quantidade total'
                        style={style.input}
                        keyboardType="numeric"
                        onChangeText={(text) => setFieldValue('estoque',text)}
                        value={values.estoque}
                    />
                )}            

                    <View style={style.buttonsContainer}>                                
                        <Button 
                            children='Voltar' 
                            color='#FFF' 
                            style={globalStyle.button}
                            onPress={()=>goListRemedy()}
                            disabled={isSubmitting}
                        />
                        <Button 
                            children='Confirmar' 
                            color='#fff' 
                            style={globalStyle.buttonFinish}
                            onPress={()=>setHours()}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                        />
                    </View>
                </View>
            </ScrollView>
        </Form>
            
    </View>
        
        
    </>
    );
};
