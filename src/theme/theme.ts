import { extendTheme } from '@chakra-ui/react';
import { buttonStyles } from './components/button';
import { containerStyles } from './components/container';
import { colorStyles } from './foundations/colors';
import { globalStyles } from './styles';

export default extendTheme(
  globalStyles,
  containerStyles,
  buttonStyles,
  colorStyles
);