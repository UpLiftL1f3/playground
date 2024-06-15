import React, { ReactNode, forwardRef, useState } from "react";
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

const styles = StyleSheet.create({
    container: {
        width: "auto",
        // height: 45,
        // backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    label: {
        // color: colors.CONTRAST,
        fontSize: 18,
    },
    spinnerContainer: {
        justifyContent: "center",
    },
});
export default AppButton;
