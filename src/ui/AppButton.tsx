import { Theme, useTheme } from "@react-navigation/native";
import React, { ReactNode, forwardRef, useMemo, useState } from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import Spinner from "./Spinner";

interface Props {
    children?: ReactNode;
    label?: string;
    onPress?(): void;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    pressedLabelStyle?: StyleProp<TextStyle>;
    isBusy?: boolean;
    translateY?: number;
    pressedOpacity?: number;
}

const AppButton = forwardRef<View, Props>((props, ref) => {
    const {
        label,
        onPress,
        containerStyle,
        labelStyle,
        isBusy,
        pressedLabelStyle,
        pressedOpacity,
    } = props;

    const theme = useTheme();
    const styles = useMemo(() => generateStyles(theme), [theme]);

    const [isPressed, setIsPressed] = useState(false);

    return (
        <Pressable
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={({ pressed }) => [
                styles.container,
                containerStyle,
                pressed && {
                    opacity: pressedOpacity ? pressedOpacity : 0.5,
                    transform: [
                        {
                            translateY: props.translateY
                                ? props.translateY
                                : 3.5,
                        },
                    ],
                },
            ]}
            onPress={onPress}
        >
            {props.children}
            {!isBusy ? (
                <Text
                    style={[
                        styles.label,
                        labelStyle,
                        isPressed && pressedLabelStyle, // Conditionally apply pressed styles
                    ]}
                >
                    {label}
                </Text>
            ) : (
                <Spinner
                    color={"white"}
                    size={"small"}
                    containerStyle={styles.spinnerContainer}
                    visible={true}
                />
            )}
        </Pressable>
    );
});

let styles: any;
function generateStyles(theme: Theme) {
    return (styles = StyleSheet.create({
        container: {
            width: "auto",
            // height: 45,
            // backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
        },
        label: {
            color: theme.colors.text,
            fontSize: 18,
        },
        spinnerContainer: {
            justifyContent: "center",
        },
    }));
}
export default AppButton;
