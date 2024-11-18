import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Home from '../app/(main)/home';
import { useAuth } from '../constants/AuthContext';

// Mock useAuth to return predefined values
jest.mock('../constants/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component


describe('Home Component Tests', () => {
    beforeEach(() => {
        // Set the mocked return value for useAuth
        useAuth.mockReturnValue({
            user: { id: '1', name: 'Test User' },
            setAuth: jest.fn(),
        });
    });

    test('Should render Home screen and display the title "LinkUp"', () => {
        render(<Home />);
        expect(screen.getByText("LinkUp")).toBeTruthy();
    });

});
