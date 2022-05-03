import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext();

const initialState = {
        auth: false,
        username: '',
        userId: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return  {
                auth: state.auth = true,
                username: action.payload || "",
                userId: action.payload2 || ""
            }
        case "logout":
            return{
                auth: state.auth = false
            }
          
        default:
            return initialState;
     }
  };
  
  
  export const AuthProvider = ({ children }) => {
      const [ state, dispatch ] = React.useReducer(reducer, initialState);
  
      const contextValue = React.useMemo(() => {
          return { state, dispatch };
      }, [ state, dispatch ]);
  
      return (
          <AuthContext.Provider value={contextValue} >
              {children}
          </AuthContext.Provider>
      )
  }