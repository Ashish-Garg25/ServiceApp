import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconInterface} from '../../helpers/interfaces';

function Lock(props: IconInterface) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill={props.color ?? '#000'}
      width={props.size ?? 20}
      height={props.size ?? 20}
      {...props}>
      <Path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default Lock;
