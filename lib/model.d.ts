export declare type WeightFn = (x: number) => number;
export interface RandomizableRange {
    minValIncl: number;
    maxValIncl: number;
    stepper: number;
    weightFnKey: string;
}
export interface RandomizableCount<T> {
    count: RandomizableRange;
    itemDetails: T;
}
export declare type StrictMappedSubType<SrcType, ReplaceFrom, ReplaceTo> = {
    [K in keyof SrcType]: SrcType[K] extends ReplaceFrom ? ReplaceTo : SrcType[K] extends (ReplaceFrom | ReplaceTo) ? ReplaceTo : SrcType[K] extends {} ? StrictMappedSubType<SrcType[K], ReplaceFrom, ReplaceTo> : K;
};
export declare type RangeDeRandomized<T> = StrictMappedSubType<T, RandomizableRange, number>;
export declare type CountDeRandomized<SrcType> = {
    [K in keyof SrcType]: SrcType[K] extends RandomizableCount<unknown> ? SrcType[K]["itemDetails"][] : CountDeRandomized<SrcType[K]>;
};
interface ExampleSrc {
    a: RandomizableCount<RandomizableRange>;
}
export declare type ExampleDeRandomized = RangeDeRandomized<CountDeRandomized<ExampleSrc>>;
export declare type FullDeRandomized<SrcType> = RangeDeRandomized<CountDeRandomized<SrcType>>;
export {};
