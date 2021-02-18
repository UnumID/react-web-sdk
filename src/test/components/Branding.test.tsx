import React from 'react';
import { render, screen } from '@testing-library/react';

import Branding from '../../components/Branding';
import PoweredByUnumID from '../../assets/PoweredByUnumID.png';

describe('Branding', () => {
  it('shows Unum ID branding', () => {
    render(<Branding />);
    const component = screen.getByAltText('Powered by Unum ID');
    expect(component).toBeInTheDocument();
    expect(component).toHaveAttribute('src', PoweredByUnumID);
  });

  it('links to the Unum ID website', () => {
    render(<Branding />);
    const link = screen.getByAltText('Powered by Unum ID').closest('a');
    expect(link).toHaveAttribute('href', 'https://unumid.org');
  });
});
