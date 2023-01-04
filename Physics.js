import Matter from "matter-js"
import scena from "./assets/scena.json";
import { Dimensions } from 'react-native';
import Body from "./classes/Body";
import { getObject, getObjects,camera } from "./action/action";
import Player from "./classes/Player";
let startPlay = 1;
let startUp = 0;
let plPosY = 0;
let press = 0;
let pages = { x: 0, y: 0 };
let collision = false;
let collisionPl = false;
let pressPos = 0;
let rePress = 0;
let c = 0;
let c2 = 0;
export default function Physics(entities, { touches, time, events, world }) {
  let body = new Body()
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let engine = entities.gameWorld.engine;
  let player = entities.player.body;
  let player2 = entities.player2.body;
  let platform = entities.platform.body;
  let map = entities.map.body;
   
  let pl = new Player();
 camera(platform, player[0], getObjects(scena,"player")[0],Matter);
 //camera(player2[0].bodies[0], player[0], getObjects(scena,"player")[0],Matter);
 camera(map, player[0], getObjects(scena,"player")[0],Matter);
 events.map((x) => {
 
    press = x.press;
 
    
});

let r = 0;
let t = 0;
if(press == 1){
    r = 5;
}else if(press == 3){
    r = -5
}else if(press == 2){
    t = 5
}else if(press == 4){
    t = -5
}else{
  r = 0;
  t = 0;
}
 Matter.Body.setPosition(player[0], {
    x:pl.x + r,
    y:pl.y + t
  })
 
 
 
 
  
  Matter.Engine.update(engine, time.delte)
  return entities
}