import React from 'react';
import { shallow } from 'enzyme';

import WidgetContainer from 'elements/containers/WidgetContainer';

describe('WidgetContainer', () => {
  describe('render()', () => {
    it('renders WidgetContainer with given content', () => {
      const container = shallow(<WidgetContainer><div> testing </div></WidgetContainer>);

      expect(container.find('Card').length).toBe(1);

      container.unmount();
    });

    it('renders WidgetContainer with given content and class', () => {
      const container = shallow(<WidgetContainer className="custom"><div> testing </div></WidgetContainer>);

      expect(container.find('Card.custom').length).toBe(1);

      container.unmount();
    });
  });
});
