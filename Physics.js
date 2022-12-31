import Matter from "matter-js"
import { Dimensions } from 'react-native';
let startPlay = 1;
let startUp = 0;
let plPosY = 0;
export default function Physics(entities, { touches, time, events, world }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  let engine = entities.gameWorld.engine;

  Matter.Engine.update(engine, time.delte)
  return entities
}