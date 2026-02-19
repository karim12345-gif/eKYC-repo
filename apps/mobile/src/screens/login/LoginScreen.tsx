import React, { useState, useMemo } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useLogin } from "../../api/hooks/useAuth";
import { useTheme } from "../../theme/useTheme";
import { Button, Input } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStyles } from "./LoginScreen.styles";

export const LoginScreen = () => {
  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // hook
  const { login, isPending, error: apiError } = useLogin();

  // Local validation form inputs
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle login submission
  const handleLogin = () => {
    if (!validate()) return;

    login(
      { email, password },
      {
        onError: () => {
          Alert.alert("Error", "Invalid credentials");
        },
      },
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo/Icon */}
            <View style={styles.header}>
              <View
                style={[
                  styles.logoContainer,
                  { backgroundColor: `${theme.colors.primary}15` },
                ]}
              >
                <MaterialCommunityIcons
                  name="shield-check"
                  size={64}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Welcome Back
              </Text>
              <Text
                style={[styles.subtitle, { color: theme.colors.textSecondary }]}
              >
                Enter your credentials to continue
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="Email Address"
                placeholder="example@mail.com"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Min. 8 characters"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
              />

              {apiError && (
                <View
                  style={[
                    styles.errorContainer,
                    { backgroundColor: `${theme.colors.error}10` },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="alert-circle"
                    size={20}
                    color={theme.colors.error}
                  />
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {apiError instanceof Error
                      ? apiError.message
                      : "An unexpected error occurred"}
                  </Text>
                </View>
              )}

              <Button
                title="Log In"
                onPress={handleLogin}
                loading={isPending}
                style={styles.submitButton}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
