import { deRandomize, RandomizableRange } from ".."

interface ExampleType {
    a: {
        b: RandomizableRange,
        c: {
            d: RandomizableRange
        }
    }
}

describe("derandomizer", () => {
    it("produces correct output format in appropriate range", () => {
        let example: ExampleType = {
            a: {
                b: {
                    minValIncl: 1,
                    maxValIncl: 4,
                    weightFnKey: "EVEN",
                    stepper: 1
                },
                c: {
                    d: {
                        minValIncl: 0.1,
                        maxValIncl: 0.5,
                        stepper: 0.1,
                        weightFnKey: "EVEN"
                    }
                }
            }
        }
        let output = deRandomize(example);
        expect(output.a.b).toBeGreaterThanOrEqual(1);
        expect(output.a.b).toBeLessThanOrEqual(4);
        expect(output.a.c.d).toBeGreaterThanOrEqual(0.1);
        expect(output.a.c.d).toBeLessThanOrEqual(0.5);
    })
})