import {
    Image,
    Platform,
    Pressable,
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

const ResetPassword = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <SafeAreaView
            style={{
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1,
            }}
        >
            {/* <ModalScreen /> */}
            <View className="px-2 bg-[#E9ECEF]  -dark:bg-transparent h-full flex justify-between py-6">
                <View className="w-full flex justify-center items-center  bg-gradient-to-r rounded-b rounded-lg">
                    <Text className="font-bold text-2xl text-black  -dark:text-white mb-6">
                        Reset Password
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
                    <Text className="font-bold text-center text-lg text-black  -dark:text-white mb-8">
                        Create a new password{" "}
                    </Text>
                    <View>
                        <Input
                            label="New Password"
                            placeholder={"Enter New password"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={secureTextEntry}
                            textContentType={"password"}
                            icon={
                                secureTextEntry ? (
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry(!secureTextEntry)
                                        }
                                        className="p-2"
                                    >
                                        <FontAwesome5
                                            name="eye"
                                            size={16}
                                            color="white"
                                        />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry(!secureTextEntry)
                                        }
                                        className="p-2"
                                    >
                                        <FontAwesome5
                                            name="eye-slash"
                                            size={16}
                                            color="white"
                                        />
                                    </Pressable>
                                )
                            }
                        />
                        <Input
                            label="Confirm New Password"
                            placeholder={"ReEnter password"}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            secureTextEntry={secureTextEntry}
                            textContentType={"password"}
                            icon={
                                secureTextEntry ? (
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry(!secureTextEntry)
                                        }
                                        className="p-2"
                                    >
                                        <FontAwesome5
                                            name="eye"
                                            size={16}
                                            color="white"
                                        />
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        onPress={() =>
                                            setSecureTextEntry(!secureTextEntry)
                                        }
                                        className="p-2"
                                    >
                                        <FontAwesome5
                                            name="eye-slash"
                                            size={16}
                                            color="white"
                                        />
                                    </Pressable>
                                )
                            }
                        />
                    </View>
                </View>
                <View className="w-full p-4">
                    <Button>
                        <Text className="text-center font-bold text-lg text-white  -dark:text-black">
                            Save
                        </Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ResetPassword;
