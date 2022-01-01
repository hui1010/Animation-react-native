import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';

export default function App() {
  const position = new Animated.ValueXY({ x: 0, y: 0 })
  // Animated.timing(position, {
  //   toValue: { x: 300, y: 400 },
  //   duration: 2000
  // }).start()

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true, // When you move your fintger, the animation should be placed
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y }
    ]),
    // Same result as above function
    // onPanResponderMove: (event, gesture) => {
    //   position.setValue({ x: gesture.dx, y: gesture.dy })
    // }
    onPanResponderRelease: () => {
      // position.setValue({ x: 0, y: 0 })
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true
      }).start()
    }
  })

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"]
  })

  return (
    <View style={styles.container}>
      <Animated.View
        {...pan.panHandlers}
        style={{
          height: 80,
          width: 80,
          backgroundColor: "#f9f",
          alignItems: 'center',
          justifyContent: 'center',
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotate }
          ]
        }}>
      </Animated.View>
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
