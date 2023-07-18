import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import Logo from "../../assets/images/icon.png";
import { Image } from "react-native";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

const Welcome = () => {
    const router = useRouter();

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1678903429948-0706fbbd5f6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU5fHxmdWVsJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover items-center justify-center p-16"
        >
            <View className="justify-center items-center mb-40">
                <Text className="text-black text-3xl font-bold text-center">
                    Thank You for Choosing{" "}
                </Text>
                <Image
                    source={Logo}
                    alt="logo"
                    className="w-[100px] h-[88px] mt-8"
                />
            </View>
            <View className="w-full mt-20">
                <Button onPress={() => router.push("(auth)/signup")}>
                    <Text className="px-6 font-bold text-lg text-center">
                        Register NOW!
                    </Text>
                </Button>
                <TouchableOpacity
                    onPress={() => router.push("(auth)/sign-in")}
                    className="border border-white rounded-full px-8 py-1.5 w-full text-center mt-4"
                >
                    <Text className="text-base text-white font-bold text-center">
                        Log in
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Welcome;

const styles = StyleSheet.create({});
