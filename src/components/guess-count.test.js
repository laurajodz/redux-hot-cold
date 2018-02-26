import React from 'react';
import { shallow } from 'enzyme';

import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessCount />);
  });
});
