import { StyleSheet } from "react-native";
import { Theme } from "../../theme/tokens";

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 40,
    },
    content: {
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 32,
    },
    footer: {
      padding: 24,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
  });
