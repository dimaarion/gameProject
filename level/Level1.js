import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { ProcessingView } from "expo-processing";
import Matter from 'matter-js';
import { GameEngine } from "react-native-game-engine";
import Physics from "../Physics";
import Sprite from "../components/Sprite";
import Body from "../classes/Body";
export default function Level () {
   let engine = Matter.Engine.create({ enableSleeping: false });
   let world = engine.world;
   let platform = new Body("platform");
   platform.createRect(world);
   platform.isStatic(true)
   let game =  {
      gameWorld: { engine: engine, world: world },
      platform: {body: platform.body,color:"blue",src:()=>arrSpr,sprait:platform.sprite,options:{},renderer: <Sprite/> },
   }
   return (
      <GameEngine
        style={styles.container}
        systems={[Physics]}
        entities={game}>
        <StatusBar hidden={true} />
      </GameEngine>
      )
    
    
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#FFF"
      }
    });
