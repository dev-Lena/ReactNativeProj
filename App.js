import React, {useEffect} from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue, withRepeat, withSequence, withSpring, withTiming,
} from 'react-native-reanimated';

const App = () => {
  const x = useSharedValue(0);
  const rotation = useSharedValue(0);

    useEffect(() => {
        // withRepeat 로 애니메이션을 반복합니다.
        rotation.value = withRepeat(
            // 100ms 동안 값을 5로 이동하고, 다음 100ms 동안 값을 -5로 이동합니다.
            withSequence(
                withTiming(5, { duration: 100 }),
                withTiming(-5, { duration: 100 }),
            ),
            // 반복횟수 지정을 0 으로 설정하면 무한히 반복합니다.
            0,
        );
    }, [rotation]);

    const rotationStyle = useAnimatedStyle(
        () => ({
            transform: [
                {
                    // rotate 값으로 -5에서 5 사이를 왔다갔다하는 rotation 값에 deg 를 붙여서
                    // -5도에서 5도 사이를 왔다갔다하는 스타일을 적용합니다.
                    rotate: `${rotation.value}deg`,
                },
            ],
        }),
        [],
    );


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
          <Animated.View style={[styles.rect, rotationStyle]} />
        </View>

        <View style={styles.button}>
          <Button
              title="이동하기"
              // 버튼을 누르면 랜덤한 곳으로 이동합니다.
              onPress={() =>
                  (x.value = withSpring(Math.random() * 255))
              }
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