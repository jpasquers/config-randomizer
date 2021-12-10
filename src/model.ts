export type WeightFn = (x: number)=>number;

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

export type StrictMappedSubType<SrcType, ReplaceFrom,ReplaceTo> = {
    [K in keyof SrcType]: SrcType[K] extends ReplaceFrom 
        ? ReplaceTo 
        : SrcType[K] extends (ReplaceFrom | ReplaceTo) 
            ? ReplaceTo
            : SrcType[K] extends {}
                ? StrictMappedSubType<SrcType[K],ReplaceFrom,ReplaceTo> 
                : K;
}

export type RangeDeRandomized<T> = StrictMappedSubType<T, RandomizableRange, number>;

export type CountDeRandomized<SrcType> = {
    [K in keyof SrcType]: SrcType[K] extends RandomizableCount<unknown>
        ? SrcType[K]["itemDetails"][]
        : CountDeRandomized<SrcType[K]>;
}

interface ExampleSrc {
    a: RandomizableCount<RandomizableRange>;
}

export type ExampleDeRandomized = RangeDeRandomized<CountDeRandomized<ExampleSrc>>;

export type FullDeRandomized<SrcType> = RangeDeRandomized<CountDeRandomized<SrcType>>;