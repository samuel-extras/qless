import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Input from "../../components/Input";
import Logo from "../../assets/images/blackLogo.png";
import Logo2 from "../../assets/images/icon.png";
import Button from "../../components/Button";
import RadioGroup from "../../components/RadioGroup";
import ModalScreen from "../../components/modal";
import { StatusBar } from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { USER_TYPE } from "../../utils/types";
import AuthAPIManager from "../../services/auth";
import Loader from "../../components/loader";
import { toast } from "../../utils";

const Verification = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [tab, setTab] = useState("customer");
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [loader, setLoader] = useState<boolean>(false);

    const handleVerify = async () => {
        setLoader(true);
        const res: any = await new AuthAPIManager().sendVerifyEmail();
        setLoader(false);
        if (!res.success) {
            toast(res.message);
            return;
        }
        router.push("/pin-code");
    };

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
                        Verify your Credentials
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
                        Select Credential you want to verify
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
                        subTitle={
                            user?.phone?.slice(0, 5) +
                            "********" +
                            user?.phone?.slice(
                                user.phone.length - 2,
                                user.phone.length
                            )
                        }
                    />
                    <RadioGroup
                        checked
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
                        subTitle={
                            user?.email?.slice(0, 2) +
                            "*****" +
                            user?.email?.slice(
                                user.email.length - 10,
                                user.email.length
                            )
                        }
                    />
                </View>
                <View className="w-full p-4">
                    <Button onPress={handleVerify}>
                        <Text className="text-center font-bold text-lg text-white  -dark:text-black">
                            Continue
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Verification;

const styles = StyleSheet.create({});
