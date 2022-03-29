import { render, screen } from "@testing-library/react";
import { Router, useParams } from "react-router-dom";
import history from "util/history";
import Form from "../Form";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product form create tests', () => {
    
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });
    
    test('Should render Form', () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );
        
        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");

    });
})

