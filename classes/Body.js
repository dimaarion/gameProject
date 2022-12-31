import Matter from "matter-js";
import { getObject, getObjects } from "../action/index";
import scena from '../assets/scena.json';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Body {
    World = Matter.World;
    Bodies = Matter.Bodies;
    Engine = Matter.Engine;
    body = [];
    name = "platform"
    figure = 0;
    options = {
        animate: false,
        name: this.name,
        type: ""
    }

    scenaWidth = scena.width * scena.tilewidth;
    scenaHeigiht = scena.height * scena.tileheight;
    scenaSize = this.scenaWidth + this.scenaHeigiht;
    constructor(name) {
        this.name = name;
    }
    procentIn(n, p) {
        return (n / 100) * p;
    }
    procent(x) {
        let r = windowWidth + windowHeight;
        return this.procentIn(r, x);
    }
    procentX(x) {
        let r = windowWidth;
        return this.procentIn(r, x);
    }
    procentY(x) {
        let r = windowHeight;
        return this.procentIn(r, x);
    }
    procentInv(n, p) {
        return (p * 100) / n;
    }


    createRect(world) {
        this.body = getObjects(scena, this.name).map((x) =>
            this.Bodies.rectangle(
                this.procent(this.procentInv(this.scenaSize,x.x + x.width / 2)) ,
                this.procent(this.procentInv(this.scenaSize, x.y + x.height / 2)),
                this.procent(this.procentInv(this.scenaSize,x.width)),
                this.procent(this.procentInv(this.scenaSize,x.height)),
                { width: this.procent(this.procentInv(this.scenaSize,x.width)), height: this.procent(this.procentInv(this.scenaSize,x.height)) }
            
            )
        );
        this.body.map((x) => this.World.add(world, x));
        return this.body;
    }

    createCircle(world) {
        this.body = getObjects(scena, this.name).map((x) =>
            this.Bodies.circle(
                x.x + x.width / 2,
                x.y + x.height / 2,
                x.width / 2,
                { width: x.width / 2 }
                //this.procent(this.procentInv(this.scenaHeight(), x.height))
            )
        );
        this.body.map((x) => this.World.add(world, x));
        return this.body;
    }

    sistems(entities) {

    }


    isStatic(t) {
        this.body.map((x) => (x.isStatic = t));
    }

}