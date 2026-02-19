import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useGetMe, useLogout } from "../../api/hooks/useAuth";
import {
  useVerificationStatus,
  useResetVerification,
  useStartVerification,
} from "../../api/hooks/useVerification";
import { useOnboardingStore } from "../../store/onboardingStore";
import { useTheme } from "../../theme/useTheme";
import { Button, Loading } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { VerificationStatus } from "../../../types/verification";
import { getStyles } from "./HomeScreen.styles";
import { NavigationProp, RootStackParamList } from "../../navigation/types";

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLoading, error } = useGetMe();

  const { logout } = useLogout();

  const theme = useTheme();
  const { currentStep, clearDraft } = useOnboardingStore();
  const { data: verificationData, isRefetching } = useVerificationStatus();
  const { startVerification, isPending: isProcessing } = useStartVerification();
  const { resetVerification, isPending: isResetting } = useResetVerification();

  const [isSimulating, setIsSimulating] = useState(false);

  const styles = useMemo(() => getStyles(theme), [theme]);

  const status = verificationData?.status || "NOT_STARTED";

  useEffect(() => {
    if (status === "IN_PROGRESS") {
      setIsSimulating(false);
    }
  }, [status]);

  const handleLogout = () => {
    logout();
  };

  const handleStartOnboarding = () => {
    const stepName = `OnboardingStep${currentStep}` as keyof RootStackParamList;
    navigation.navigate(stepName as any);
  };

  const handleTriggerVerification = () => {
    setIsSimulating(true);
    startVerification();
  };

  const handleResetVerification = () => {
    Alert.alert(
      "Reset Status",
      "Are you sure you want to reset verification? This will clear all progress.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetVerification(),
        },
      ],
    );
  };

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case "APPROVED":
        return theme.colors.success;
      case "REJECTED":
        return theme.colors.error;
      case "IN_PROGRESS":
        return theme.colors.info;
      case "MANUAL_REVIEW":
        return theme.colors.warning;
      default:
        return theme.colors.textSecondary;
    }
  };

  if (error) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.error,
            marginBottom: 20,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Authentication Error
        </Text>
        <Text
          style={{
            marginBottom: 32,
            textAlign: "center",
            color: theme.colors.textSecondary,
          }}
        >
          {typeof error === "object" ? (error as any).message : String(error)}
        </Text>
        <Button title="Log Out & Retry" onPress={handleLogout} />
      </View>
    );
  }

  if (isLoading) {
    return <Loading text="Loading user data..." />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.name}>Account Status</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(status) + "20" },
            ]}
          >
            <Text
              style={[styles.statusText, { color: getStatusColor(status) }]}
            >
              {status.replace("_", " ")}
            </Text>
          </View>
        </View>

        {/* User Info Card */}
        <View
          style={[styles.userCard, { backgroundColor: theme.colors.surface }]}
        >
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.fullName}
            </Text>
            <Text
              style={[styles.userEmail, { color: theme.colors.textSecondary }]}
            >
              {user?.email}
            </Text>

            <View style={{ marginTop: 20 }}>
              {(status === "NOT_STARTED" || status === "REJECTED") && (
                <Button
                  title={
                    currentStep > 1
                      ? `Resume Step ${currentStep}`
                      : "Start Onboarding"
                  }
                  onPress={handleStartOnboarding}
                />
              )}
              {status === "IN_PROGRESS" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={20}
                    color={theme.colors.info}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      color: theme.colors.info,
                      fontWeight: "600",
                    }}
                  >
                    Verification in Progress
                  </Text>
                </View>
              )}
              {status === "APPROVED" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={theme.colors.success}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      color: theme.colors.success,
                      fontWeight: "600",
                    }}
                  >
                    Verified Account
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Actions Grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Actions
          </Text>
        </View>

        <View style={styles.utilsGrid}>
          <TouchableOpacity
            style={[
              styles.utilBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={handleResetVerification}
            disabled={isResetting}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={24}
              color={theme.colors.warning}
            />
            <Text style={[styles.utilLabel, { color: theme.colors.text }]}>
              {isResetting ? "Resetting..." : "Reset Verification"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.utilBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={handleTriggerVerification}
            disabled={
              isProcessing || status === "APPROVED" || status === "REJECTED"
            }
          >
            <MaterialCommunityIcons
              name="play-circle-outline"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={[styles.utilLabel, { color: theme.colors.text }]}>
              {isProcessing || isSimulating
                ? "Simulating..."
                : "Retry Simulation"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.utilBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => {
              clearDraft();
              Alert.alert("Success", "Draft cleared");
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color={theme.colors.error}
            />
            <Text style={[styles.utilLabel, { color: theme.colors.text }]}>
              Clear Draft
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.utilBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialCommunityIcons
              name="cog-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
            <Text style={[styles.utilLabel, { color: theme.colors.text }]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
