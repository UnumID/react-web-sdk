import React from 'react';
import { render } from '@testing-library/react';

import ActionButton from 'elements/components/ActionButton';

describe('Button', () => {
  describe('render()', () => {
    it('renders a primary action button', () => {
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

  describe('actions', () => {
    it('Checks the href attribute value', () => {
      const { getByText } = render(<ActionButton href="test" type="primary">I am a button</ActionButton>);
      const anchorBtn = getByText('I am a button');

      expect(anchorBtn.href).toBe('http://localhost/test');
    });
  });
});
