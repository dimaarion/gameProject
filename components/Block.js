import React, { PureComponent, useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default function Block(props) {
    let color = "black";
    if (props.color) {
        color = props.color;
    }

    useEffect(() => {
  
    }, [])
  
   return (props.body.map((x) => <View style={
        { 
            left: x.position.x - x.width / 2, 
            top: x.position.y - x.height / 2, 
            width: x.width , 
            height: x.height, 
            backgroundColor: color,
            position:"absolute"
        }
    } key={x.id}></View>)
    
    )
}