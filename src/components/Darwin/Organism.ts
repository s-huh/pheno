import { P5CanvasInstance } from '@p5-wrapper/react';
import { Color, Vector } from 'p5';
import { IOrganism, Traits } from './types/interfaces';

const healthbarWidth = 40;
const healthbarHeight = 5;
const healthbarOffset = 20;

export class Organism implements IOrganism {
    p5: P5CanvasInstance;
    canvasW: number;
    canvasH: number;
    geneticId: string;
    id: string;
    pos: Vector;
    vel: Vector;
    health: number;
    age: number;
    traits: Traits;
    colour: Color;

    constructor(
        p5: P5CanvasInstance,
        canvasW: number,
        canvasH: number,
        pos: Vector,
        vel: Vector,
        traits: Traits,
        geneticId: string,
        colour: Color,
    ) {
        this.p5 = p5;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.geneticId = geneticId;
        this.id = self.crypto.randomUUID();
        this.pos = pos;
        this.vel = vel;
        this.health = traits.healthCapacity;
        this.age = 0;
        this.traits = traits;
        this.colour = colour;
    }

    explore() {
        const xAxis = this.p5.createVector(1, 0);
        const yAxis = this.p5.createVector(0, 1);

        if (
            this.pos.x + this.traits.visualRadius > this.canvasW ||
            this.pos.x - this.traits.visualRadius < 0
        ) {
            this.vel.reflect(xAxis);
        } else if (
            this.pos.y + this.traits.visualRadius > this.canvasH ||
            this.pos.y - this.traits.visualRadius < 0
        ) {
            this.vel.reflect(yAxis);
        } else {
            const turnAngle = this.p5.randomGaussian(
                0,
                this.traits.turnSpanAngle,
            );
            this.vel.rotate(turnAngle);
        }

        this.pos.add(this.vel.setMag(this.traits.travelSpeed));

        this.decay();
        this.drawVisualField();
        this.drawHealthbar();

        this.p5.stroke(this.colour);
        this.p5.ellipse(this.pos.x, this.pos.y, 5);
        this.p5.stroke(255);
    }

    feed(value: number) {
        this.health = Math.min(this.health + value, this.traits.healthCapacity);
    }

    private decay() {
        this.age += 1;
        this.health = Math.max(this.health - 1, 0);
    }

    private drawVisualField() {
        this.p5.stroke(this.colour);
        this.p5.ellipse(this.pos.x, this.pos.y, this.traits.toxicRadius * 2);

        this.p5.strokeWeight(2);
        this.p5.ellipse(this.pos.x, this.pos.y, this.traits.visualRadius * 2);
        this.p5.strokeWeight(1);

        const posCopy = this.pos.copy();
        const velCopy = this.vel.copy();
        const endpoint = posCopy.add(velCopy.setMag(this.traits.visualRadius));
        this.p5.line(this.pos.x, this.pos.y, endpoint.x, endpoint.y);

        this.p5.stroke(225);
    }

    private drawHealthbar() {
        const rectX = this.pos.x - healthbarWidth / 2;
        const rectY = this.pos.y - healthbarOffset;
        this.p5.stroke(this.colour);
        this.p5.rect(rectX, rectY, healthbarWidth, healthbarHeight);

        this.p5.fill(this.colour);
        this.p5.rect(
            rectX,
            rectY,
            healthbarWidth * (this.health / this.traits.healthCapacity),
            healthbarHeight,
        );

        this.p5.stroke(255);
        this.p5.noFill();
    }
}
