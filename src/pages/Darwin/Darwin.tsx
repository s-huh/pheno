import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Organism } from '../../components/Darwin/Organism';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

function darwinSketch(p5: P5CanvasInstance) {
    const organism = new Organism(p5, 350, 350);

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    p5.draw = () => {
        p5.background(0);
        p5.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        organism.explore();
    };
}

export default function Darwin() {
    return (
        <>
            <ReactP5Wrapper sketch={darwinSketch} />
        </>
    );
}
