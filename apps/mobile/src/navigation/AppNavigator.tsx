import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/authStore";
import { AuthStatus } from "../../types";
import { RootStackParamList } from "./types";

import { HomeScreen, LoginScreen, SettingsScreen } from "../screens";
import {
  AddressStep,
  ProfileStep,
  DocumentStep,
  ConsentsStep,
  ReviewStep,
} from "../screens/onboarding";

// create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  // this tells us if the user is logged in or not
  const { status } = useAuthStore();

  // check if the user is authenticated
  const isAuthenticated = status === AuthStatus.LOGGED_IN;

  return (
    <Stack.Navigator
      id="root"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          {/* /onbaording flow  */}
          <Stack.Screen name="OnboardingStep1" component={ProfileStep} />
          <Stack.Screen name="OnboardingStep2" component={DocumentStep} />
          <Stack.Screen name="OnboardingStep3" component={AddressStep} />
          <Stack.Screen name="OnboardingStep4" component={ConsentsStep} />
          <Stack.Screen name="OnboardingStep5" component={ReviewStep} />
        </>
      )}
    </Stack.Navigator>
  );
};
