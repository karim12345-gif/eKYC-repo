import React, { useMemo } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ButtonProps } from './Button.types';
import { useTheme } from '../../theme/useTheme';
import { getStyles } from './Button.styles';

/**
 * Reusable Button Component
 *
 * Features:
 * - Primary and secondary variants
 * - Loading state with spinner
 * - Disabled state
 * - Consistent styling
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  onPress,
  disabled = false,
  style,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // Ensure boolean type for native prop
  const isDisabled = !!(disabled || loading);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        isDisabled ? styles.disabledButton : null,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : theme.colors.primary}
          animating={true}
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variant === 'primary' ? styles.primaryText : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
