import { P5CanvasInstance } from '@p5-wrapper/react';
import { Vector } from 'p5';
import { IResource } from './types/interfaces';

export class Resource implements IResource {
    p5: P5CanvasInstance;
    id: string;
    pos: Vector;
    value: number;
    radius: number;

    constructor(p5: P5CanvasInstance, pos: Vector, maxValue: number) {
        this.p5 = p5;
        this.id = self.crypto.randomUUID();
        this.pos = pos;
        this.value = p5.random(maxValue);
        this.radius = this.value * 0.01;
    }
}
