import {
    Alert,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import {
    FontAwesome5,
    MaterialIcons,
    MaterialCommunityIcons,
    Entypo,
    FontAwesome,
} from "@expo/vector-icons";
import React, { FC, useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import Button from "../Button";
import { BlurView } from "expo-blur";
import Input from "../Input";
import { useRouter } from "expo-router";
import { USER_TYPE } from "../../utils/types";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import CouponAPIManager from "../../services/coupon";
import ValidateDialog from "../Coupon/ValidateCoupon";
import RecentActivities from "../Coupon/RecentActivities";
import StatementModal from "../Coupon/StatementModal";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

interface IDash {
    reload?: Boolean;
}

const Station: FC<IDash> = ({ reload }: IDash) => {
    const swipeRef = useRef<FlashList<number> | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [showStatement, setShowStatement] = useState(false);
    const router = useRouter();
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [yearlyCoupon, setYealyCoupon] = useState(0);
    const [monthlyCoupon, setMonthlyCoupon] = useState(0);
    const [dailylyCoupon, setDailylyCoupon] = useState(0);
    useEffect(() => {
        fetchMontlyCoupon();
        fetchYearlyCoupon();
        fetchDailyCoupon();
    }, [reload]);

    const fetchMontlyCoupon = async () => {
        const res: any = await new CouponAPIManager().getCouponMontly();
        setMonthlyCoupon(res.data);
    };
    const fetchDailyCoupon = async () => {
        const res: any = await new CouponAPIManager().getCouponDaily();
        setDailylyCoupon(res.data);
    };
    const fetchCoupon = async () => {
        const res: any = await new CouponAPIManager().getCoupons();
    };

    const fetchYearlyCoupon = async () => {
        const res: any = await new CouponAPIManager().getCouponYearly();
        setYealyCoupon(res.data);
    };

    const menu = [
        {
            title: "Validate Coupon",
            Icon: (
                <MaterialCommunityIcons
                    name="file-check"
                    size={24}
                    color="blue"
                />
            ),
            bg: "bg-blue-100",
            action: () => {
                setDialogVisible((dialogVisible) => true);
            },
        },
        {
            title: "Recent Activities",
            Icon: <Entypo name="back-in-time" size={24} color="green" />,
            bg: "bg-green-100",
            action: () => {
                router.push("(coupon)/activities");
            },
        },
        {
            title: "Generate Statement",
            Icon: <FontAwesome5 name="receipt" size={18} color="#CC9933" />,
            bg: "bg-orange-100",
            action: () => {
                setShowStatement(true);
            },
        },
    ];

    const balances = [
        {
            title: "Recent Activities",
        },
        {
            title: "Generate Statement",
            Icon: <FontAwesome5 name="receipt" size={18} color="#CC9933" />,
            bg: "bg-orange-100",
            action: () => {
                setDialogVisible((dialogVisible) => true);
            },
        },
    ];

    const openDialog = () => {
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
    };

    const validatedCoupons = [
        {
            duration: "Coupons Validated Here Today",
            amount: dailylyCoupon,
            sub: "",
        },
        {
            duration: "MTD Coupons",
            amount: monthlyCoupon,
            sub: "Month-to-Date",
        },
        {
            duration: "YTD Coupons",
            amount: yearlyCoupon,
            sub: "Year-to-Date",
        },
    ];

    return (
        <SafeAreaView className="">
            <ValidateDialog visible={dialogVisible} onClose={closeDialog} />
            {showStatement && (
                <StatementModal
                    visible={showStatement}
                    onClose={() => setShowStatement(false)}
                />
            )}

            <View className="h-screen w-screen">
                <View className="w-full flex justify-center items-center h-[18vh] px-3 mt-3">
                    <View className=" w-[100%] flex justify-center items-center rounded-lg mx-2 overflow-hidden h-full bg-white -dark:bg-gray-800 ">
                        <View className="">
                            <Text className="text-black -dark:text-white font-bold text-sm text-center ">
                                wallet Balnce
                            </Text>
                            <Text className="text-black -dark:text-white font-bold text-3xl text-center mb-4">
                                NGN {user.wallet?.amount}
                            </Text>
                        </View>
                    </View>
                    {/* <FlashList
                        data={validatedCoupons}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className=" w-[82vw] flex justify-center items-center rounded-lg mx-2 overflow-hidden h-full bg-white -dark:bg-gray-800 ">
                                <View className="">
                                    <Text className="text-black -dark:text-white font-bold text-3xl text-center mb-4">
                                        NGN {item.amount}
                                    </Text>
                                    <Text className="text-black -dark:text-white font-bold text-sm text-center ">
                                        {item.duration}{" "}
                                    </Text>
                                    {item.sub && (
                                        <Text className="text-black -dark:text-white font-bold text-sm text-center ">
                                            ({item.sub}){" "}
                                        </Text>
                                    )}
                                </View>
                               
                            </View>
                        )}
                        estimatedItemSize={6}
                        horizontal
                    /> */}
                </View>
                <View className="px-2 pt-5 rounded-2xl">
                    <View
                        style={{
                            backgroundColor: "#ddd",
                            padding: 10,
                            width: "100%",
                        }}
                    >
                        <Text className="text-black text-xs text-center my-5 font-bold ">
                            Coupon Validated Here today
                        </Text>
                        <Text className="text-black font-bold text-[20px] text-center mb-5">
                            NGN {dailylyCoupon}
                        </Text>
                    </View>
                </View>
                <View className="w-screen h-auto flex flex-row flex-wrap justify-between mt-6 px-2">
                    <View
                        className={`bg-[#ddd] w-[48%] rounded-lg overflow-hidden flex justify-evenly items-center py-4 px-2 mb-2 `}
                    >
                        <Text className="text-black text-xs text-center mb-5 font-bold">
                            MTD Coupons
                        </Text>
                        <Text className="text-black font-bold text-[20px] text-center mb-5">
                            NGN {monthlyCoupon}
                        </Text>
                    </View>
                    <View
                        className={`bg-[#ddd] w-[48%] rounded-lg overflow-hidden flex justify-evenly items-center py-4 px-2 mb-2 `}
                    >
                        <Text className="text-black text-xs text-center mb-5 font-bold">
                            YTD Coupons
                        </Text>
                        <Text className="text-black font-bold text-[20px] text-center mb-5">
                            NGN {yearlyCoupon}
                        </Text>
                    </View>
                </View>
                <View className="w-screen h-auto flex flex-row flex-wrap justify-between mt-6 px-2">
                    {menu.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.3}
                            className={`${item.bg} w-[31.5%] rounded-lg overflow-hidden flex justify-evenly items-center py-4 px-2 mb-2 `}
                            key={item.bg + index}
                            onPress={() => item?.action()}
                        >
                            <View className="mb-5">{item.Icon}</View>
                            <Text className="text-black font-bold text-xs text-center">
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="w-full px-3  mt-5">
                    <Text className="text-black -dark:text-white text-base font-semibold">
                        Recent Activities Log
                    </Text>
                </View>
                <RecentActivities />
                <View style={{ marginBottom: 50 }} />
            </View>
        </SafeAreaView>
    );
};

export default Station;

const styles = StyleSheet.create({});
