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

const TransactionPin = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView className="">
            {/* <ModalScreen /> */}
            <View className="p-4 bg-[#E9ECEF]  -dark:bg-transparent h-full flex justify-between pb-6">
                <View className="w-full flex justify-center items-center  bg-gradient-to-r rounded-b rounded-lg">
                    <Text className="font-bold text-base text-[#CC9933] text-center">
                        Hi, Baze University{" "}
                    </Text>
                    <Text className="font-bold text-sm text-center w-1/2 text-black  -dark:text-white ">
                        You’re about to access the Coupon Generation Portal{" "}
                    </Text>
                </View>
                <View className="w-full rounded-md px-8 ">
                    <Text className="font-normal text-center text-black  -dark:text-white mb-8">
                        Let’s quickly verify it’s actually you...{" "}
                    </Text>
                    <Text className="font-bold text-center text-black  -dark:text-white mb-4">
                        Enter Your Transaction PIN{" "}
                    </Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={{ marginTop: 20 }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoFocus={true}
                        focusable={true}
                        secureTextEntry={true}
                        onEndEditing={() => router.replace("generate-coupon")}
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    {
                                        width: 40,
                                        height: 40,
                                        lineHeight: 38,
                                        fontSize: 24,
                                        borderWidth: 2,
                                        borderColor:
                                            colorScheme === "dark"
                                                ? "white"
                                                : "black",
                                        textAlign: "center",
                                        borderRadius: 6,
                                    },
                                    isFocused && {
                                        borderColor: "#CC9933",
                                    },
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                                className="text-black  -dark:text-white"
                            >
                                {symbol ? (
                                    <MaskSymbol
                                        maskSymbol="*"
                                        isLastFilledCell={isLastFilledCell({
                                            index,
                                            value,
                                        })}
                                    >
                                        {symbol}
                                    </MaskSymbol>
                                ) : isFocused ? (
                                    <Cursor />
                                ) : (
                                    ""
                                )}
                            </Text>
                        )}
                    />
                </View>
                <View className="w-full p-4"></View>
            </View>
        </SafeAreaView>
    );
};

export default TransactionPin;
