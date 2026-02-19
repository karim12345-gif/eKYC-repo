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
    // Document Selector Styles
    typeSelector: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
      paddingHorizontal: 24,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      marginHorizontal: 4,
    },
    typeButtonSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "10",
    },
    typeText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.text,
    },
  });
