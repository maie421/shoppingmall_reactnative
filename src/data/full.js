import React from 'react';
import { View ,AsyncStorage} from 'react-native';

export const uri =`http://shoppingmaie.herokuapp.com`;

export const LoginCheck=()=>{
    AsyncStorage.getItem("user", (err, value )=>{
        if (err == null){
            let json = JSON.parse(value);
            if(json){
                console.log(json);
                return true;
            }else{
                return false;
            }
        }
    });
}