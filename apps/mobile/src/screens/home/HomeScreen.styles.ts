import { StyleSheet } from "react-native";
import { Theme } from "../../theme/tokens";

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 24,
      paddingBottom: 40,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 32,
      paddingHorizontal: 4,
    },
    name: {
      fontSize: 14,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: theme.colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
    },

    // User Info Card
    userCard: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      opacity: 0.7,
    },

    // Status Card
    statusCard: {
      borderRadius: 20,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
    },
    statusHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 10,
    },
    statusLabel: {
      fontSize: 14,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    statusTitle: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 8,
    },
    statusDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 20,
    },
    statusAction: {
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    statusActionText: {
      fontSize: 14,
      fontWeight: "700",
    },

    // Sections
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
    },

    // Utility Actions
    utilsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    utilBtn: {
      width: "48%",
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      alignItems: "center",
      marginBottom: 16,
    },
    utilLabel: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: "600",
      textAlign: "center",
    },

    logoutBtn: {
      marginTop: 8,
      paddingVertical: 16,
      borderRadius: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.error,
    },
    logoutText: {
      color: theme.colors.error,
      fontSize: 16,
      fontWeight: "700",
      marginLeft: 8,
    },
  });
