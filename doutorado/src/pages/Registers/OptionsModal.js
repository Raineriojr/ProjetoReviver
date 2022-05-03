import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, RadioButton, Portal, Dialog, Divider } from 'react-native-paper';

import style from './style';
import globalStyle from '../styles/global';

export default function OptionsModal(props) {

    const { name, visible, hideDialog, setDepressao, setMotivacao, setFala,
            setDegluticao, setHigiene, setMovimentoNaCama, setCaminhar, setTremor,
            setLevantar, setPostura, setMarcha, setLentidao, setFieldValue } = props;

    const [ value, setValue ] = useState([]); //pega valor selecionado
    const [ selected, setSelected ] = useState(''); //estado para cor de item selecionado
  
    const arrayMotivacao = [
      '😁   Normal', 
      '🙂 Está menos interessado que o normal, sentindo-se mais desanimado',
      '😔 Sem vontade de realizar tarefas ou desinteresse por atividades não rotineiras',
      '😟 Sem vontade de realizar tarefas ou desinteresse por atividades do dia-a-dia',
      '😩 Sentindo-se retraído, perda completa de motivação'
    ];
    const arrayDepressao = [
      '😃 Ausente', 
      '🙁 Períodos de tristeza ou culpa acima do normal, nunca por dias ou semanas',
      '😢 Depressão permanente, período de uma semana ou mais',
      '😰 Depressão mantida com alguns sintomas como insônia, anorexia, perda de peso, desinteresse',
      '😭 Depressão mantida com sintomas como insônia, anorexia, perda de peso, desinteresse e até pensamento ou tentativa de suicídio'
    ];
    const arrayFala = [
      'Normal',
      'Comprometimento leve, sem dificuldade em ser entendido',
      'Comprometimento moderado; às vezes solicitado a repetir frases',
      'Comprometimento intenso; frequentemente solicitado a repetir frases',
      'Incompreensível a maior parte do tempo'
    ];
    const arrayDegluticao = [
      'Normal',
      'Raros engasgos',
      'Engasgos ocasionais',
      'Necessita alimentos pastosos',
      'Necessita alimentação por sonda nasogástrica ou gastrostomia'
    ];
    const arrayHigiene = [
      'Normal',
      'Ação lenta, mas não precisa de ajuda',
      'Precisa de ajuda no chuveiro ou apresenta-se muito lento nos cuidados de higiene',
      'Necessita de assistência para se lavar, escovar os dentes, pentear-se, ir ao banheiro. ',
      'Sonda vesical (tubo para ajudar na eliminação da urina) ou outra ajuda mecânica'
    ];
    const arrayMovimentoNaCama = [
      'Normal',
      'Ação lenta e desajeitada, mas não precisa de ajuda',
      'Pode girar sozinho na cama ou colocar lençóis, mas com grande dificuldade',
      'Pode iniciar, mas não consegue rolar na cama ou colocar lençóis sozinho',
      'Incapaz'
    ];
    const arrayCaminhar = [
      'Normal',
      'Leve dificuldade, pode não balançar os braços ou tende a arrastar as pernas',
      'Dificuldade moderada, mas necessita de pouca ou nenhuma ajuda',
      'Dificuldade intensa de andar, necessitando de ajuda',
      'Não consegue andar, mesmo com ajuda'
    ];
    const arrayTremor = [
      'Ausente',
      'Simples e com pouca frequência',
      'Moderado, sendo capaz de lhe incomodar',
      'Intenso, interferindo em muitas atividades',
      'Muito frequente, interferindo na maioria das atividades'
    ];
    const arrayLevantar = [
      'Normal',
      'Lento ou pode precisar de mais de uma tentativa',
      'Apoia-se nos braços da cadeira',
      'Tende a cair para trás, podendo necessitar de várias tentativas, mas consegue levantar-se',
      'Incapaz de levantar-se sem ajuda'
    ];
    const arrayPostura = [
      'Normal reto',
      'Postura não muito reta, levemente curvado, podendo ser normal em idosos',
      'Moderadamente curvado, podendo apresentar inclinação leve para um lado',
      'Intensamente curvado; podendo haver inclinação moderada para um lado',
      'Claramente curvado com anormalidade extrema da postura'
    ];
    const arrayMarcha= [
      'Normal',
      'Anda lentamente, podendo arrastar os pés com pequenas passadas',
      'Anda com dificuldade, mas precisa de pouca ou nenhuma ajuda',
      'Comprometimento intenso da marcha; necessitando de ajuda',
      'Não anda sozinho, mesmo com ajuda'
    ];
    const arrayBradicinesia= [
      'Nenhum',
      'Lentidão mínima, com possível redução na amplitude dos movimentos',
      'Lentidão leve, com diminuição da amplitude dos movimentos' ,
      'Lentidão MODERADA, com diminuição da amplitude dos movimentos',
      'Lentidão ACENTUADA, com diminuição da amplitude dos movimentos'
    ];

  
    const Confirm = () =>{
      if(name === 'Depressão'){
        setDepressao(value)
        setFieldValue('humor.depressao', value[0])
      }
      else if(name === 'Motivação'){
        setMotivacao(value)
        setFieldValue('humor.motivacao', value[0])
      }
      else if(name === 'Fala'){
        setFala(value)
        setFieldValue('sintomas.fala', value[0])
      }
      else if(name === 'Deglutição'){
        setDegluticao(value)
        setFieldValue('sintomas.degluticao', value[0])
      }
      else if(name === 'Higiene'){
        setHigiene(value)
        setFieldValue('sintomas.higiene', value[0])
      }
      else if(name === 'Movimentar-se na cama'){
        setMovimentoNaCama(value)
        setFieldValue('sintomas.movimentoNaCama', value[0])
      }
      else if(name === 'Caminhar'){
        setCaminhar(value)
        setFieldValue('sintomas.caminhar', value[0])
      }
      else if(name === 'Tremor'){
        setTremor(value)
        setFieldValue('sintomas.tremor', value[0])
      }
      else if(name === 'Levantar da cadeira'){
        setLevantar(value)
        setFieldValue('sintomas.levantar', value[0])
      }
      else if(name === 'Postura'){
        setPostura(value)
        setFieldValue('sintomas.postura', value[0])
      }
      else if(name === 'Levantar'){
        setLevantar(value)
        setFieldValue('sintomas.levantar', value[0])
      }
      else if(name === 'Postura'){
        setPostura(value)
        setFieldValue('sintomas.postura', value[0])
      }
      else if(name === 'Marcha'){
        setMarcha(value)
        setFieldValue('sintomas.marcha', value[0])
      }
      else if(name === 'Lentidão dos movimentos'){
        setLentidao(value)
        setFieldValue('sintomas.lentidao', value[0])
      }
        hideDialog();
    }

    const renderOptions = () =>{
        if(name === 'Depressão'){
            return (
            arrayDepressao.map((element, index)=>{
              return(
                <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
                  <Text style={style.textItemList}>{element}</Text>
                  <Divider/>
                </TouchableOpacity>
              )
            })
        )}
        else if (name === 'Motivação'){
            return(
            arrayMotivacao.map((element, index)=>(  
              <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
                <Text style={style.textItemList}>{element}</Text>
                <Divider/>
              </TouchableOpacity>
          ))
        )}
        else if (name === 'Fala'){
          return(
          arrayFala.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Deglutição'){
          return(
          arrayDegluticao.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Higiene'){
          return(
          arrayHigiene.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Movimentar-se na cama'){
          return(
          arrayMovimentoNaCama.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Caminhar'){
          return(
          arrayCaminhar.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Tremor'){
          return(
          arrayTremor.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Levantar da cadeira'){
          return(
          arrayLevantar.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Postura'){
          return(
          arrayPostura.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Marcha'){
          return(
          arrayMarcha.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        else if (name === 'Lentidão dos movimentos'){
          return(
          arrayBradicinesia.map((element, index)=>(  
            <TouchableOpacity style={index === selected ? style.itemListOptionsSeleted : style.itemListOptions} key={index} onPress={()=>{setValue([index, element]); setSelected(index)}}>
              <Text style={style.textItemList}>{element}</Text>
              <Divider/>
            </TouchableOpacity>
        ))
        )}
        
    }
    
    return (
      <View>
        <Portal>
          <Dialog visible={visible} dismissable={false} onDismiss={hideDialog}>
            <Dialog.Title style={style.titleModal}>{name}</Dialog.Title>
            <Dialog.Content>
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    {renderOptions()}
                </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <View style={globalStyle.containerButtonModal}>
                <Button color="#F9A749" onPress={hideDialog}>CANCELAR</Button>
                <Button color="#F9A749" onPress={()=>Confirm()}>DEFINIR</Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };
  