import { P5CanvasInstance } from '@p5-wrapper/react';
import { Vector } from 'p5';
import { IOrganism } from './types/interfaces';

const healthbarWidth = 40;
const healthbarHeight = 5;
const healthbarOffset = 20;

export class Organism implements IOrganism {
    p5: P5CanvasInstance;
    canvasW: number;
    canvasH: number;
    id: string;
    health: number;
    rateOfDecay: number;
    pos: Vector;
    vel: Vector;
    visualRadius: number;
    feedingRadius: number;
    turnSpanAngle: number;
    travelSpeed: number;

    constructor(
        p5: P5CanvasInstance,
        canvasW: number,
        canvasH: number,
        pos: Vector,
        vel: Vector,
    ) {
        this.p5 = p5;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.id = self.crypto.randomUUID();
        this.health = 100;
        this.rateOfDecay = 0.05;
        this.pos = pos;
        this.vel = vel;
        this.visualRadius = 50;
        this.feedingRadius = 40;
        this.turnSpanAngle = Math.PI * 0.05;
        this.travelSpeed = 2;
    }

    explore() {
        const xAxis = this.p5.createVector(1, 0);
        const yAxis = this.p5.createVector(0, 1);

        if (
            this.pos.x + this.visualRadius > this.canvasW ||
            this.pos.x - this.visualRadius < 0
        ) {
            this.vel.reflect(xAxis);
        } else if (
            this.pos.y + this.visualRadius > this.canvasH ||
            this.pos.y - this.visualRadius < 0
        ) {
            this.vel.reflect(yAxis);
        } else {
            const turnAngle = this.p5.randomGaussian(0, this.turnSpanAngle);
            this.vel.rotate(turnAngle);
        }

        this.pos.add(this.vel);

        this.loseHealth();
        this.drawVisualField();
        this.drawHealthbar();

        this.p5.ellipse(this.pos.x, this.pos.y, 5);
    }

    loseHealth() {
        this.health = Math.max(this.health - this.rateOfDecay, 0);
    }

    feed(value: number) {
        this.health = Math.min(this.health + value, 100);
    }

    drawVisualField() {
        this.p5.stroke(120);
        this.p5.ellipse(this.pos.x, this.pos.y, this.visualRadius * 2);

        const posCopy = this.pos.copy();
        const velCopy = this.vel.copy();
        const endpoint = posCopy.add(velCopy.setMag(this.visualRadius));
        this.p5.line(this.pos.x, this.pos.y, endpoint.x, endpoint.y);
        this.p5.stroke(225);
    }

    drawHealthbar() {
        const rectX = this.pos.x - healthbarWidth / 2;
        const rectY = this.pos.y - healthbarOffset;
        this.p5.rect(rectX, rectY, healthbarWidth, healthbarHeight);

        this.p5.fill(225);
        this.p5.rect(
            rectX,
            rectY,
            healthbarWidth * (this.health / 100),
            healthbarHeight,
        );
        this.p5.noFill();
    }
}
