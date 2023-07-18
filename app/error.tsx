import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import LottieView from "lottie-react-native";
import Button from "../components/Button";
import { useRouter } from "expo-router";

const CouponError = () => {
    const animation = useRef(null);
    const router = useRouter();

    useEffect(() => {}, []);

    return (
        <View className="flex-1 justify-center gap-y-24 items-center p-14">
            <View className="items-center">
                <View className="bg-red-500 rounded-full items-center justify-center h-20 w-20">
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 160,
                            height: 160,
                        }}
                        colorFilters={[]}
                        ref={animation}
                        resizeMode="contain"
                        source={require("../assets/exclamation-mark.json")}
                    />
                </View>
                <Text className="font-bold text-sm text-black mt-3">
                    The coupon you entered does not exist
                </Text>
            </View>
            <View className="w-full items-center">
                <View className="flex flex-row w-full justify-center gap-2 pt-3 px-1 mb-10">
                    <TouchableOpacity className=" bg-gray-100 w-1/2 justify-center items-center rounded-lg p-2">
                        <FontAwesome5 name="redo" size={24} color="black" />
                        <Text className="text-black font-medium">
                            Report This Issue{" "}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" bg-gray-100 w-1/2 justify-center items-center rounded-lg p-2">
                        <AntDesign
                            name="exclamationcircleo"
                            size={24}
                            color="black"
                        />
                        <Text className="text-black font-medium">Retry</Text>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => router.replace("(home)")}>
                    <Text className="text-center text-base px-4 w-full font-semibold">
                        Close
                    </Text>
                </Button>
            </View>
        </View>
    );
};

export default CouponError;

const styles = StyleSheet.create({});
