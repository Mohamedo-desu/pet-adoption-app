import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

const useDotStyles = ({
  scrollX,
  index,
  activeDotColor,
  inActiveDotColor,
}: {
  scrollX: any;
  index: number;
  activeDotColor: string;
  inActiveDotColor: string;
}) => {
  const DEVICE_WIDTH = useWindowDimensions().width;
  return useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * DEVICE_WIDTH,
      index * DEVICE_WIDTH,
      (index + 1) * DEVICE_WIDTH,
    ];

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      inActiveDotColor,
      activeDotColor,
      inActiveDotColor,
    ]);

    return {
      opacity,
      backgroundColor,
    };
  });
};

const ExpandingDots = ({
  data,
  scrollX,
  activeDotColor,
  inActiveDotColor,
}: {
  data: any[];
  scrollX: any;
  activeDotColor: string;
  inActiveDotColor: string;
}) => {
  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => {
        const animatedDotStyle = useDotStyles({
          scrollX,
          index,
          activeDotColor,
          inActiveDotColor,
        });
        return (
          <Animated.View
            key={`dot-${index}`}
            style={[styles.dot, animatedDotStyle]}
          />
        );
      })}
    </View>
  );
};

export default ExpandingDots;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: moderateScale(5),
  },
  dot: {
    width: moderateScale(8),
    aspectRatio: 1,
    borderRadius: moderateScale(5),
  },
});
