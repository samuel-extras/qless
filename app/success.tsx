import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Share,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import LottieView from "lottie-react-native";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { StatusBar } from "react-native";

const CouponSuccess = () => {
    const [copiedText, setCopiedText] = React.useState("");
    const animation = useRef(null);
    const router = useRouter();

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync("hello world");
        Alert.alert("Copied");
    };
    const shareText = async () => {
        try {
            const result = await Share.share({
                message:
                    "React Native | A framework for building native apps using React",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    useEffect(() => {}, []);

    return (
        <SafeAreaView
            style={{
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1,
                rowGap: 48,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 32,
            }}
        >
            <View className="items-center">
                <View className="bg-white rounded-full items-center justify-center h-20 w-20">
                    <LottieView
                        loop={false}
                        autoPlay
                        ref={animation}
                        style={{
                            width: 150,
                            height: 150,
                        }}
                        source={require("../assets/mark-success.json")}
                    />
                </View>
                <Text className="font-bold text-lg text-black  -dark:text-white mt-3">
                    Coupon Generated Successfully
                </Text>
            </View>
            <View className="w-full items-center">
                <Text className="text-black  -dark:text-white font-bold mb-2">
                    Here’s Your Code{" "}
                </Text>
                <View className="bg-white p-3 rounded-md w-full">
                    <Text className=" text-center font-bold text-base">
                        2F5D9K8J3{" "}
                    </Text>
                </View>
                <View className="flex flex-row w-full justify-center gap-2 pt-3 px-1 mb-10">
                    <TouchableOpacity
                        onPress={() => copyToClipboard()}
                        className=" bg-gray-100 w-1/2 justify-center items-center rounded-lg p-2"
                    >
                        <FontAwesome5 name="copy" color="black" />
                        <Text className="text-black font-medium">Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={shareText}
                        className=" bg-gray-100 w-1/2 justify-center items-center rounded-lg p-2"
                    >
                        <FontAwesome5 name="share" color="black" />
                        <Text className="text-black font-medium">Share</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => router.replace("(home)")}>
                    <Text className="text-center text-base px-4 w-full font-semibold">
                        Close
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    );
};

export default CouponSuccess;

const styles = StyleSheet.create({});
