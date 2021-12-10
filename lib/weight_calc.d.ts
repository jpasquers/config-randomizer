import { RandomizableCount, RandomizableRange, WeightFn } from "./model";
export declare const isRandomizableRange: (val: unknown) => val is RandomizableRange;
export declare const isRandomizableCount: (val: unknown) => val is RandomizableCount<unknown>;
export declare const Even: WeightFn;
export declare const weightFns: Record<string, WeightFn>;
export declare const chooseValue: (randomizableRange: RandomizableRange) => number;
