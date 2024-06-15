import { StyleGuide } from "@components/StyleGuide";
import React, { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Card, Cards } from "./Card";

interface Props {
    card: Cards;
    color: string;
    transition: any;
    index: number;
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        padding: StyleGuide.spacing * 4,
    },
});

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);

const AnimatedCard: FC<Props> = (props) => {
    const style = useAnimatedStyle(() => {
        const rotate = interpolate(
            props.transition.value,
            [0, 1],
            [0, ((props.index - 1) * Math.PI) / 7]
        );
        return {
            transform: [
                { translateX: origin },
                { rotate: rotate + "rad" },
                { translateX: -origin },
            ],
        };
    });
    return (
        <Animated.View style={[styles.overlay, style]}>
            <Card card={props.card} color={props.color} />
        </Animated.View>
    );
};

// const styles = StyleSheet.create({
//     container: {},
// });
export default AnimatedCard;
