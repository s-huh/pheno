import { P5CanvasInstance } from '@p5-wrapper/react';
import { Organism } from './Organism';
import { IOrganism, Traits } from './types/interfaces';
import { Resource } from './Resource';
import { IResource } from './types/interfaces';
import { MEAN_TRAITS, TRAITS_STDEV_POPULATION } from './constants.ts/traits';

export class Engine {
    p5: P5CanvasInstance;
    canvasW: number;
    canvasH: number;
    organisms: Array<IOrganism>;
    resources: Array<IResource>;

    constructor(p5: P5CanvasInstance, canvasW: number, canvasH: number) {
        this.p5 = p5;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.organisms = [];
        this.resources = [];
    }

    runLifecycle() {
        this.consume();
        this.cleanUpDeadOrganisms();
        this.regenResources(0.005, 8);
    }

    seedOrganisms(seedCount: number) {
        for (let i = 0; i < seedCount; i++) {
            const pos = this.generatePosWithMargin(100);
            const vel = this.p5.createVector(0, 2);

            const organism = new Organism(
                this.p5,
                this.canvasW,
                this.canvasH,
                pos,
                vel,
                this.mutateTraits(MEAN_TRAITS, TRAITS_STDEV_POPULATION),
            );
            this.organisms.push(organism);
        }
    }

    seedResources(seedCount: number) {
        for (let i = 0; i < seedCount; i++) {
            this.addResource();
        }
    }

    private addResource() {
        const pos = this.generatePosWithMargin(100);
        const resource = new Resource(this.p5, pos, 300);
        this.resources.push(resource);
    }

    private regenResources(pRegen: number, resourceCap: number) {
        const p = this.p5.random();
        if (p < pRegen && this.resources.length < resourceCap) {
            this.addResource();
        }
    }

    private generatePosWithMargin(margin: number) {
        return this.p5.createVector(
            this.p5.random(0 + margin, this.canvasW - margin),
            this.p5.random(0 + margin, this.canvasH - margin),
        );
    }

    private consume() {
        for (const resource of this.resources) {
            const distances = this.organisms.map((organism) => {
                const distance = this.p5.dist(
                    resource.pos.x,
                    resource.pos.y,
                    organism.pos.x,
                    organism.pos.y,
                );

                const isFeeder =
                    distance <= organism.traits.feedingRadius + resource.radius;

                return {
                    organism,
                    distance,
                    isFeeder,
                };
            });

            const feeders = distances
                .filter(({ isFeeder }) => isFeeder === true)
                .sort((a, b) => a.distance - b.distance);

            if (feeders.length > 0) {
                feeders[0].organism.feed(resource.value);
                this.resources = this.resources.filter(
                    ({ id }) => id !== resource.id,
                );
            }
        }
    }

    private cleanUpDeadOrganisms() {
        this.organisms = this.organisms.filter((organism) => {
            return organism.health > 0;
        });
    }

    private mutateTraits(traits: Traits, stdev: number): Traits {
        const mutation = {} as Traits;

        for (const [key, value] of Object.entries(traits)) {
            mutation[key as keyof Traits] = Math.max(
                this.p5.randomGaussian(value, value * stdev),
                0,
            );
        }

        return mutation;
    }
}
