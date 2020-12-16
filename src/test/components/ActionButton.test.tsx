import React from 'react';
import { render, screen } from '@testing-library/react';

import ActionButton from '../../components/ActionButton';

describe('ActionButton', () => {
  it('renders a link with children', () => {
    render(<ActionButton href="test">Test Button</ActionButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders a link with the provided href and target', () => {
    render(<ActionButton href="test" target="_blank">Test Button</ActionButton>);
    const component = screen.getByText('Test Button');
    expect(component).toHaveAttribute('href', 'test');
    expect(component).toHaveAttribute('target', '_blank');
  });

  it('renders a link with a custom class name', () => {
    render(<ActionButton href="test" target="_blank" className="custom-class">Test Button</ActionButton>);
    const component = screen.getByText('Test Button');
    expect(component).toHaveClass('custom-class');
  });
});
