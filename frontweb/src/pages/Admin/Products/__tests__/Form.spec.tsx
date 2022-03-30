import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router, useParams } from "react-router-dom";
import selectEvent from "react-select-event";
import history from "util/history";
import Form from "../Form";
import { server } from "./fixtures";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Tests Form', () => {
    
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });
    
    test('test should show toast and redirect when submit form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );
        
        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");
        
        const submitButton = screen.getByRole("button", { name: /salvar/i });

        await selectEvent.select(categoriesInput,['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'http://www.google.com.br/test.jpg');
        userEvent.type(descriptionInput, 'Computador da hora');

        userEvent.click(submitButton);

        waitFor(() => {
            const toastElement = screen.getByText('Produto cadastrado com sucesso!');
            expect(toastElement).toBeInTheDocument();
        });
        
        expect(history.location.pathname).toEqual('/');
    });

    test('should show 5 validation messages when just clicking submit', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );
        
        const submitButton = screen.getByRole("button", { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const message = screen.getAllByText("Campo obrigatório");
            expect(message).toHaveLength(5);
        });
    });

    test('test should clear validation messages when filling out the form correctly', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        );
        
        const submitButton = screen.getByRole("button", { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const message = screen.getAllByText("Campo obrigatório");
            expect(message).toHaveLength(5);
        });

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const imgUrlInput = screen.getByTestId("imgUrl");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        selectEvent.select(categoriesInput,['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'http://www.google.com.br/test.jpg');
        userEvent.type(descriptionInput, 'Computador da hora');

        await waitFor(() => {
            const message = screen.queryAllByText("Campo obrigatório");
            expect(message).toHaveLength(0);
        });


    });
});

