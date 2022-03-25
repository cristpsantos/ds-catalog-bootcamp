import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";

test('ProductCard render', () => {

    const product = {
        name: 'Monitor Led',
        price: 2367.99,
        imgUrl: 'http://www.google.com.',
    } as Product;

    render(
        <ProductCard product={product} />
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('2.367,99')).toBeInTheDocument();

});