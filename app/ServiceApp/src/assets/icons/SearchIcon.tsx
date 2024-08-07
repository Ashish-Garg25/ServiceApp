import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconInterface} from '../../helpers/interfaces';

function SearchIcon(props: IconInterface) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="#000"
      width={20}
      height={20}
      {...props}>
      <Path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default SearchIcon;
