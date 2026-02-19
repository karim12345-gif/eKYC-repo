import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../../navigation/types";
import { useTheme } from "../../../theme/useTheme";
import React, { useMemo, useState } from "react";
import { useOnboardingStore } from "../../../store";
import { Input, ProgressHeader } from "../../../components";
import {
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { getStyles as getOnboardingStyles } from "./DocumentStep.styles";

type DocumentType = "PASSPORT" | "NATIONAL_ID" | "DRIVING_LICENSE";

const DOC_TYPES: { id: DocumentType; label: string }[] = [
  { id: "PASSPORT", label: "Passport" },
  { id: "NATIONAL_ID", label: "National ID" },
  { id: "DRIVING_LICENSE", label: "Driving License" },
];

const DocumentStep = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  const styles = useMemo(() => getOnboardingStyles(theme), [theme]);
  const { draft, updateDraft, setStep } = useOnboardingStore();

  const [docType, setDocType] = useState<DocumentType>(
    (draft?.document?.documentType as DocumentType) || "PASSPORT",
  );
  const [docNumber, setDocNumber] = useState(
    draft?.document?.documentNumber || "",
  );

  const handleNext = () => {
    updateDraft("document", {
      documentType: docType,
      documentNumber: docNumber,
    });
    setStep(3);
    navigation.navigate("OnboardingStep3");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isFormValid = docNumber.length > 5;

  return (
    <SafeAreaView style={styles.container}>
      <ProgressHeader currentStep={2} totalSteps={5} onBack={handleBack} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Identification Document</Text>
          <Text style={styles.subtitle}>
            Select your document type and enter the number
          </Text>
        </View>

        <View style={styles.typeSelector}>
          {DOC_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                docType === type.id && styles.typeButtonSelected,
              ]}
              onPress={() => setDocType(type.id)}
            >
              <Text style={styles.typeText}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Document Number"
          value={docNumber}
          onChangeText={setDocNumber}
          placeholder="e.g A123455667"
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Continue" onPress={handleNext} disabled={!isFormValid} />
      </View>
    </SafeAreaView>
  );
};

export default DocumentStep;
