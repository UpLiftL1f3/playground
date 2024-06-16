import { CARD_HEIGHT, CARD_WIDTH, Card, Cards } from "@components/card/Card";
import { withBounce } from "@src/functions/animations/animations";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    clamp,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
} from "react-native-reanimated";

interface Props {
    width: number;
    height: number;
}

const PanGesture: FC<Props> = ({ width, height }) => {
    // console.log({ width, height });

    const boundX = width - CARD_WIDTH;
    const boundY = height - CARD_HEIGHT;

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    const pan = Gesture.Pan()
        .onBegin(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        })
        .onUpdate((event) => {
            translateX.value = clamp(
                offsetX.value + event.translationX,
                0,
                boundX
            );
            translateY.value = clamp(
                offsetY.value + event.translationY,
                0,
                boundY
            );
        })
        .onEnd(({ velocityX, velocityY }) => {
            translateX.value = withBounce(
                withDecay({
                    velocity: velocityX,
                }),
                0,
                boundX
            );
            translateY.value = withBounce(
                withDecay({
                    velocity: velocityY,
                }),
                0,
                boundY
            );
        });
    // .onEnd(({ velocityX, velocityY }) => {
    //     translateX.value = withDecay({
    //         velocity: velocityX,
    //         clamp: [0, boundX],
    //     });
    //     translateY.value = withDecay({
    //         velocity: velocityY,
    //         clamp: [0, boundY],
    //     });
    // });
    // .onFinalize(() => {
    //     offset.value = withSpring(0);
    //     pressed.value = false;
    // });

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <GestureDetector gesture={pan}>
                <Animated.View style={style}>
                    <Card card={Cards.Card1} />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "#a2a2a2ec",
        borderTopWidth: 1,
        paddingTop: 1,
    },
});
export default PanGesture;
