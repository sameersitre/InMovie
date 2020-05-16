
import { reactotronRedux } from 'reactotron-redux'
import Reactotron from 'reactotron-react-native'
// import AsyncStorage from '@react-native-community/async-storage';

import { NativeModules } from 'react-native';
let scriptHostname;
if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}
const reactotron = Reactotron
  //.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ host: scriptHostname }) // controls connection & communication settings
  .use(reactotronRedux({
    // Fires when Reactotron uploads a new copy of the state tree.
    onRestore: state => Immutable(state)
  })) //  <- here i am!
  // .use(asyncStorage())
  .useReactNative() // add all built-in react native plugins

  .connect() // let's connect!
export default reactotron