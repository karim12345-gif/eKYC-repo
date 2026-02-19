import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Platform,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboardingStore } from "../../../store";
import { getStyles as getOnboardingStyles } from "./ProfileStep.styles";
import { useTheme } from "../../../theme/useTheme";
import { NavigationProp } from "../../../navigation/types";
import React, { useState, useMemo } from "react";
import { Input, ProgressHeader } from "../../../components";

const ProfileStep = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const styles = useMemo(() => getOnboardingStyles(theme), [theme]);
  const { draft, updateDraft, setStep } = useOnboardingStore();

  const [fullName, setFullName] = useState(draft?.profile?.fullName || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    draft?.profile?.dateOfBirth || "",
  );
  const [nationality, setNationality] = useState(
    draft?.profile?.nationality || "",
  );

  const handleNext = () => {
    updateDraft("profile", { fullName, dateOfBirth, nationality });
    setStep(2);
    navigation.navigate("OnboardingStep2");
  };

  const ifFormValid =
    fullName.length > 2 && dateOfBirth.length === 10 && nationality.length >= 2;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader
        currentStep={1}
        totalSteps={5}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={styles.subtitle}>
            Please enter your personal details to continue.
          </Text>

          <Input
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />

          <Input
            label="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="Enter your date of birth"
          />

          <Input
            label="Nationality"
            value={nationality}
            onChangeText={setNationality}
            placeholder="Enter your nationality"
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          title="Next Step"
          onPress={handleNext}
          disabled={!ifFormValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileStep;
