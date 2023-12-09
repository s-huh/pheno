import { P5CanvasInstance } from '@p5-wrapper/react';

const RADIAL_VELOCITY = 3;
const MOUSE_POS_STDEV = 80;
const RINGS_COUNT_MIN = 3;
const RINGS_COUNT_MAX = 6;
const FRAMES_TO_LIVE_MIN = 20;
const FRAMES_TO_LIVE_MAX = 50;

export interface IRaindrop {
    p5: P5CanvasInstance;
    spawnPos: { x: number; y: number };
    strokeValue: number;
    lineWeight: number;
    framesLived: number;
    framesToLive: number;
    ringsCount: number;
    ringSpawnFrames: number[];
    ringsRadii: number[];
    draw: () => void;
    seedSpawnPos: (limit: number, mousePos: number) => { x: number; y: number };
    seedRingSpawnFrames: () => number[];
    decay: () => void;
    getIsAlive: () => boolean;
}

export class Raindrop implements IRaindrop {
    p5: P5CanvasInstance;
    spawnPos: { x: number; y: number };
    strokeValue: number;
    lineWeight: number;
    framesLived: number;
    framesToLive: number;
    ringsCount: number;
    ringSpawnFrames: number[];
    ringsRadii: number[];

    constructor(p5: P5CanvasInstance) {
        this.p5 = p5;
        this.spawnPos = this.seedSpawnPos();
        this.strokeValue = 255;
        this.lineWeight = 1;
        this.framesLived = 0;
        this.framesToLive = Math.round(
            p5.random(FRAMES_TO_LIVE_MIN, FRAMES_TO_LIVE_MAX),
        );
        this.ringsCount = Math.round(
            p5.random(RINGS_COUNT_MIN, RINGS_COUNT_MAX),
        );
        this.ringSpawnFrames = this.seedRingSpawnFrames();
        this.ringsRadii = Array(this.ringsCount).fill(0);
    }

    draw() {
        this.ringsRadii = this.ringsRadii.map((radius, i) => {
            const { x, y } = this.spawnPos;

            if (this.p5.frameCount >= this.ringSpawnFrames[i]) {
                this.p5.noFill();
                this.p5.stroke(this.strokeValue);
                this.p5.ellipse(x, y, radius);
                this.p5.strokeWeight(this.lineWeight);
                return radius + RADIAL_VELOCITY;
            }
            return 0;
        });
    }

    seedSpawnPos(): { x: number; y: number } {
        const { mouseX, mouseY, width, height } = this.p5;

        const isXOutOfRange = mouseX < 0 || mouseX >= width;
        const isYOutOfRange = mouseY < 0 || mouseY >= height;

        return isXOutOfRange || isYOutOfRange
            ? {
                  x: this.p5.random(0, width),
                  y: this.p5.random(0, height),
              }
            : {
                  x: this.p5.randomGaussian(mouseX, MOUSE_POS_STDEV),
                  y: this.p5.randomGaussian(mouseY, MOUSE_POS_STDEV),
              };
    }

    seedRingSpawnFrames() {
        const spawnFrames = Array(this.ringsCount).fill(this.p5.frameCount);
        for (let i = 1; i < spawnFrames.length; i++) {
            spawnFrames[i] =
                spawnFrames[i - 1] + Math.round(this.p5.random(10, 40));
        }
        return spawnFrames;
    }

    decay() {
        this.framesLived++;
        this.strokeValue = Math.max(
            0,
            Math.round(this.strokeValue - 255 / this.framesToLive),
        );
        this.lineWeight -= this.lineWeight / this.framesToLive;
    }

    getIsAlive() {
        return this.framesLived <= this.framesToLive;
    }
}
