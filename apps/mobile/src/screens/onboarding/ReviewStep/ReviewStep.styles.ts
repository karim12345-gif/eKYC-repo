import { StyleSheet } from "react-native";
import { Theme } from "../../../theme/tokens";

export const getReviewStyles = (theme: Theme) =>
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
      marginBottom: 32,
    },
    section: {
      marginBottom: 24,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.primary,
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    label: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: "500",
    },
    value: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "600",
      textAlign: "right",
      flex: 1,
      marginLeft: 16,
    },
    footer: {
      padding: 24,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      textAlign: "center",
      marginBottom: 16,
    },
  });
