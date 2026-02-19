import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/useTheme";
import { Theme } from "../theme/tokens";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void | Promise<void>;
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingHorizontal: 16,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    backButton: {
      marginRight: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
    },
    progressContainer: {
      height: 6,
      backgroundColor: theme.colors.surface,
      borderRadius: 3,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      borderRadius: 3,
    },
    stepText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 8,
      fontWeight: "600",
    },
  });

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentStep,
  totalSteps,
  onBack,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Onboarding</Text>
      </View>

      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};
