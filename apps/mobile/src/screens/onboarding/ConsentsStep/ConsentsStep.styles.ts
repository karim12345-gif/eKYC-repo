import { StyleSheet } from "react-native";
import { Theme } from "../../theme/tokens";

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    content: {
      padding: 24,
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
      marginBottom: 24,
    },
    footer: {
      padding: 24,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    // Consents Styles
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      marginBottom: 16,
    },
    checkboxLabel: {
      flex: 1,
      fontSize: 14,
      marginLeft: 12,
      color: theme.colors.text,
      lineHeight: 20,
    },
  });
