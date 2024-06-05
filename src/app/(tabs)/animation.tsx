import PanGesture from "@src/screens/PanGesture";
import { FC, useState } from "react";
import { LayoutRectangle, SafeAreaView, StyleSheet } from "react-native";

interface Props {}

const animation: FC<Props> = (props) => {
    const [container, setContainer] = useState<null | LayoutRectangle>(null);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
                backgroundColor: "blue",
            }}
            onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
        >
            {container && <PanGesture {...container} />}
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
