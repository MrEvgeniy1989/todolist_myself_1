import { fireEvent, render } from '@testing-library/react';
import { AddItemForm } from './AddItemForm';

describe('AddItemForm', () => {
    test('renders AddItemForm component without crashing', () => {
        render(<AddItemForm addItem={() => {}} />);
    });

    test('calls addItem function when add button is clicked', () => {
        const addItemMock = jest.fn();
        const { getByRole } = render(<AddItemForm addItem={addItemMock} />);

        fireEvent.change(getByRole('textbox'), { target: { value: 'New item' } });
        fireEvent.click(getByRole('button'));

        expect(addItemMock).toHaveBeenCalledTimes(1);
        expect(addItemMock).toHaveBeenCalledWith('New item');
    });

    test('does not call addItem function when title is empty', () => {
        const addItemMock = jest.fn();
        const { getByRole } = render(<AddItemForm addItem={addItemMock} />);

        fireEvent.click(getByRole('button'));

        expect(addItemMock).not.toHaveBeenCalled();
    });

    test('sets error state when title is empty', () => {
        const { getByRole, getByText } = render(<AddItemForm addItem={() => {}} />);

        fireEvent.click(getByRole('button'));

        expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
        expect(getByText('Title is required')).toBeInTheDocument();
    });
});
