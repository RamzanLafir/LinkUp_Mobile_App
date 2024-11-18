import React from 'react';
import { render, screen } from '@testing-library/react-native';
import NewPost from '../app/(main)/newPost';
import { useAuth } from '../constants/AuthContext';

// Mock useAuth to return predefined values
jest.mock('../constants/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Home Component Tests', () => {
    beforeEach(() => {
        // Set the mocked return value for useAuth
        useAuth.mockReturnValue({
            user: { id: '1', name: 'Test User' },
            setAuth: jest.fn(),
        });
    });

    test('Should render New Post screen and display the title "Create Post"', () => {
        render(<NewPost />);
        expect(screen.getByText("Create Post")).toBeTruthy();
    });

    test('Checking footer ', () => {
        render(<NewPost />);
        expect(screen.getByText("Post")).toBeTruthy();
    });

    test('Should render New Post screen and display the title "Add to your post"', () => {
        render(<NewPost />);
        expect(screen.getByText("Add to your post")).toBeTruthy();
    });
});
