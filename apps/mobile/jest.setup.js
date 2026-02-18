process.env.RNTL_SKIP_AUTO_CLEANUP = 'true';

jest.mock(
  'react-native',
  () => {
    const React = require('react');
    return {
      NativeModules: {},
      Platform: { OS: 'ios', select: (obj) => obj.ios },
      StyleSheet: { create: (style) => style, flatten: (style) => style },
      View: (props) => React.createElement('View', props),
      Text: (props) => React.createElement('Text', props),
      TouchableOpacity: (props) => React.createElement('TouchableOpacity', props),
    };
  },
  { virtual: true }
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
