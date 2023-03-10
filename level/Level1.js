import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Button,
  Pressable,
  Image
} from 'react-native';
import { getObject, getObjects, getObjectData } from '../action/action';
import { ProcessingView } from 'expo-processing';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Physics from '../Physics';
import Sprite from '../components/Sprite';
import Walls from '../classes/Body';
import Player from '../classes/Player';

import Ball from '../components/Ball';
import Block from '../components/Block';
import Scena from '../classes/Scena';
import TileMap from '../map/TileMap';
import scena from '../assets/scena.json';
import TestBall from '../components/TestBall';
import Joystick from '../classes/Joystick';
import JoystickView from '../components/JoystickView';
import Body from '../classes/Body';

export default function Level() {
  const [event, setEvent] = useState(0);
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  let map = new Scena(world);
  map.create();
  map.isStatic(true);
  map.isSensor(true);
  let body = new Body();
  let platform = new Walls(world);
  let player = new Player(world);
  
  let playerOptions = new Player();
  let joystick = new Joystick(body.procent(10),body.procent(45),body.procent(20),body.procent(20))
  player.create('player');
  
  
  //let player2 = player.createBody();
  //player.composite();
  
  //player.isSensor(true)
  platform.createRect('platform');
  platform.isStatic(true);
  engine.gravity.y = 0.0;
  let gameEngine = null;
  React.useEffect(() => {
    gameEngine.dispatch({
      press: event,
    });
  }, [event]);


  let game = {
    gameWorld: { engine: engine, world: world },
    map: {
      body: map.body,
      size: 50,
      rows: scena.height,
      columns: scena.width,
      layers: getObjectData(scena, 'bg'),
      img: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        require('../assets/spider.png'),
      ],
      renderer: <TileMap />,
    },
    platform: {
      body: platform.body,
      color: 'blue',
      renderer: <Block />,
    },
    player: {
      body: player.body,
      color: 'red',
      options: {
        frameImg: 7,
        colums: 7,
        play: true,
        loop: true,
        fps: 10,
        src: player.src(require('../assets/spider.png')),
      },
      renderer: <Sprite />,
    },
   // player2: { body: player2, color: "green", renderer: <TestBall /> },
  joystick:{body:{x:joystick.w,y:joystick.h,width:joystick.width,height:joystick.height,color:"red"},renderer: <JoystickView />}
  };

  return (
    <GameEngine
      ref={(ref) => {
        gameEngine = ref;
      }}
      style={styles.container}
      systems={[Physics]}
      entities={game}
      onEvent={() => event}>
     
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  btnRight: {
    position: "absolute",
    top: 80 + "%",
    left: 80 + "%",
    transform: [{ rotate: "0deg" }]
  },
  btnLeft: {
    position: "absolute",
    top: 80 + "%",
    left: 50 + "%",
    transform: [{ rotate: "180deg" }]
  },
  btnDown: {
    position: "absolute",
    top: 88 + "%",
    left: 65 + "%",
    transform: [{ rotate: "90deg" }]
  }, btnUp: {
    position: "absolute",
    top: 72 + "%",
    left: 65 + "%",
    transform: [{ rotate: "-90deg" }]
  },
  img: {
    width: 50,
    resizeMode: 'contain'
  }
});
