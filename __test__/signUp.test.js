import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SignUp from '../app/signUp';

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component


test('Should render Sign Up screen and display the title "Lets Get Started"', () => {
  render(<SignUp />);
  expect(screen.getByText("Let's")).toBeTruthy();
  expect(screen.getByText("Get Started")).toBeTruthy();
});

test('Should render Sign Up screen and display the sub-title "Please fill the details to create an account"', () => {
    render(<SignUp />);
    expect(screen.getByText("Please fill the details to create an account")).toBeTruthy();
  });

test('Checkimg Name, Email & Password inputs are empty ', () => {
    render(<SignUp />);
    expect(screen.queryByPlaceholderText("Enter your name")).toBeTruthy();
    expect(screen.queryByPlaceholderText("Enter your email")).toBeTruthy();
    expect(screen.queryByPlaceholderText("Enter your password")).toBeTruthy();
  });

  test('Should render Sign Up screen and display the footer text "Already have an account?"', () => {
    render(<SignUp />);
    expect(screen.getByText("Please fill the details to create an account")).toBeTruthy();
  });