import {
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

import Logo from "../../assets/images/blackLogo.png";
import Logo2 from "../../assets/images/icon.png";
import Button from "../../components/Button";
import { useRecoilState } from "recoil";
import { USER_TYPE } from "../../utils/types";
import { userState } from "../../atoms/users";
import { toast } from "../../utils";
import AuthAPIManager from "../../services/auth";
import Loader from "../../components/loader";

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30, color: "white" },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: "white",
        textAlign: "center",
        borderRadius: 6,
    },
    focusCell: {
        borderColor: "#CC9933",
    },
});

const CELL_COUNT = 4;

const PinCode = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);

    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const resendCode = async () => {
        setLoader(true);
        const res: any = await new AuthAPIManager().sendVerifyEmail();
        setLoader(false);
        if (!res.success) {
            toast(res.message);
            return;
        }
        setTimeLeft(5);
    };

    const validateCode = async () => {
        setLoader(true);
        const res: any = await new AuthAPIManager().verifyEmail({
            code: value,
        });

        setLoader(false);

        if (!res.success) {
            toast(res.message);
            return;
        }
        setUser({ ...user, is_email_verified: true });
        router.push("/(home)");
    };

    // Format the time remaining as minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            {loader && <Loader />}
            <View className="px-2 bg-[#E9ECEF]  -dark:bg-transparent h-full flex justify-between py-6">
                <View className="w-full flex justify-center items-center  bg-gradient-to-r rounded-b rounded-lg">
                    <Text className="font-bold text-2xl text-black  -dark:text-white mb-6">
                        Verify
                    </Text>
                    {colorScheme === "light" ? (
                        <Image
                            source={Logo}
                            alt="logo"
                            className="w-24 h-[84px]"
                        />
                    ) : (
                        <Image
                            source={Logo2}
                            alt="logo"
                            className="w-24 h-[84px]"
                        />
                    )}
                </View>
                <View className="w-full rounded-md px-8 ">
                    <Text className="font-bold text-center text-black  -dark:text-white mb-8">
                        Code has been sent to{" "}
                        {user?.email?.slice(0, 2) +
                            "*****" +
                            user?.email?.slice(
                                user.email.length - 4,
                                user.email.length
                            )}
                    </Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onEndEditing={validateCode}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    isFocused && styles.focusCell,
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                                className="text-white"
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <Text className="text-black  -dark:text-white text-center mt-4">
                        Resend Code in{" "}
                        <Text className="font-bold text-base text-[#CC9933]">
                            {formattedTime}
                        </Text>
                        s
                    </Text>
                    {Number(timeLeft) <= 0 && (
                        <TouchableOpacity onPress={resendCode}>
                            <Text className="text-base text-[#CC9933] text-center my-4 underline">
                                Resend now
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View className="w-full p-4">
                    <Button onPress={validateCode}>
                        <Text className="text-center font-bold text-lg text-white  -dark:text-black">
                            Verify
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PinCode;
