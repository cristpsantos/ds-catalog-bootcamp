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

describe('FormatPrice non-positive numbers' , () => {

    test('Should format number pt-BR when given 0.0', () => {
        const result = FormatPrice(0.0);
        expect(result).toEqual('0,00');
    });

    test('Should format number pt-BR when given -5.1', () => {
        const result = FormatPrice(-5.1);
        expect(result).toEqual('-5,10');
    });
});