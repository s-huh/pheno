import { P5CanvasInstance } from '@p5-wrapper/react';
import { Vector } from 'p5';

export type Traits = {
    healthCapacity: number;
    reproductiveAge: number;
    visualRadius: number;
    feedingRadius: number;
    turnSpanAngle: number;
    travelSpeed: number;
};

export interface IOrganism {
    p5: P5CanvasInstance;
    canvasW: number;
    canvasH: number;
    id: string;
    pos: Vector;
    vel: Vector;
    health: number;
    age: number;
    traits: Traits;
    explore: () => void;
    feed: (value: number) => void;
}

export interface IResource {
    p5: P5CanvasInstance;
    id: string;
    pos: Vector;
    value: number;
    radius: number;
}
