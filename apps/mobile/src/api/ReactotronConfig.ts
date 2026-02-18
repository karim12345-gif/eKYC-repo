import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Define the custom console interface
declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
    .configure({
      name: 'E-KYC Mobile',
      // For iOS Simulator, use localhost. For physical device, replace with your machine's IP
      host: Platform.OS === 'ios' ? 'localhost' : '10.0.2.2', // Android emulator uses 10.0.2.2
    })
    .useReactNative({
      asyncStorage: true,
      networking: {
        ignoreUrls: /symbolicate/,
      },
    })
    .connect();

  console.tron = reactotron;

  // Log that Reactotron is ready
  console.tron.log('🚀 Reactotron Connected!');
}

export default Reactotron;
