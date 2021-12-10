export type WeightFn = (x: number)=>number;

export interface RandomizableRange {
    minValIncl: number;
    maxValIncl: number;
    stepper: number;
    weightFnKey: string;
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