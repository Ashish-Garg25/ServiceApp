import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Tick(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
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
        d="M4.5 12.75l6 6 9-13.5"
      />
    </Svg>
  );
}

export default Tick;
