import React from 'react';
import { render } from '@testing-library/react';

import WidgetContainer from '../../components/WidgetContainer';

describe('WidgetContainer', () => {
  describe('render()', () => {
    it('renders WidgetContainer with given content', () => {
      const container = render(<WidgetContainer><div> testing </div></WidgetContainer>);

      expect(container.getByText('testing')).toBeInTheDocument();
    });

    it('renders WidgetContainer with given content and class', () => {
      const container = render(<WidgetContainer className="custom"><div> testing </div></WidgetContainer>);
      const card = container.getByText('testing').parentElement;
      expect(card).toHaveClass('custom');
    });
  });
});
