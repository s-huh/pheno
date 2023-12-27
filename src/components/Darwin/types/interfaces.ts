import { P5CanvasInstance } from '@p5-wrapper/react';
import { Vector } from 'p5';

export interface IOrganism {
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
    explore: () => void;
    feed: (value: number) => void;
}

export interface IResource {
    p5: P5CanvasInstance;
    id: string;
    pos: Vector;
    value: number;
}
