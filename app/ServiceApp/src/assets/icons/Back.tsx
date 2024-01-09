import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconInterface} from '../../helpers/interfaces';

function Back(props: IconInterface) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000"
      width={20}
      height={20}
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </Svg>
  );
}

export default Back;
