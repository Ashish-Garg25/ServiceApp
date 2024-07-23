import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReactNode} from 'react';
import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  RegisterNext: undefined;
  ChooseType: undefined;
  Home: undefined;
  ProviderDetails: any;
  Post: any;
  CreatePost: undefined;
  PostComplete: any;
  Message: any;
  ManageAddress: undefined;
  EditProfile: undefined;
  AccountSettings: undefined;
  PostDetails: any;
  Providers: any;
  TaskerRoutes: any;
  TaskerBottomTab: any;
  TaskerRegister: any;
  TaskerTaskDetails: any;
  TaskerServiceOnboard: any;
  TaskerService: any;
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;

export interface IconInterface extends SvgProps {
  color?: string;
  size?: number;
  width?: number;
  height?: number;
  brush?: string;
  outerColor?: string;
  innerColor?: string;
  margin?: number;
  filled?: boolean;
}

export interface ButtonInterface {
  title: string | React.ReactNode;
  onPress: () => void;
  btnStyles?: StyleProp<TextStyle> | undefined;
  textStyles?: StyleProp<TextStyle> | undefined;
  disabled?: boolean;
  outline?: boolean;
  color?: string;
}

export interface InputInterface {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: ReactNode;
  helperText?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  bordered?: boolean;
  inputStyles?: StyleProp<TextStyle> | undefined;
  multiline?: boolean;
  numberOfLines?: number;
  caretHidden?: boolean;
  editable?: boolean;
}
