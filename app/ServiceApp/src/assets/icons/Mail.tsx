import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {IconInterface} from '../../helpers/interfaces';
import { COLORS } from '../../utils/color';

function Mail(props: IconInterface) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={20}
      height={20}
      color={COLORS.grey}
      {...props}>
      <Path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <Path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </Svg>
  );
}

export default Mail;
