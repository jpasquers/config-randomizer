/*
 * Recurses through fields, and for each field if it qualifies as the custom type, runs the map function.
 */
export const recurse = (inObj, customBehaviorTypeChecker, customMap) => {
    let out = {};
    Object.entries(inObj).forEach(([key, value], i) => {
        if (customBehaviorTypeChecker(value)) {
            out[key] = customMap(value);
        }
        else if (Array.isArray(value)) {
            out[key] = value.map(inner => recurse(inner, customBehaviorTypeChecker, customMap));
        }
        else if (typeof value === 'object') {
            out[key] = recurse(value, customBehaviorTypeChecker, customMap);
        }
        else {
            out[key] = value;
        }
    });
    //This is a very unique circumstance. There is no way to make the TS compiler
    //Understand that we have populated every single field.
    return out;
};
