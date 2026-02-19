import { StyleSheet } from "react-native";
import { Theme } from "../../theme/tokens";

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      marginRight: 12,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.textSecondary,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginBottom: 12,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
    logoutButton: {
      marginTop: "auto",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      backgroundColor: theme.mode === "dark" ? "#331111" : "#FFF5F5",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.error,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.error,
      marginLeft: 8,
    },
  });
