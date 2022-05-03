import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { AuthContext } from '../context/authContext';
import { AuthRoutes } from './authRoutes';
import { UnauthRoutes } from './unauthRoutes';

import { theme } from '../pages/styles/global';

export default function Routes(){
    
    const { state } = React.useContext(AuthContext);

    return(
        <NavigationContainer>
            <PaperProvider theme={theme}>
                {state.auth ? <AuthRoutes/> : <UnauthRoutes />}
            </PaperProvider>
        </NavigationContainer>
    );
}