import { StyleSheet } from "react-native";
import { Theme } from "../../theme/tokens";

export const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 24,
      justifyContent: "center",
    },
    header: {
      alignItems: "center",
      marginBottom: 48,
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
    },
    form: {
      width: "100%",
    },
    forgotPassword: {
      alignSelf: "flex-end",
      marginBottom: 24,
      marginTop: -8,
    },
    forgotPasswordText: {
      fontSize: 14,
      fontWeight: "600",
    },
    submitButton: {
      marginTop: 8,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 8,
      marginBottom: 24,
    },
    errorText: {
      fontSize: 14,
      marginLeft: 8,
      flex: 1,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 32,
    },
    footerText: {
      fontSize: 14,
    },
    footerLink: {
      fontSize: 14,
      fontWeight: "700",
    },
  });
