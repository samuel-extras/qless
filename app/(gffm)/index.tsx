import { SafeAreaView, Text, View } from "react-native";
import React, { useState } from "react";

import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import {
    CodeField,
    Cursor,
    isLastFilledCell,
    MaskSymbol,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 4;

const SETPIN = () => {
    // const router = useRouter();
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const colorScheme = useColorScheme();

    return <SafeAreaView className=""></SafeAreaView>;
};

export default SETPIN;
