import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Welcome from '../app/welcome';
//import { StatusBar } from 'expo-status-bar';

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => 'StatusBar'); // to Mock the StatusBar Component

jest.mock('../components/ScreenWrapper', () => ({ children }) => <>{children}</>); // To Mock the ScreenWarpper Component


test('should render Welcome screen and display the title "LinkUp!"', () => {
  render(<Welcome />);
  expect(screen.getByText("LinkUp!")).toBeTruthy();
});