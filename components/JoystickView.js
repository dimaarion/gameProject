import React, { PureComponent, useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar, RootTagContext } from 'react-native';

export default function JoystickView(props) {
    let color = "black";
    if (props.color) {
        color = props.color;
    }

    useEffect(() => {
 console.log(props)
    }, [])
  
   return (<View style={
        { 
            left: props.body.x, 
            top: props.body.y, 
            width: props.body.width , 
            height: props.body.height, 
            backgroundColor: props.body.color,
            position:"absolute",
            
        }
    }></View>)
    
    
}