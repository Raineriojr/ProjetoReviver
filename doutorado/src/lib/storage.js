import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataStorage = async (name) => {
    const resp = await AsyncStorage.getItem(name);
    
    return resp !== null ? true : false;
}

export const getDataUser = async (name) => {
    const item = await AsyncStorage.getItem(name);

    return item;
}