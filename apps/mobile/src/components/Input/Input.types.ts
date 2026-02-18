import { TextInputProps } from 'react-native';

/**
 * Input Component Props
 */
export interface InputProps {
  label: string; // Label text shown above input
  error?: string; // Error message to show
  containerStyle?: any; // Custom styles for container
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
}
