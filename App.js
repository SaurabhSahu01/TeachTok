import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home';
import HomeScreenScroll from './screens/homeScroll';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex:1 }}>
    <View style={styles.container}>
      {/* <HomeScreen/> */}
      <HomeScreenScroll/> 
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
