import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Search from '../Search';

describe('Search component', () => {
    it('renders the Search component with an input and button', () => {
        const onSearch = jest.fn();

        render(<Search onSearch={onSearch} />);

        expect(screen.getByPlaceholderText('Search articles')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('calls the onSearch function with the correct search term', () => {
        const onSearch = jest.fn();

        render(<Search onSearch={onSearch} />);

        fireEvent.change(screen.getByPlaceholderText('Search articles'), {
            target: { value: 'Test search' },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Search' }));

        expect(onSearch).toHaveBeenCalledWith('Test search');
    });
});
