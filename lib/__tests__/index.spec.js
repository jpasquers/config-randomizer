import { deRandomize } from "..";
describe("derandomizer", () => {
    it("produces correct output format in appropriate range", () => {
        let example = {
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
                },
                e: {
                    count: {
                        minValIncl: 1,
                        maxValIncl: 4,
                        stepper: 1,
                        weightFnKey: "EVEN"
                    },
                    itemDetails: {
                        e_1: "hello",
                        e_2: {
                            minValIncl: 0.6,
                            maxValIncl: 0.9,
                            stepper: 0.1,
                            weightFnKey: "EVEN"
                        }
                    }
                }
            }
        };
        let output = deRandomize(example);
        expect(output.a.b).toBeGreaterThanOrEqual(1);
        expect(output.a.b).toBeLessThanOrEqual(4);
        expect(output.a.c.d).toBeGreaterThanOrEqual(0.1);
        expect(output.a.c.d).toBeLessThanOrEqual(0.5);
        expect(output.a.e.length).toBeGreaterThanOrEqual(1);
        expect(output.a.e.length).toBeLessThanOrEqual(4);
        expect(output.a.e[0].e_1).toBe("hello");
        expect(output.a.e[0].e_2).toBeGreaterThanOrEqual(0.6);
        expect(output.a.e[0].e_2).toBeLessThanOrEqual(0.9);
    });
});
