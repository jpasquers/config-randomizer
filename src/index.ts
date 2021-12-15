import { RandomizableRange, RandomizableCount, CountDeRandomized, RangeDeRandomized, FullDeRandomized } from "./model";
import { recurse } from "./recurse";
import { chooseValue, isRandomizableCount, isRandomizableRange } from "./weight_calc";

export {RandomizableRange, WeightFn, FullDeRandomized, RandomizableCount } from "./model"
/**
 * 
 * Only removes the randomizedCounts. The assumption is that further derandomizers will handle any
 * Randomization within the itemDetails.
 */
const deRandomizeCount = <SrcType> (inObj: SrcType): 
        CountDeRandomized<SrcType> => {
    return recurse<SrcType,CountDeRandomized<SrcType>, RandomizableCount<unknown>>(
        inObj,
        isRandomizableCount,
        (randomizedCount: RandomizableCount<unknown>):any => {
            let decidedCount = chooseValue(randomizedCount.count);
            let out: (typeof randomizedCount["itemDetails"])[] = [];
            for(let i=0; i<decidedCount; i++) {
                out.push(randomizedCount.itemDetails);
            }
            return out;
        }
    )
}

const deRandomizeRange = <SrcType> (inObj: SrcType): 
        RangeDeRandomized<SrcType> => {
    return recurse<SrcType,RangeDeRandomized<SrcType>, RandomizableRange>(
        inObj,
        isRandomizableRange,
        (range: RandomizableRange):any => {
            return chooseValue(range);
        }
    )
}

export const deRandomize = <SrcType> (inObj: SrcType):
        FullDeRandomized<SrcType> => {
    return deRandomizeRange(deRandomizeCount(inObj));
}
