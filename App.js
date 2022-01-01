import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import { FlatList } from 'react-native-web';

export default function App() {
  const scrollY = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollY, 0, 45) // 45 is the height of the "header"
  const translateY = diffClamp.interpolate({ // 45 is the height
    inputRange: [0, 45],
    outputRange: [0, -45]
  })
  // if don't want to scoll up and see the header all the time
  // const translateY = scrollY.interpolate({
  //   inputRange: [0, 45],
  //   outputRange: [0, -45]
  // })
  return (
    <View style={styles.container}>
      {/* This is the "header" you want to hide/show while scrolling */}
      <Animated.View
        style={{
          transform: [
            { translateY: translateY },
          ],
          elevation: 10,
          zIndex: 10
        }}>
        {/* The child should have a absolute position and top, left, right set to 0 */}
      </Animated.View>
      <FlatList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
