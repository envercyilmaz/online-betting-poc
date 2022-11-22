import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';
import { BultenProvider } from '../../context/BultenProvider';

test('renders the landing page', () => {
  render(<BultenProvider><Layout /></BultenProvider>);
});
