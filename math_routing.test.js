const { meanCalc, medianCalc, modeCalc } = require('./math_routing')
let numArr1;
let numArr2;
let numArr3;
let numStrArr1;
let numStrArr2;

describe("Testing the mode calculator", () => {
    beforeAll(() => {
        numArr1 = [1, 2, 3, 4, 5];
        numArr2 = [3, 2, 1, NaN];
    });

    test("Should be 3", () => {
        expect(meanCalc(numArr1)).toBe(3);
    });

    test("Should be NaN", () => {
        expect(meanCalc(numArr2)).toBeNaN();
    })
});

describe("Testing the median calculator", () => {
    beforeAll(() => {
        numArr1 = [1, 2, 4, 6, 7, 9, 34, 43, 123];
        numArr2 = [1, 2, 3, 4, 5, 6];
        numArr3 = [1, 4, 5, 'foo', 3, 51];
    });

    test("Should be 7", () => {
        expect(medianCalc(numArr1)).toBe(7);
    });

    test("Should be 3.5", () => {
        expect(medianCalc(numArr2)).toBe(3.5);
    })

    test("Should be NaN", () => {
        expect(medianCalc(numArr3)).toBeNaN();
    });
});


describe("Testing the mode calulator", () => {
    beforeAll(() => {
        numStrArr1 = ['1', '4', '2', '5', '2', '1', '2'];
        numStrArr2 = ['1', '4', '2', '5', '2', '1'];
    });

    test("Should be 2", () => {
        expect(modeCalc(numStrArr1)).toBe(2);
    });

    test("Should be multimodal", () => {
        expect(modeCalc(numStrArr2)).toBe('This group is multimodal')
    });
});
