import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import AddRemedy from '../pages/AddRemedy';
import EditRemedy from '../pages/EditRemedy';
import ListRemedy from '../pages/ListRemedy';
import RegisterStep1 from '../pages/Registers/RegisterStep1';
import RegisterStep2 from '../pages/Registers/RegisterStep2';
import RegisterStep3 from '../pages/Registers/RegisterStep3';
import RegisterStep4 from '../pages/Registers/RegisterStep4';
import FingerTap from '../pages/fingerTap';
import finishRegister from '../pages/Registers/finishRegister';
import Graphic from '../pages/Graphics';
import Teste from '../pages/Registers/Teste';

const Stack = createStackNavigator();

export const AuthRoutes = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='AddRemedy' component={AddRemedy}/>
        <Stack.Screen name='EditRemedy' component={EditRemedy}/>
        <Stack.Screen name='ListRemedy' component={ListRemedy}/>
        <Stack.Screen name='RegisterStep1' component={RegisterStep1}/>
        <Stack.Screen name='RegisterStep2' component={RegisterStep2}/>
        <Stack.Screen name='RegisterStep3' component={RegisterStep3}/>
        <Stack.Screen name='RegisterStep4' component={RegisterStep4}/>
        <Stack.Screen name='fingerTap' component={FingerTap}/>
        <Stack.Screen name='Graphic' component={Graphic}/>
        <Stack.Screen name='finishRegister' component={finishRegister}/>
        <Stack.Screen name='Teste' component={Teste}/>
    </Stack.Navigator>
)