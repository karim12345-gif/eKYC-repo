import { ViewStyle } from 'react-native';

/**
 * Button Component Props
 */
export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}
