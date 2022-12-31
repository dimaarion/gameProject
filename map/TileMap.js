import React, { Component, useEffect,useRef, useState } from 'react';
//import PropTypes from 'prop-types';
import scena from "../assets/scena.json";
import { View, Image, NativeImage,Text } from 'react-native';
import {getObjects,getObject, getObjectData} from '../action/index';

export default function TileMap() {
    const[object, setObject] = useState([{}]) 
    let col, row, index;
    col = 0;
    row = 0;
    let x = [];
    let y = [];
    let xt = [];
    let yt = [];
  
   getObjectData(scena,'bg')
   getObjectData(scena,'bg').map((index, i)=>{
     x[i] = col * scena.tilewidth;
    y[i] = row * scena.tileheight;
    
    col++; 
    if(index > 0){
      
   
       xt[i] = ((--index * 50) % 800);
       yt[i] = ((--index * 50) / 800 ) * scena.tilewidth; 
   }
     if(col > (scena.width - 1)){
       col = 0;
       row++; 
       
   }
 
})
console.log(xt)
      return (
        <View style = {{flex:1}}>

{x.map((x, i)=><View style = {{position:"absolute", marginTop:x[i],marginLeft: y[i],height:50,width:50,backgroundColor:"red"}}><Text>{x[i]}</Text></View>)}
   
        </View>
      )
}