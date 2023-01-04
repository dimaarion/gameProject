import Body from './Body';
import Matter from "matter-js";
import scena from '../assets/scena.json';
import { getObject, getObjects, createArray } from '../action/action';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Player {
  body = [];
  body2 = [];
  b;
  name = 'player';
  props = {};
  x = windowWidth / 2;
  y = windowHeight / 2;
  mx = 0
  my = 0;
  r = 0;
  h = 0;
  countBody = 4;
  constructor(props) {
    this.props = props;
  }
  src(x) {
    return x;
  }
  create() {
    this.b = new Body(this.props);
    this.body = getObjects(scena, this.name).map((x) => {
      this.r = this.b.size(x.width)
      this.mx = this.b.size(x.x + x.width / 2);
      this.my = this.b.size(x.y + x.height / 2);
      return this.b.Bodies.circle(
        this.b.size(x.x + x.width / 2),
        this.b.size(x.y + x.height / 2),
        this.b.size(x.width),
        { width: this.b.size(x.width) }
      )
    });

    this.body.map((x) => this.b.World.add(this.props, x));
    return this.body;
  }

  createBody() {
    let r = this.r;
    var group = Matter.Body.nextGroup(true);
    this.body2[0] = Matter.Composites.stack(this.x, this.y + r + 10, this.countBody, 1, 10, 10, function (x, y) {
      return Matter.Bodies.circle(x, y, r, { collisionFilter: { group: group } });
    });
    Matter.Composites.chain(this.body2[0], 0.5, 0, -0.5, 0, { stiffness: 0.1, length: 2, render: { type: 'line' } });
    Matter.Composite.add(this.body2[0], Matter.Constraint.create({
      bodyB: this.body2[0].bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: this.body2[0].bodies[0].position.x, y: this.body2[0].bodies[0].position.y },
      stiffness: 0.1
    }));

    /*
    this.body2[0] = this.b.Bodies.circle(
      this.b.size(windowWidth / 2 + this.r ),
      this.b.size(windowHeight / 2 + this.r  ),
      this.r,{width:this.r});*/
    this.body2.map((x) => this.b.World.add(this.props, x));
    return this.body2;
  }

  composite() {/*
  var constraint = this.b.Constraint.create({
        pointA: {x: this.mx,y:this.my},
        bodyB: this.body2[0].bodies[0],
        pointB: {x: -20,y:-200}
    });

    
  this.b.Composite.add(this.props,[this.body[0],constraint]) ;*/
  }

  isSensor(t) {
    this.body.map((x) => (x.isSensor = t));
  }

  setInnertia(body,t){
        body.map((x) => (Matter.Body.setInertia(x,t)));
  }
}
