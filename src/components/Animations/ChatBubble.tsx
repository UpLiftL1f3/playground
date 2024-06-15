import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { SharedValue } from "react-native-reanimated";
import { Bubble } from "./Bubble";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;

let styles: any;
function generateStyles(theme: Theme) {
    return (styles = StyleSheet.create({
        root: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            height: width,
            width,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: theme.colors.card,
            // backgroundColor: "#d3d3d3",
            borderTopLeftRadius: width / 2,
            borderTopRightRadius: width / 2,
            borderBottomLeftRadius: width / 2,
        },
    }));
}

interface ChatBubbleProps {
    progress: SharedValue<null | number>;
}

export const ChatBubble = ({ progress }: ChatBubbleProps) => {
    const theme = useTheme();
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const bubbles = [0, 1, 2];
    const delta = 1 / bubbles.length;
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                {bubbles.map((i) => {
                    const start = i * delta;
                    const end = start + delta;
                    return <Bubble key={i} {...{ start, end, progress }} />;
                })}
            </View>
        </View>
    );
};
