import React, { useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../../navigation/types";
import { useTheme } from "../../../theme/useTheme";
import { useOnboardingStore } from "../../../store";
import { ProgressHeader } from "../../../components";
import { Ionicons } from "@expo/vector-icons";
import { getStyles as getOnboardingStyles } from "./ConsentsStep.styles";

const ConsentsStep: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const styles = useMemo(() => getOnboardingStyles(theme), [theme]);

  const { draft, updateDraft, setStep } = useOnboardingStore();

  const [termsAccepted, setTermsAccepted] = useState(
    draft?.consents?.termsAccepted || false,
  );

  const handleNext = () => {
    updateDraft("consents", {
      termsAccepted,
    });
    setStep(5);
    navigation.navigate("OnboardingStep5");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader currentStep={4} totalSteps={5} onBack={handleBack} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Legal Consents</Text>
          <Text style={styles.subtitle}>
            Please review and accept the following terms:
          </Text>

          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            activeOpacity={0.7}
            style={styles.checkboxContainer}
          >
            <Ionicons
              name={termsAccepted ? "checkbox" : "square-outline"}
              size={24}
              color={
                termsAccepted
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />

            <Text style={styles.checkboxLabel}>
              I accept the terms and conditions, and I confirm that all
              information provided is accurate.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Almost There"
          onPress={handleNext}
          disabled={!termsAccepted}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConsentsStep;
