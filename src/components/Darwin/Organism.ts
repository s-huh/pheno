import { P5CanvasInstance } from '@p5-wrapper/react';

const healthbarWidth = 40;
const healthbarHeight = 5;
const healthbarOffset = 20;

export class Organism {
    p5: P5CanvasInstance;
    health: number;
    rateOfDecay: number;
    posX: number;
    posY: number;
    visualRadius: number;
    visualSpanAngle: number;
    orientationAngle: number;
    travelSpeed: number;

    constructor(p5: P5CanvasInstance, posX: number, posY: number) {
        this.p5 = p5;
        this.health = 100;
        this.rateOfDecay = 0.05;
        this.posX = posX;
        this.posY = posY;
        this.visualRadius = 30;
        this.visualSpanAngle = Math.PI * 0.05;
        this.orientationAngle = Math.PI * 0.25;
        this.travelSpeed = 1;
    }

    explore() {
        this.orientationAngle = this.p5.randomGaussian(
            this.orientationAngle,
            this.visualSpanAngle,
        );
        this.posX += this.travelSpeed * Math.sin(this.orientationAngle);
        this.posY += this.travelSpeed * Math.cos(this.orientationAngle);
        this.p5.ellipse(this.posX, this.posY, 5);

        this.loseHealth();
        this.drawVisualField();
        this.drawHealthbar();
    }

    loseHealth() {
        this.health = Math.max(this.health - this.rateOfDecay, 0);
    }

    drawVisualField() {
        const resolvedOffsetX =
            this.visualRadius * Math.sin(this.orientationAngle);
        const resolvedOffsetY =
            this.visualRadius * Math.cos(this.orientationAngle);

        const x2 = this.posX + resolvedOffsetX;
        const y2 = this.posY + resolvedOffsetY;

        this.p5.line(this.posX, this.posY, x2, y2);
    }

    drawHealthbar() {
        const rectX = this.posX - healthbarWidth / 2;
        const rectY = this.posY - healthbarOffset;
        this.p5.rect(rectX, rectY, healthbarWidth, healthbarHeight);

        this.p5.fill(51);
        this.p5.rect(
            rectX,
            rectY,
            healthbarWidth * (this.health / 100),
            healthbarHeight,
        );
    }
}
