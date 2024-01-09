import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconInterface} from '../../helpers/interfaces';

function User(props: IconInterface) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={20}
      height={20}
      {...props}>
      <Path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default User;
