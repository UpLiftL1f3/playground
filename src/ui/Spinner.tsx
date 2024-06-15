import React, { FC } from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";

interface Props {
    color?: string;
    size?: number | "small" | "large" | undefined;
    containerStyle?: StyleProp<ViewStyle>;
    visible?: boolean;
}

const Spinner: FC<Props> = (props) => {
    //-> THEME
    // const { theme } = useTheme(); // Access theme and toggleTheme
    // generateStyles(theme);

    const { color, containerStyle, size, visible } = props;

    if (!visible) {
        return null; // Don't render anything if visible is false
    }

    return (
        <View style={[containerStyle, styles.activeContainer]}>
            <View style={styles.background}></View>
            <View>
                <ActivityIndicator
                    // color={color ? color : theme.Tint}
                    size={size ? size : "small"}
                />
                {/* <Text>Loading...</Text> */}
            </View>
        </View>
    );
};

let styles: any;
// function generateStyles(theme: SelectedColorScheme) {
//     return (styles = StyleSheet.create({
//         activeContainer: {
//             // flex: 1,
//             // position: "absolute",
//             // top: "50%",
//             // left: "50%",
//             // alignItems: "center", // Change this line
//             // justifyContent: "center",
//         },
//         background: {
//             // borderRadius: 20,
//             // backgroundColor: 'gray',
//             // opacity: 0.5,
//             // width: '100%',
//             // height: '100%',
//             // position: 'absolute',
//         },
//     }));
// }
export default Spinner;
