import { StyleSheet } from 'react-native';
import { Theme } from '../../theme/tokens';

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    disabledButton: {
      backgroundColor: theme.mode === 'dark' ? '#3A3A3C' : '#C6C6C8',
      borderColor: 'transparent',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    primaryText: {
      color: '#FFFFFF',
    },
    secondaryText: {
      color: theme.colors.primary,
    },
  });
