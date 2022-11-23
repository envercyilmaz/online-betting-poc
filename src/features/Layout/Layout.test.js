import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from './Layout';
import { BultenProvider } from '../../context/BultenProvider';

test('renders the landing page', () => {
  render(<BultenProvider><Layout /></BultenProvider>);

  expect(screen.getByRole('heading')).toHaveTextContent(/Event Count/);
});
