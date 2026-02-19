import React, { useMemo } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/useTheme";
import { useThemeStore } from "../../store/themeStore";
import { useLogout } from "../../api/hooks/useAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStyles } from "./SettingsScreen.styles";
import { NavigationProp } from "../../navigation/types";

export const SettingsScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();

  const { theme: themeMode, toggleTheme } = useThemeStore();
  const { logout } = useLogout();

  const isDarkMode = themeMode === "dark";

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={
                Platform.OS === "ios"
                  ? undefined
                  : isDarkMode
                    ? theme.colors.background
                    : "#f4f3f4"
              }
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color={theme.colors.error}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
