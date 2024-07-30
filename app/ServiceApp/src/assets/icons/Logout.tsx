import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Logout(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000"
      width={props.size ?? 20}
      height={props.size ?? 20}
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15"
      />
    </Svg>
  );
}

export default Logout;
