import React, { useEffect, useState } from 'react';
import Routes from './src/routes/routes';
import AppLoading from 'expo-app-loading';
import * as Updates from "expo-updates";
import * as Notifications from 'expo-notifications';

import { AuthProvider } from './src/context/authContext';

import {
    useFonts,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_300Light,
    Roboto_100Thin
} from '@expo-google-fonts/roboto';


//ativa notificação em primeiro plano
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
 });

export default function App() {
    const [ visible, setVisible ] = React.useState(false); //exibe modal de medicamento
    const lastNotificationResponse = Notifications.useLastNotificationResponse(); //recebe notificação

    const [ data, setData ] = useState({}) //dados vindos na notificação

    useEffect(()=>{
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: false,
              shouldSetBadge: false,
            }),
         });
    })

    useEffect(() => {
        if (lastNotificationResponse) {
            setData(lastNotificationResponse.notification.request.trigger.remoteMessage.data)
            setVisible(true)
        }
    }, [lastNotificationResponse]);

    useEffect(() => {
        async function updateApp() { //Atualiza modificações sem gerar outra build
            const { isAvailable } = await Updates.checkForUpdateAsync();
            if (isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync(); //depende da sua estratégia
            }
        }   
        updateApp();        
    }, []);

    let [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular,
        Roboto_300Light,
        Roboto_100Thin
        });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}
