import { SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

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
import { useRecoilState } from "recoil";
import { USER_TYPE } from "../../utils/types";
import { userState } from "../../atoms/users";
import Button from "../../components/Button";
import { toast } from "../../utils";
import ProfileAPIManager from "../../services/profile";
import Loader from "../../components/loader";
import Message from "../../components/Message";

const CELL_COUNT = 4;

const SetPin = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [firstValue, setFirstValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const colorScheme = useColorScheme();
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [loader, setLoader] = useState<boolean>(false);
    const [serverRes, setServerRes] = useState<{
        message?: string;
        success?: boolean;
    }>({});
    const [showMessage, setShowMessage] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleProceed = () => {
        setFirstValue(value);
        setValue("");
    };

    const handleCreatePin = async () => {
        if (firstValue !== value) {
            toast("Pin does not match");
            setFirstValue("");
            setValue("");
            return;
        }
        setLoader(true);
        const res: any = await new ProfileAPIManager().setPin(value);
        setServerRes(res);
        if (res.success) {
            setUser({ ...user, pin: value });
        }
        setLoader(false);
        setShowMessage(true);
    };

    useEffect(() => {
        if (completed) router.back();
    }, [completed]);

    return (
        <SafeAreaView className="">
            {loader && <Loader />}
            {/* <ModalScreen /> */}

            <Message
                message={serverRes.message}
                success={serverRes.success}
                visible={showMessage}
                handleClose={() => {
                    setShowMessage(false);
                    setCompleted(true);
                }}
            />
            <View className="p-4 bg-[#E9ECEF] -dark:bg-transparent h-full flex justify-between ">
                <View className="w-full flex justify-center items-center  bg-gradient-to-r rounded-b rounded-lg">
                    <Text className="font-bold text-base text-[#CC9933] text-center">
                        Hi, {user.name}
                    </Text>
                    <Text className="font-bold text-sm text-center w-1/2 text-black -dark:text-white ">
                        You’re about to set your Transaction Pin
                    </Text>
                </View>
                <View className="w-full rounded-md px-8 ">
                    {/* <Text className="font-normal text-center text-black -dark:text-white mb-8">
                        Let’s quickly verify it’s actually you...{" "}
                    </Text> */}
                    {firstValue ? (
                        <Text className="font-bold text-center text-black -dark:text-white mb-4">
                            Confirm Your Transaction PIN{" "}
                        </Text>
                    ) : (
                        <Text className="font-bold text-center text-black -dark:text-white mb-4">
                            Enter Your Desire Transaction PIN{" "}
                        </Text>
                    )}
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
                                className="text-black -dark:text-white"
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
                    <View className="w-full p-4 mt-40">
                        {value.length === 4 &&
                            (firstValue ? (
                                <Button onPress={handleCreatePin}>
                                    <Text className="text-center text-base text-white font-semibold">
                                        Create Pin
                                    </Text>
                                </Button>
                            ) : (
                                <Button onPress={handleProceed}>
                                    <Text className="text-center text-base text-white font-semibold">
                                        Proceed
                                    </Text>
                                </Button>
                            ))}
                    </View>
                </View>
                <View className="w-full p-4"></View>
            </View>
        </SafeAreaView>
    );
};

export default SetPin;
