import Animations from "@src/screens/Animations";
import { FC, useState } from "react";
import { LayoutRectangle, SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {}

const animation: FC<Props> = (props) => {
    const [container, setContainer] = useState<null | LayoutRectangle>(null);
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                // marginBottom: insets.bottom,
                // justifyContent: "center",
                // alignItems: "center",
                // backgroundColor: "gray",
            }}
            onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
        >
            {container && <Animations {...container} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
export default animation;
