import React from 'react';
import { render } from '@testing-library/react';

import ActionButton from 'elements/components/ActionButton';

describe('Button', () => {
  beforeEach(() => {
  });

  describe('render()', () => {
    it('renders a primary button', () => {
      const { container } = render(<ActionButton href="test" type="primary" onClick={jest.fn()}>I am a button</ActionButton>);
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
});
