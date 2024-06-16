import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const size = 32;
let styles: any;
function generateStyles(theme: Theme) {
    return (styles = StyleSheet.create({
        bubble: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.primary,
        },
    }));
}

interface BubbleProps {
    progress: SharedValue<null | number>;
    start: number;
    end: number;
}

export const Bubble = ({ progress, start, end }: BubbleProps) => {
    const theme = useTheme();
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const style = useAnimatedStyle(() => {
        const opacity = interpolate(
            progress.value ?? 0,
            [start, end],
            [0.5, 1],
            Extrapolation.CLAMP
        );
        const scale = interpolate(
            progress.value ?? 0,
            [start, end],
            [1, 1.5],
            Extrapolation.CLAMP
        );
        return { opacity, transform: [{ scale }] };
    });
    return <Animated.View style={[styles.bubble, style]} />;
};
