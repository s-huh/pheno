import { Traits } from '../types/interfaces';

export const MEAN_TRAITS: Traits = {
    healthCapacity: 8000,
    reproductiveAge: 1000,
    visualRadius: 40,
    turnSpanAngle: Math.PI * 0.05,
    travelSpeed: 1,
    toxicity: 20,
    toxicRadius: 40,
    immunity: 0.5, // Proportional reduction in toxicity
};

export const TRAITS_STDEV_POPULATION = 0.3;
export const TRAITS_STDEV_PROGENY = 0.05;
