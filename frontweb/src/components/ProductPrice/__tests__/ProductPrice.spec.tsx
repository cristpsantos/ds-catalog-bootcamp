import { render, screen } from "@testing-library/react";
import ProductPrice from "..";

test('ProductPrice should render show when given R$', () => {
    const price = 100.99;

    render(
        <ProductPrice price={price} />
    );

    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('100,99')).toBeInTheDocument();
});