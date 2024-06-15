import AnimatedCard from "@components/card/AnimatedCard";
import { cards } from "@components/card/Card";
import { useTheme } from "@react-navigation/native";
import AppButton from "@ui/AppButton";
import React, { FC, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
    useDerivedValue,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

interface Props {}

const useSpring = (state: any, config: SpringConfig) => {
    const value = useSharedValue<number>(0);

    useEffect(() => {
        value.value = typeof state == "number" ? state : state ? 1 : 0;
    }, [state, value]);

    return useDerivedValue(() => {
        return withSpring(value.value ? 1 : 0, config);
    });
};

const useTiming = (state: any, config: any) => {
    const value = useSharedValue<number>(0);

    useEffect(() => {
        value.value = typeof state == "number" ? state : state ? 1 : 0;
    }, [state, value]);

    return useDerivedValue(() => {
        return withTiming(value.value ? 1 : 0, config);
    });
};

const Transitions: FC<Props> = (props) => {
    console.log("PROPS:", props);

    const theme = useTheme();
    const toggled = useSharedValue(false);
    // const isToggled = useSharedValue(false);
    // useEffect(() => {
    //     isToggled.value = toggled;
    // }, [toggled, isToggled]);

    const transition = useDerivedValue(() => {
        return withSpring(toggled.value ? 1 : 0, { duration: 500 });
    });

    const colors = ["#fb5607", "#3a86ff", "#fdf0d5"];

    return (
        <View style={styles.container}>
            {cards.slice(0, 3).map((card, i) => (
                <AnimatedCard
                    key={card}
                    card={card}
                    transition={transition}
                    index={i}
                    color={colors[i]}
                />
            ))}
            <AppButton
                label={toggled ? "reset" : "start"}
                labelStyle={{ color: theme.colors.text }}
                onPress={() => (toggled.value = !toggled.value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
});
export default Transitions;
