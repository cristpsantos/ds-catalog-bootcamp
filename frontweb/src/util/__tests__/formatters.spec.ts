import { FormatPrice } from "util/formatters"

test('formatPrice should format number pt-BR when given 10.1', () => {
    const value = 10.1;
    
    const result = FormatPrice(value);

    expect(result).toEqual("10,10");
})