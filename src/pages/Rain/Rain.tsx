import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Raindrop, IRaindrop } from '../../components/Raindrop';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

function rainSketch(p5: P5CanvasInstance) {
    let dropsArray: Array<{ raindrop: IRaindrop; isAlive: boolean }>;

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        dropsArray = [];
    };

    p5.draw = () => {
        p5.background(0);

        p5.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const newDropsCount = p5.int(p5.random(0, 2));

        for (let i = 0; i <= newDropsCount; i++) {
            const raindrop = new Raindrop(p5);
            dropsArray.push({
                raindrop,
                isAlive: true,
            });
        }

        dropsArray = dropsArray
            .map(({ raindrop, isAlive }) => {
                if (isAlive) {
                    raindrop.draw();
                }

                raindrop.decay();

                return {
                    raindrop,
                    isAlive: raindrop.getIsAlive(),
                };
            })
            .filter(({ isAlive }) => isAlive === true);
    };
}

export default function Rain() {
    return (
        <>
            <p>Hover mouse over canvas or tap around for mobile</p>
            <ReactP5Wrapper sketch={rainSketch} />
        </>
    );
}
