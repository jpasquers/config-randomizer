import { recurse } from "./recurse";
import { chooseValue, isRandomizableCount, isRandomizableRange } from "./weight_calc";
/**
 *
 * Only removes the randomizedCounts. The assumption is that further derandomizers will handle any
 * Randomization within the itemDetails.
 */
const deRandomizeCount = (inObj) => {
    return recurse(inObj, isRandomizableCount, (randomizedCount) => {
        let decidedCount = chooseValue(randomizedCount.count);
        let out = [];
        for (let i = 0; i < decidedCount; i++) {
            out.push(randomizedCount.itemDetails);
        }
        return out;
    });
};
const deRandomizeRange = (inObj) => {
    return recurse(inObj, isRandomizableRange, (range) => {
        return chooseValue(range);
    });
};
export const deRandomize = (inObj) => {
    return deRandomizeRange(deRandomizeCount(inObj));
};
