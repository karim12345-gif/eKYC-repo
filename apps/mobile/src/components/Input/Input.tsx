import React, { useMemo } from 'react';
import { TextInput, View, Text } from 'react-native';
import { InputProps } from './Input.types';
import { useTheme } from '../../theme/useTheme';
import { getStyles } from './Input.styles';

/**
 * Reusable Input Component
 *
 * Features:
 * - Label above input
 * - Error message below input
 * - Red border on error
 * - Consistent styling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, !!error ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!!secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={!!autoCorrect}
        selectionColor={theme.colors.primary}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
