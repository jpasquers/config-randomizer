import { RandomizableRange, CountDeRandomized, FullDeRandomized } from "./model";
export { RandomizableRange, WeightFn } from "./model";
export declare const deRandomize: <SrcType>(inObj: SrcType) => import("./model").StrictMappedSubType<CountDeRandomized<SrcType>, RandomizableRange, number>;
