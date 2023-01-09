import Matter from "matter-js"
import scena from "./assets/scena.json";
import { Dimensions } from 'react-native';
import Body from "./classes/Body";
import Joystick from './classes/Joystick';
import { getObject, getObjects, camera } from "./action/action";
import Player from "./classes/Player";
let startPlay = 1;
let startUp = 0;
let plPosY = 0;
let press = 0;
let pages = { x: 0, y: 0 };
let collision = false;
let collisionPl = false;
let pressPos = { x: 0, y: 0 };
let rePress = 0;
let c = 0;
let c2 = 0;
export default function Physics(entities, { touches, time, events, world }) {
  let body = new Body()
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let engine = entities.gameWorld.engine;
  let player = entities.player.body;
  let joystickV = entities.joystick.body;
  //let player2 = entities.player2.body;
  let platform = entities.platform.body;
  //let maps = entities.map.body;
 // Matter.Body.setInertia(player[0], 0.1)
  platform.map((x)=>Matter.Body.setInertia(x, 0.1))
  let pl = new Player();
  camera(platform, player[0], getObjects(scena, "player")[0], Matter);
  //camera(player2[0], player[0], getObjects(scena,"player")[0],Matter);
  //camera(maps, player[0], getObjects(scena,"player")[0],Matter);
  let type = ""
  events.map((x) => {




  });
  touches.map((x) => {
    type = x.type;
    pages.x = x.event.pageX;
    pages.y = x.event.pageY;
    if (x.type === "start") {
      press = 1;
    } else if (x.type === "end") {
      press = 0;
    }




  });

  let r = 0;
  let t = 0;

  let joystick = new Joystick(joystickV.x + joystickV.width / 2, joystickV.y + joystickV.height / 2);

  /*
    let xpos, ypos;
    var _PI = Math.PI;
    var RAD_TO_DEG = 180 / _PI; // SHAPE
    const MAX_DEFLECT = 0.3926991;
    ypos = _map(mouseYRatio(pages.y, windowHeight / 2), 1, -1, -MAX_DEFLECT, MAX_DEFLECT);
    xpos = _map(mouseXRatio(pages.x, windowWidth / 2), -1, 1, -MAX_DEFLECT, MAX_DEFLECT);
  
    function _fromRadians(angle) {
      return angle * RAD_TO_DEG;
    };
   
  
    function constrain(n, low, high) {
      return Math.max(Math.min(n, high), low);
    };
  
    function _map(n, start1, stop1, start2, stop2, withinBounds) {
      var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      if (!withinBounds) {
        return newval;
      }
      if (start2 < stop2) {
        return constrain(newval, start2, stop2);
      } else {
        return constrain(newval, stop2, start2);
      }
    };
  
    function mouseXRatio(mouseX, xPosJ) {
      return mouseRatio(mouseX, xPosJ);
    }
  
    function mouseYRatio(mouseY, yPosJ) {
      return -mouseRatio(mouseY, yPosJ);
    }
  
    function mouseRatio(mouse, half) {
      let mouseFromCenter = mouse - half;
      return constrain(mouseFromCenter, -half, half) / half;
    }
  
   function _atan2(y, x) {
      return _fromRadians(Math.atan2(y, x));
    };
  
    player[0].angle = -_atan2(xpos, ypos)
    console.log(xpos + "/" + ypos);
    */
  
  player[0].angle = joystick._atan2(pages.x, pages.y) + 90
  Matter.Body.setPosition(player[0], {
    x: pl.x,
    y: pl.y
  })

  if (press === 1) {
    Matter.Body.setPosition(player[0], {
      x: pl.x + joystick.xpos * 30,
      y: pl.y + joystick.ypos * 50
    })
  }








  Matter.Engine.update(engine, time.delte)
  return entities
}