import { ChatBubble } from "@components/Animations/ChatBubble";
import { useTheme } from "@react-navigation/native";
import AppButton from "@ui/AppButton";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Easing,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

interface Props {}

const easing = Easing.inOut(Easing.ease);

const Animations: FC<Props> = (props) => {
    //-> Theme
    const theme = useTheme();

    const [play, setPlay] = useState(false);
    const paused = useSharedValue(!play);
    const progress = useSharedValue<null | number>(null);
    // useEffect(() => {
    //     progress.value = withPause(
    //         withRepeat(withTiming(1, { duration: 1000, easing }), -1, true),
    //         paused
    //     );
    // }, [paused, progress]);

    return (
        <View style={styles.container}>
            <ChatBubble progress={progress} />
            <AppButton
                label={play ? "Pause" : "Play"}
                labelStyle={{ fontSize: 24, fontWeight: "bold" }}
                containerStyle={{
                    backgroundColor: theme.colors.primary,
                    paddingVertical: 10,
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
                onPress={() => {
                    setPlay((prev) => !prev);
                    paused.value = !paused.value;
                    if (progress.value == null) {
                        progress.value = withPause(
                            withRepeat(
                                withTiming(1, { duration: 1000, easing }),
                                -1,
                                true
                            ),
                            paused
                        );
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});
export default Animations;
