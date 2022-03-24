import { FormatPrice } from "util/formatters"


describe('FormatPrice positive numbers', () => {

    test('Should format number pt-BR when given 10.1', () => {
        const result = FormatPrice(10.1);
        expect(result).toEqual("10,10");
    });

    test('Should format number pt-BR when given 0.1', () => {
        const result = FormatPrice(0.1);
        expect(result).toEqual("0,10");
    });
});