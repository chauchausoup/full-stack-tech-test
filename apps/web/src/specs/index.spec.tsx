import React from 'react';
import { render } from '@testing-library/react';

import Homepage from '../pages/index';

describe('Homepage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Homepage />);
    expect(baseElement).toBeTruthy();
  });
});
