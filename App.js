import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home';
import HomeScreenScroll from './screens/homeScroll';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen/> */}
      <HomeScreenScroll />
    </View>
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
