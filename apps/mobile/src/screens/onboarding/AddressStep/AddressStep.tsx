import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, RootStackParamList } from "../../../navigation/types";
import { useTheme } from "../../../theme/useTheme";
import { useOnboardingStore } from "../../../store";
import { Input, ProgressHeader } from "../../../components";
import { getStyles as getOnboardingStyles } from "./AddressStep.styles";

const AddressStep: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const styles = useMemo(() => getOnboardingStyles(theme), [theme]);

  const { draft, updateDraft, setStep } = useOnboardingStore();

  const [addressLine1, setAddressLine1] = useState(
    draft?.address?.addressLine1 || "",
  );
  const [city, setCity] = useState(draft?.address?.city || "");
  const [country, setCountry] = useState(draft?.address?.country || "");

  const handleNext = () => {
    updateDraft("address", {
      addressLine1,
      city,
      country,
    });
    setStep(4);
    navigation.navigate("OnboardingStep4");
  };

  const isFormValid =
    addressLine1.length > 5 && city.length >= 2 && country.length >= 2;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader currentStep={3} totalSteps={5} onBack={handleBack} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Residency</Text>
            <Text style={styles.subtitle}>Where do you currently live?</Text>

            <Input
              label="Street Address"
              value={addressLine1}
              onChangeText={setAddressLine1}
              placeholder="123 Main St"
            />

            <Input
              label="City"
              value={city}
              onChangeText={setCity}
              placeholder="New York"
            />

            <Input
              label="Country"
              value={country}
              onChangeText={setCountry}
              placeholder="United States"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          title="Next Step"
          onPress={handleNext}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddressStep;
