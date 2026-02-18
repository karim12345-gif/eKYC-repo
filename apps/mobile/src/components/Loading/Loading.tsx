import React, { useMemo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LoadingProps } from './Loading.types';
import { useTheme } from '../../theme/useTheme';
import { getStyles } from './Loading.styles';

/**
 * Loading Component
 *
 * Shows centered loading spinner with optional text
 */
export const Loading: React.FC<LoadingProps> = ({ text }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} animating={true} />
      {!!text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};
