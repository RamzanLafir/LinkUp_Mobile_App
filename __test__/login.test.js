import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Login from '../app/login';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component

jest.mock('../lib/superbase.js', () => ({
    supabase: {
        auth: {
            signInWithPassword: jest.fn(),
        },
    },
}));

// Mock the Alert component
jest.spyOn(Alert, 'alert');

// Mock useRouter from expo-router
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(), // Mock the push method to prevent actual routing
    }),
}));

// Mock Alert.alert
beforeAll(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {}); // Mock implementation to avoid actual alert popups
});

beforeEach(() => {
    Alert.alert.mockClear(); // Clear mock to avoid inter-test issues
});


test('Should render Login screen and display the title "Hey Welcome Back"', () => {
  render(<Login />);
  expect(screen.getByText("Hey,")).toBeTruthy();
  expect(screen.getByText("Welcome Back")).toBeTruthy();
});

test('Should render Login screen and display the sub-title "Please login to continue"', () => {
    render(<Login />);
    expect(screen.getByText("Please login to continue")).toBeTruthy();
});

test('Checkimg Email & Password inputs are empty ', () => {
    render(<Login />);
    expect(screen.queryByPlaceholderText("Enter your email")).toBeTruthy();
    expect(screen.queryByPlaceholderText("Enter your password")).toBeTruthy();
});

test('Should render Login screen and display the text "Forgot Password?"', () => {
    render(<Login />);
    expect(screen.getByText("Forgot Password?")).toBeTruthy();
});

test('Should render Login screen and display the text "Forgot Password?"', () => {
    render(<Login />);
    expect(screen.getByText("Forgot Password?")).toBeTruthy();
});

test('Should render Login screen and display the text "Dont have an account?"', () => {
    render(<Login />);
    expect(screen.getByText("Don't have an account?")).toBeTruthy();
});

test('Should render Login screen and display the text "Sign Up"', () => {
    render(<Login />);
    expect(screen.getByText("Sign Up")).toBeTruthy();
});
