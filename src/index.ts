import { RandomizableRange, StrictMappedSubType } from "./model";
import { chooseValue, isRandomizableRange } from "./weight_calc";

export {RandomizableRange, WeightFn } from "./model"

/*
 * Recurses through fields, and every time it finds a field that qualifies as a RandomizableRange,
 * replaces it with a a true value according to the randomized configuration.
 */
export const deRandomize = <SrcType> (inObj: SrcType): 
        StrictMappedSubType<SrcType,RandomizableRange, number> => {
    let out: Record<string|number,any> = {};
    Object.entries(inObj).forEach(([key,value], i) => {
        if (isRandomizableRange(value)) {
            out[key] = chooseValue(value);
        }
        else if (Array.isArray(value)) {
            out[key] = value.map(inner => deRandomize<typeof inner>(inner));
        }
        else if (typeof value === 'object') {
            out[key] = deRandomize<typeof value>(value);
        }
        else {
            out[key] = value;
        }
    })
    //This is a very unique circumstance. There is no way to make the TS compiler
    //Understand that we have populated every single field.
    return out as StrictMappedSubType<SrcType,RandomizableRange, number>;
}
