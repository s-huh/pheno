import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Engine } from '../../components/Darwin/Engine';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 500;

function darwinSketch(p5: P5CanvasInstance) {
    const engine = new Engine(p5, CANVAS_WIDTH, CANVAS_HEIGHT);

    engine.seedOrganisms(4);
    engine.seedResources(5);

    // p5.frameRate(3);
    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    p5.draw = () => {
        p5.fill(0);
        p5.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        engine.organisms.forEach((organism) => {
            organism.explore();
        });

        engine.runLifecycle();

        engine.resources.forEach((resource) => {
            p5.ellipse(resource.pos.x, resource.pos.y, resource.radius);
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
