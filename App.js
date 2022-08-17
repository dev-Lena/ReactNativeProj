import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const App = () => {
  const x = useSharedValue(0);

  // 애니메이션 효과를 주는 style 의 경우 useAnimatedStyle Hook 을 이용하여 따로 정의합니다.
  const animatedStyle = useAnimatedStyle(
      () => ({
        transform: [{ translateX: x.value }],
      }),
      [],
  );

  return (
      <SafeAreaView style={styles.view}>
        <View style={styles.rectView}>
          <Animated.View style={[styles.rect, animatedStyle]} />
        </View>

        <View style={styles.button}>
          <Button
              title="이동하기"
              // 버튼을 누르면 랜덤한 곳으로 이동합니다.
              onPress={() => (x.value = Math.random() * 255)}
          />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginVertical: 300,
    marginHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectView: {
    width: '100%',
  },
  rect: {
    width: 80,
    height: 80,
    backgroundColor: '#001a90',
    borderRadius: 10,
  },
  button: {
    padding: 20,
  },
});

export default App;