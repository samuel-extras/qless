import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";

import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Logo from "../../assets/images/blackLogo.png";
import Logo2 from "../../assets/images/icon.png";
import Button from "../../components/Button";
import RadioGroup from "../../components/RadioGroup";
import ModalScreen from "../../components/modal";
import { Platform } from "react-native";

const ForgotPassword = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [tab, setTab] = useState("customer");

    return (
        <SafeAreaView
            style={{
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1,
            }}
        >
            <View className="px-2 bg-[#E9ECEF]  -dark:bg-transparent h-full flex justify-between py-6">
                <View className="w-full flex justify-center items-center  bg-gradient-to-r rounded-b rounded-lg">
                    <Text className="font-bold text-2xl text-black  -dark:text-white mb-6">
                        Forgot Password
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
                        Select which contact details should be used to reset
                        your password
                    </Text>
                    <RadioGroup
                        Icon={
                            <FontAwesome5
                                name="sms"
                                color={
                                    colorScheme === "dark" ? "white" : "black"
                                }
                                size={20}
                            />
                        }
                        title="Via SMS:"
                        subTitle="08035****43"
                    />
                    <RadioGroup
                        Icon={
                            <FontAwesome5
                                name="envelope"
                                color={
                                    colorScheme === "dark" ? "white" : "black"
                                }
                                size={20}
                            />
                        }
                        title="Via email:"
                        subTitle="ex****@mail.com"
                    />
                </View>
                <View className="w-full p-4">
                    <Button onPress={() => router.push("pin-code")}>
                        <Text className="text-center font-bold text-lg text-white  -dark:text-black">
                            Continue
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
