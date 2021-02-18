import React, { FC } from 'react';

import PoweredByUnumID from '../assets/PoweredByUnumID.png';
import './Branding.css';

const Branding: FC = () => (
  <a
    className="branding"
    target="_blank"
    rel="noopener noreferrer"
    href="https://unumid.org"
  >
    <img alt="Powered by Unum ID" src={PoweredByUnumID} />
  </a>
);

export default Branding;
