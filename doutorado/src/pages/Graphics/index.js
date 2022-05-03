import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { width } from '../../config/constants';
import { style } from './style';
import api from '../../services/api';

import { AuthContext } from '../../context/authContext';
import { ActivityIndicator, Badge, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GraphicModal from './modal';
import { Chart, Line, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

export default function Graphic(){

    const [ loading, setLoading ] = React.useState(false);
    const [ visible, setVisible ] = React.useState(false);
    const { state } = React.useContext(AuthContext);
    const [ dataArray, setdataArray ] = React.useState([]);

    React.useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
        setLoading(true)
        const tapList = await api.get('/registros/lista', { headers: {
            authorization: state.userId
        }})
        if(tapList.data == '' || tapList.data == []){
            setVisible(true) 
        } else {
            setdataArray(tapList.data); 
            setLoading(false)  
        }
    }

    if(visible) return <GraphicModal visible={visible} setVisible={setVisible}/>;

    const dataTap = dataArray.map((element, index)=>{
        return { x: index, y: element.finger_tap}
    })

    const dataHumor = dataArray.map((element, index)=>{
        return { x: index, y: element.emoji}
    })

    const dataMotiv = dataArray.map((element, index)=>{
        return { x: index, y: element.motivacao}
    })

    const dataDepre = dataArray.map((element, index)=>{
        return { x: index, y: element.depressao}
    })

    const dataFala =  dataArray.map((element, index)=>{
        return { x: index, y: element.fala}
    })

    const dataDeglut =  dataArray.map((element, index)=>{
        return { x: index, y: element.degluticao}
    })

    const dataHig =  dataArray.map((element, index)=>{
        return { x: index, y: element.higiene}
    })

    const dataMov =  dataArray.map((element, index)=>{
        return { x: index, y: element.movimentoNaCama}
    })

    const dataLev =  dataArray.map((element, index)=>{
        return { x: index, y: element.levantar}
    })

    const dataCaminh =  dataArray.map((element, index)=>{
        return { x: index, y: element.caminhar}
    })

    const dataMarch =  dataArray.map((element, index)=>{
        return { x: index, y: element.marcha}
    })

    const dataTremor =  dataArray.map((element, index)=>{
        return { x: index, y: element.tremor}
    })

    const dataPost =  dataArray.map((element, index)=>{
        return { x: index, y: element.postura}
    })
   
    const dataLent =  dataArray.map((element, index)=>{
        return { x: index, y: element.lentidao}
    })

    if(loading) return <View style={style.loading}><ActivityIndicator size="large" /></View>
    return(<>
        <Header title="Meus Registros"/>

        <ScrollView style={{flex: 1}}>

        <View style={style.informations}>
            <Title style={style.textInfo}>
                Acompanhe sua evolução nos gráficos abaixo. Toque nas áreas em branco para rolar pela página.
            </Title>
        </View>

        <View style={style.container}>
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Finger Tap</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Cliques</Text>
                        </View> 
                    </View>
                </View>
                
                <Chart
                    style={style.chart}
                    data={  dataTap }
                        padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                        xDomain={{ min: 0, max: 10 }}
                        yDomain={{ min: 0, max: 200 }}
                    >
                    <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    <Line theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <View style={style.titleFooter}>
                        <Text style={style.titleChart}>Cliques a cada 15 segundos</Text> 
                        <Text style={style.yText}>Semanas</Text>
                    </View>
                </Chart>
            </View>

{/**************************************************************************** */}
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Variação de Humor</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Humor</Text>
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#4CF0F6'}}/><Text style={style.yText}>Motivação</Text> 
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#F64C4C'}}/><Text style={style.yText}>Depressão</Text> 
                        </View> 
                    </View>
                </View>
                <Chart
                    style={style.chart}
                    xDomain={{ min: 0, max: 10 }}
                    yDomain={{ min: 0, max: 4 }}
                    padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                >
                    <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    
                    <View>
                        <View style={style.emojiContainer}>
                            <Icon name='emoticon-happy' size={20} color="#15881D"/>
                            <Text style={style.yText2}>Pontuação</Text>
                            <Icon name='emoticon-sad' size={20} color="#F64C4C"/>
                        </View>
                        <View style={style.titleFooter}>
                            <Text style={style.titleChart}>Estado mental, comportamento e humor</Text>
                            <Text style={style.yText}>Semanas</Text>
                        </View>
                    </View>
                    
                    <Line  data={ dataHumor } theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataMotiv } theme={{ stroke: { color: '#4CF0F6', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataDepre } theme={{ stroke: { color: '#F64C4C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                </Chart>
            </View>

{/**************************************************************************** */}
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Atividade da Vida Diária I</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Fala</Text>
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#4CF0F6'}}/><Text style={style.yText}>Deglutição</Text> 
                        </View>
                    </View>
                </View>
                <Chart
                    style={style.chart}
                    xDomain={{ min: 0, max: 10 }}
                    yDomain={{ min: 0, max: 4 }}
                    padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                >
                    <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    
                    <View>
                        <View style={style.emojiContainer}>
                            <Icon name='emoticon-happy' size={20} color="#15881D"/>
                            <Text style={style.yText2}>Pontuação</Text>
                            <Icon name='emoticon-sad' size={20} color="#F64C4C"/>
                        </View>
                        <View style={style.titleFooter}>
                            <Text style={style.titleChart}>Estado mental, comportamento e humor</Text>
                            <Text style={style.yText}>Semanas</Text>
                        </View>
                    </View>
                    
                    <Line  data={ dataFala } theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataDeglut } theme={{ stroke: { color: '#4CF0F6', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                </Chart>
            </View>

{/**************************************************************************** */}
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Atividade Diária II</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Higiene</Text>
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#4CF0F6'}}/><Text style={style.yText}>Movimentar-se no leito</Text> 
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#F64C4C'}}/><Text style={style.yText}>Levantar da Cadeira</Text> 
                        </View> 
                    </View>
                </View>
                <Chart
                    style={style.chart}
                    xDomain={{ min: 0, max: 10 }}
                    yDomain={{ min: 0, max: 4 }}
                    padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                >
                    <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    
                    <View>
                        <View style={style.emojiContainer}>
                            <Icon name='emoticon-happy' size={20} color="#15881D"/>
                            <Text style={style.yText2}>Pontuação</Text>
                            <Icon name='emoticon-sad' size={20} color="#F64C4C"/>
                        </View>
                        <View style={style.titleFooter}>
                            <Text style={style.titleChart}>Estado mental, comportamento e humor</Text>
                            <Text style={style.yText}>Semanas</Text>
                        </View>
                    </View>
                    
                    <Line  data={ dataHig } theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataMov } theme={{ stroke: { color: '#4CF0F6', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataLev } theme={{ stroke: { color: '#F64C4C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                </Chart>
            </View>

{/**************************************************************************** */}
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Exame Motor I</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Caminhar</Text>
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#4CF0F6'}}/><Text style={style.yText}>Marcha</Text> 
                        </View> 
                    </View>
                </View>
                <Chart
                    style={style.chart}
                    xDomain={{ min: 0, max: 10 }}
                    yDomain={{ min: 0, max: 4 }}
                    padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                >
                    <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    
                    <View>
                        <View style={style.emojiContainer}>
                            <Icon name='emoticon-happy' size={20} color="#15881D"/>
                            <Text style={style.yText2}>Pontuação</Text>
                            <Icon name='emoticon-sad' size={20} color="#F64C4C"/>
                        </View>
                        <View style={style.titleFooter}>
                            <Text style={style.titleChart}>Estado mental, comportamento e humor</Text>
                            <Text style={style.yText}>Semanas</Text>
                        </View>
                    </View>
                    
                    <Line  data={ dataCaminh } theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataMarch } theme={{ stroke: { color: '#4CF0F6', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                </Chart>
            </View>

{/**************************************************************************** */}
            <View style={style.containerChart}>
                <View style={style.rowContent}>
                    <Text style={style.title}>Exame Motor II</Text>
                    <View>
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#74E77C'}}/><Text style={style.yText}>Tremor</Text>
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#4CF0F6'}}/><Text style={style.yText}>Postura</Text> 
                        </View> 
                        <View style={style.legenda}>
                            <Badge size={14} style={{backgroundColor: '#F64C4C'}}/><Text style={style.yText}>Lentidão dos Movimentos</Text> 
                        </View>
                    </View>
                </View>
                <Chart
                    style={style.chart}
                    xDomain={{ min: 0, max: 10 }}
                    yDomain={{ min: 0, max: 4 }}
                    padding={{ left: width*0.08, bottom: 32, right: width*0.05, top: 30 }}
                >
                    <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v } }} />
                    <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
                    
                    <View>
                        <View style={style.emojiContainer}>
                            <Icon name='emoticon-happy' size={20} color="#15881D"/>
                            <Text style={style.yText2}>Pontuação</Text>
                            <Icon name='emoticon-sad' size={20} color="#F64C4C"/>
                        </View>
                        <View style={style.titleFooter}>
                            <Text style={style.titleChart}>Estado mental, comportamento e humor</Text>
                            <Text style={style.yText}>Semanas</Text>
                        </View>
                    </View>
                    
                    <Line  data={ dataTremor } theme={{ stroke: { color: '#74E77C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataPost } theme={{ stroke: { color: '#4CF0F6', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                    <Line  data={ dataLent } theme={{ stroke: { color: '#F64C4C', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
                </Chart>
            </View>
        </View>
        </ScrollView>
    </>)
}