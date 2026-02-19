// root stack navigator
// it defines all the screens and their parameters

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  OnboardingStep3: undefined;
  OnboardingStep4: undefined;
  OnboardingStep5: undefined;
  Settings: undefined;
};

// navigation props helper
// it helps typescript understand the navigation props for each screen in our app
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
