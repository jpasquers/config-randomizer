/*
 * Recurses through fields, and for each field if it qualifies as the custom type, runs the map function.
 */
export const recurse = <InType, OutType, TypeForCustomBehavior> (inObj: InType, 
        customBehaviorTypeChecker: (k: unknown)=>k is TypeForCustomBehavior,
        customMap: (k: TypeForCustomBehavior)=>any): 
        OutType => {
    let out: Record<string|number,any> = {};
    Object.entries(inObj).forEach(([key,value], i) => {
        if (customBehaviorTypeChecker(value)) {
            out[key] = customMap(value);
        }
        else if (Array.isArray(value)) {
            out[key] = value.map(inner => recurse<typeof inner,any, TypeForCustomBehavior>(inner,customBehaviorTypeChecker,customMap));
        }
        else if (typeof value === 'object') {
            out[key] = recurse<typeof value,any, TypeForCustomBehavior>(value,customBehaviorTypeChecker,customMap);
        }
        else {
            out[key] = value;
        }
    })
    //This is a very unique circumstance. There is no way to make the TS compiler
    //Understand that we have populated every single field.
    return out as OutType;
}