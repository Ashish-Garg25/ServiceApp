import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ChevronRight(props: any) {
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
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </Svg>
  );
}

export default ChevronRight;
