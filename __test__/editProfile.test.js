import React from 'react';
import { render, screen } from '@testing-library/react-native';
import EditProfile from '../app/(main)/editProfile';
import { useAuth } from '../constants/AuthContext';

// Mock the useAuth hook
jest.mock('../constants/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component

describe('EditProfile', () => {
    beforeEach(() => {
        // Set the return value of the mocked useAuth
        useAuth.mockReturnValue({
            user: {
                id: '123',
                name: 'John Doe',
                phoneNumber: '1234567890',
                image: 'http://example.com/image.jpg',
                address: '123 Main St',
                bio: 'This is a bio',
            },
            setUserData: jest.fn(),
        });
    });

    test('Should render Edit Profile screen and display the title "Edit Profile"', () => {
        render(<EditProfile />);
        expect(screen.getByText("Edit Profile")).toBeTruthy();
    });

    test('Should render Edit Profile screen and display the title "Please fill the profile details"', () => {
        render(<EditProfile />);
        expect(screen.getByText("Please fill your profile details")).toBeTruthy();
    });

    test('Checkimg Name, phone numbr,address and bio inputs are empty ', () => {
        render(<EditProfile />);
        expect(screen.queryByPlaceholderText("Enter your name")).toBeTruthy();
        expect(screen.queryByPlaceholderText("Enter your phone number")).toBeTruthy();
        expect(screen.queryByPlaceholderText("Enter your address")).toBeTruthy();
        expect(screen.queryByPlaceholderText("Enter your bio")).toBeTruthy();
    });

    test('Should render Edit Profile screen and display the footer "Update"', () => {
        render(<EditProfile />);
        expect(screen.getByText("Update")).toBeTruthy();
    });

    test('Should render Edit Profile screen and display the icons', () => {
        render(<EditProfile />);
        expect(screen.getByTestId('nameIcon')).toBeTruthy();
        expect(screen.getByTestId('phoneIcon')).toBeTruthy();
        expect(screen.getByTestId('addressIcon')).toBeTruthy();
    });


});
