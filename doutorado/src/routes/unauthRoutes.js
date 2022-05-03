import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from '../pages/Login';
import cadStep1 from '../pages/Cadastro/cadStep1';
import cadStep2 from '../pages/Cadastro/cadStep2'; 
import cadStep3 from '../pages/Cadastro/cadStep3';
import finishStep from '../pages/Cadastro/finishStep';
import { SplashScreen } from '../pages/splashScreen';

export const UnauthRoutes = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='cadStep1' component={cadStep1}/>
        <Stack.Screen name='cadStep2' component={cadStep2}/>
        <Stack.Screen name='cadStep3' component={cadStep3}/>
        <Stack.Screen name='finishStep' component={finishStep}/>
    </Stack.Navigator>
)