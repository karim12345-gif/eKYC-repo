import React, { useMemo } from "react";
import { Text, View, ScrollView, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../../navigation/types";
import { useOnboardingStore } from "../../../store";
import { useTheme } from "../../../theme/useTheme";
import { ProgressHeader } from "../../../components";
import { getReviewStyles } from "./ReviewStep.styles";
import { OnboardingSubmissionStatus } from "../../../../types";

const ReviewStep = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const styles = useMemo(() => getReviewStyles(theme), [theme]);

  const {
    draft,
    submitDraft,
    status: submissionStatus,
    error,
  } = useOnboardingStore();

  const handleFinish = async () => {
    try {
      await submitDraft();
      Alert.alert("Success", "Onboarding completed successfully", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isLoading = submissionStatus === OnboardingSubmissionStatus.SUBMITTING;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader currentStep={5} totalSteps={5} onBack={handleBack} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Review Your Information</Text>
          <Text style={styles.subtitle}>
            Double check everything before submitting
          </Text>

          {/* Profile Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>
                {draft?.profile?.fullName || "Not set"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>DOB</Text>
              <Text style={styles.value}>
                {draft?.profile?.dateOfBirth || "Not set"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Nationality</Text>
              <Text style={styles.value}>
                {draft?.profile?.nationality || "Not set"}
              </Text>
            </View>
          </View>

          {/* Identification Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Identification</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>
                {draft?.document?.documentType || "Not set"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Number</Text>
              <Text style={styles.value}>
                {draft?.document?.documentNumber || "Not set"}
              </Text>
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>
                {draft?.address?.addressLine1 || "Not set"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>
                {draft?.address?.city || "Not set"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.value}>
                {draft?.address?.country || "Not set"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        <Button
          title={isLoading ? "Submitting..." : "Finish"}
          onPress={handleFinish}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReviewStep;
