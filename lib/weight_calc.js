export const isRandomizableRange = (val) => {
    return typeof val === "object" && !(!val) &&
        "maxValIncl" in val &&
        "minValIncl" in val &&
        "stepper" in val &&
        "weightFnKey" in val;
};
export const isRandomizableCount = (val) => {
    return typeof val === "object" && !(!val) &&
        "count" in val &&
        "itemDetails" in val;
};
export const Even = (x) => 10;
export const weightFns = {
    EVEN: Even
};
const getWeightFn = (weightFnKey) => {
    return weightFns[weightFnKey];
};
/**
 * If the maxValue is not an even amount of steps from the minValue, the max value will still be added in addition
 * to the closest piece before that. E.x.
 *
 * 1->5 by 1.5 = 1, 2.5, 4, 5
 */
const getValueSet = ({ maxValIncl, minValIncl, stepper }) => {
    //Simple for loop really is easier and more clear here.
    let values = [];
    for (let i = minValIncl; i < maxValIncl; i += stepper) {
        values.push(i);
    }
    values.push(maxValIncl);
    return values;
};
const getWeightSum = (valueSet, weightFn) => {
    return valueSet.map(x => weightFn(x))
        .reduce((prev, curr) => prev + curr, 0);
};
export const chooseValue = (randomizableRange) => {
    let weightFn = weightFns[randomizableRange.weightFnKey];
    let valueSet = getValueSet(randomizableRange);
    let weightSum = getWeightSum(valueSet, weightFn);
    let randomWeight = Math.floor(Math.random() * weightSum);
    let decision = -1;
    let found = false;
    valueSet.forEach((value) => {
        if (found)
            return;
        randomWeight = randomWeight - weightFn(value);
        if (randomWeight <= 0) {
            decision = value;
            found = true;
        }
    });
    return decision;
};
