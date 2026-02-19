import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useAuthStore, useThemeStore } from "./src/store";
import { API_CONFIG } from "./src/api/services";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

// main component

// this is the root compnet that , sets up reacu query for api calls
// applying theme
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // if any query fails with 401, force logut to breka loading loops
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        useAuthStore.getState().clearSession();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: API_CONFIG.RETRY_ATTEMPTS, // retry failed request 1 time
      staleTime: API_CONFIG.STALE_TIME, // cache data for 5 minutes
    },
  },
});

export default function App() {
  // get current theme from zustand sotre
  const { theme } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      {/* status bar  */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
