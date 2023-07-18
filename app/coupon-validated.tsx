import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Share,
    Image,
    BackHandler,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import LottieView from "lottie-react-native";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import CouponAPIManager from "../services/coupon";
import { useRecoilState } from "recoil";
import { COUPON_TYPE } from "../utils/types";
import { couponState } from "../atoms/coupon";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { shareAsync, isAvailableAsync } from "expo-sharing";

const CouponValidated = () => {
    const animation = useRef(null);
    const router = useRouter();
    const [displaySucsess, setDisplaySuccess] = useState(true);
    const [coupon, setCoupon] = useRecoilState<COUPON_TYPE>(couponState);
    const imageRef = useRef();

    const shareText = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            const share = await shareAsync(`file://${localUri}`, {});
            // Alert.alert("Shared ✔️", "Receipt has been shared successfully");
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setDisplaySuccess(false);
        }, 4000);
    }, []);

    const fetchMontlyCoupon = async () => {
        const res: any = await new CouponAPIManager().getCouponMontly();
        // setMonthlyCoupon(res.data);
    };

    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });
            if (Platform.OS === "ios") {
                await Sharing.shareAsync(localUri);
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();

                if (permission.granted) {
                    await MediaLibrary.createAssetAsync(localUri);
                    Alert.alert("Saved", "Saved To Galary");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            {displaySucsess && coupon.status === "validated" && (
                <View className="items-center absolute z-50 top-1/2  left-0 right-0 ">
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
                </View>
            )}
            <ScrollView ref={imageRef as any}>
                <View className="flex-1 justify-center  items-center px-6 pt-4 bg-white  ">
                    <View className="w-full items-center">
                        <View className="">
                            <View className="items-center mb-4 gap-y-2">
                                <Image
                                    source={require("../assets/images/icon.png")}
                                    className="w-14 h-12 object-center"
                                />
                                <Text className="text-sm text-black ">
                                    Invoice {coupon.code}
                                </Text>
                            </View>

                            <View className="mt-5 grid grid-cols-2 gap-5">
                                <View className="flex-row justify-between">
                                    <View>
                                        <Text className="block text-xs uppercase text-black ">
                                            Amount paid:
                                        </Text>
                                        <Text className="block text-sm font-medium text-gray-800">
                                            ₦{" "}
                                            {Number(
                                                coupon.amount
                                            ).toLocaleString()}
                                        </Text>
                                    </View>

                                    <View>
                                        <Text className="block text-xs uppercase text-black ">
                                            Date paid:
                                        </Text>
                                        <Text className="block text-sm font-medium text-gray-800">
                                            {new Date(
                                                coupon.created_at
                                            ).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text className="block text-xs uppercase text-black ">
                                        Customer's Name:
                                    </Text>
                                    <View className="">
                                        <Text className="block text-base font-bold text-gray-800">
                                            {coupon.driver}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className="mt-5">
                                <View className="flex flex-row justify-between">
                                    <Text className="text-xs font-semibold uppercase text-gray-800">
                                        Summary
                                    </Text>
                                    {coupon.status === "validated" ? (
                                        <Text className="text-xs font-semibold uppercase text-green-700 rounded-full bg-green-200 px-2 py-1">
                                            {coupon.status}
                                        </Text>
                                    ) : (
                                        <Text className="text-xs font-semibold uppercase text-red-700 rounded-full bg-red-200 px-2 py-1">
                                            {coupon.status}
                                        </Text>
                                    )}
                                </View>

                                <View className="mt-3 flex ">
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold">
                                                Select Vehicle
                                            </Text>
                                            <Text className="text-gray-800 ">
                                                {coupon.vehicle_number}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row flex-wrap items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold mr-4">
                                                Description
                                            </Text>
                                            <Text className="text-gray-800">
                                                {coupon.vehicle_name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold">
                                                Product
                                            </Text>
                                            <Text className="text-gray-800">
                                                {coupon.product}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold">
                                                Driver
                                            </Text>
                                            <Text className="text-gray-800">
                                                {coupon.driver}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row flex-wrap gap-y-2 items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold mr-4">
                                                Served @:
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                className="text-gray-800 "
                                            >
                                                {coupon.validated_by}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg ">
                                        <View className="flex-row items-center justify-between w-full">
                                            <Text className="text-gray-800 font-semibold">
                                                Amount paid
                                            </Text>
                                            <Text className="text-gray-800">
                                                ₦{" "}
                                                {Number(
                                                    coupon.amount
                                                ).toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View className="mt-5 flex-row justify-end gap-x-2">
                                <TouchableOpacity
                                    onPress={onSaveImageAsync}
                                    className="py-2 px-3 flex-row justify-center items-center  rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm "
                                >
                                    <FontAwesome5
                                        name="file-download"
                                        size={20}
                                        color="white"
                                    />
                                    <Text className="font-semibold text-black  ml-2 ">
                                        Download Image
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={shareText}
                                    className="py-2 px-3 flex-row justify-center items-center rounded-md border border-transparent  bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                                >
                                    <Text className="font-semibold text-white  ">
                                        Share
                                    </Text>
                                    <Entypo
                                        name="share"
                                        size={20}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View className="mt-5 ">
                                <Text className="text-sm text-center text-black ">
                                    If you have any questions, please contact us
                                    at{" "}
                                    <Text className="flex-row items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
                                        example@site.com
                                    </Text>{" "}
                                    or call at{" "}
                                    <Text className="flex-row items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
                                        +234 808-34-5492
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
{
    /* <Button onPress={() => router.replace("(home)")}>
          <Text className="text-center text-base px-4 w-full font-semibold">
            Close
          </Text>
        </Button> */
}
export default CouponValidated;

const styles = StyleSheet.create({});
