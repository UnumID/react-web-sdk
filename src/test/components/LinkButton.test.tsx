import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import LinkButton from '../../components/LinkButton';

describe('LinkButton', () => {
  it('test', () => {
    expect(true).toBe(true);
  });

  it('renders a button with children', () => {
    render(<LinkButton onClick={jest.fn()}>Test Button</LinkButton>);
    const component = screen.getByText('Test Button');
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('type', 'button');
  });

  it('calls the onClick prop on click', () => {
    const onClick = jest.fn();
    render(<LinkButton onClick={onClick}>Test Button</LinkButton>);
    const component = screen.getByText('Test Button');
    fireEvent.click(component);
    expect(onClick).toBeCalled();
  });
});
