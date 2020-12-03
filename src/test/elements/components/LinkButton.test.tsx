import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LinkButton from '../../../elements/components/LinkButton';

describe('LinkButton', () => {
  describe('render()', () => {
    it('renders a Link button', () => {
      const { container } = render(<LinkButton href="test">I am a link</LinkButton>);
      expect(container.firstChild).toMatchInlineSnapshot(`
        <a
          class="btn btn-link"
          href="test"
        >
          I am a link
        </a>
      `);
    });
  });

  describe('attributes', () => {
    it('Checks the href attribute value', () => {
      const { getByText } = render(<LinkButton href="test">I am a link</LinkButton>);
      const linkBtn = getByText('I am a link');

      expect(linkBtn).toHaveAttribute('href', 'test');
    });
  });

  describe('actions', () => {
    it('Checks the onclick event', () => {
      const clickHandler = jest.fn();
      const { getByText } = render(<LinkButton onClick={clickHandler}>I am a link</LinkButton>);
      const linkBtn = getByText('I am a link');

      fireEvent.click(linkBtn);

      expect(clickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
