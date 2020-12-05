import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ActionButton from '../../components/ActionButton';

describe('ActionButton', () => {
  describe('render primary link button', () => {
    it('renders a primary button', () => {
      const { container } = render(<ActionButton href="test" type="primary">I am a button</ActionButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <a
          class="btn btn-primary"
          href="test"
        >
          I am a button
        </a>
      `);
    });
  });

  describe('render secondary link button', () => {
    it('renders a secondary button', () => {
      const { container } = render(<ActionButton href="test" type="secondary">I am a button</ActionButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <a
          class="btn btn-secondary"
          href="test"
        >
          I am a button
        </a>
      `);
    });
  });

  describe('render primary button', () => {
    it('renders a primary action button', () => {
      const { container } = render(<ActionButton onClick={jest.fn()} type="primary">I am a button</ActionButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="btn btn-primary"
          type="button"
        >
          I am a button
        </button>
      `);
    });
  });

  describe('render primary button with a given class', () => {
    it('renders a primary action button with a custom class', () => {
      const { container } = render(<ActionButton onClick={jest.fn()} className="custom" type="primary">I am a button</ActionButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="custom btn btn-primary"
          type="button"
        >
          I am a button
        </button>
      `);
    });
  });

  describe('render primary button with a given target', () => {
    it('renders a primary action button with a custom class', () => {
      const { container } = render(<ActionButton onClick={jest.fn()} target="_blank" type="primary">I am a button</ActionButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="btn btn-primary"
          target="_blank"
          type="button"
        >
          I am a button
        </button>
      `);
    });
  });

  describe('attributes', () => {
    it('Checks the href attribute value', () => {
      const { getByText } = render(<ActionButton href="test" type="primary">I am a button</ActionButton>);
      const anchorBtn = getByText('I am a button');

      expect(anchorBtn).toHaveAttribute('href', 'test');
    });
  });

  describe('actions', () => {
    it('Checks the onclick event', () => {
      const clickHandler = jest.fn();
      const { getByText } = render(<ActionButton onClick={clickHandler} target="_blank" type="primary">I am a button</ActionButton>);
      const actionBtn = getByText('I am a button');

      fireEvent.click(actionBtn);

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
