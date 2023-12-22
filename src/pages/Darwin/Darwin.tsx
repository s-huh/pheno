import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Organism } from '../../components/Darwin/Organism';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

function darwinSketch(p5: P5CanvasInstance) {
    const pos = p5.createVector(600, 350);
    const vel = p5.createVector(0, 2);
    const organism = new Organism(p5, pos, vel);

    const resources = [
        { x: 300, y: 300, value: 10 },
        { x: 500, y: 500, value: 15 },
    ];

    // p5.frameRate(3);
    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    p5.draw = () => {
        p5.fill(255);
        p5.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        organism.explore();
        organism.forage(resources);

        resources.forEach(({ x, y, value }) => {
            p5.ellipse(x, y, value);
        });
    };
}

export default function Darwin() {
    return (
        <>
            <ReactP5Wrapper sketch={darwinSketch} />
        </>
    );
}
