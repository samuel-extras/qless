import {
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
    FontAwesome5,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { FC, useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import PaystackC from "./Paystack";
import FundModal from "./FundModal";
import Subscription from "./Subscriptiont";
import { toast } from "../../utils";
import Message from "../Message";
import { useRecoilState } from "recoil";
import { USER_TYPE } from "../../utils/types";
import { userState } from "../../atoms/users";
import Swiper from "react-native-swiper";

interface IDash {
    reload?: Boolean;
}

const USerDashboard: FC<IDash> = ({ reload }: IDash) => {
    const swipeRef = useRef<FlashList<number> | null>(null);
    const router = useRouter();
    const [fundModalVisible, setFundModalVisible] = useState(false);
    const [paystacklVisible, setPastackVisible] = useState(false);
    const [fundAmount, setFundAmount] = useState("0");
    const [subModal, setSubModal] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [subRes, setSubRes] = useState<{
        message?: string;
        success?: boolean;
    }>({});

    const DATA = [
        {
            title: "Subscribe",
            Icon: <FontAwesome5 name="wallet" size={18} color="blue" />,
            bg: "bg-blue-100",
            image: "https://images.unsplash.com/photo-1643297551026-f97c5e6747e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmlsbGluZyUyMHN0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            action: () => {
                // router.push("transaction-pin");
                setSubModal(true);
            },
        },
        {
            title: "Generate Coupon",
            Icon: (
                <MaterialIcons
                    name="confirmation-number"
                    size={22}
                    color="green"
                />
            ),
            bg: "bg-green-100",
            image: "https://plus.unsplash.com/premium_photo-1663091857655-e0fac4ca7814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGZpbGxpbmclMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            action: () => {
                // router.push("(coupon)/generate");
                if (user.pin) {
                    router.push("/verify-pin");
                    return;
                }
                Alert.alert(
                    "Notification 🔔 ",
                    "Please set a trasactin pin before proceeding"
                );
            },
        },
        {
            title: "Manage Fleet",
            Icon: <FontAwesome5 name="car" size={18} color="#CC9933" />,
            bg: "bg-yellow-50",
            image: "https://images.unsplash.com/photo-1593181520415-5d48196b5ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGZpbGxpbmclMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            action: () => {
                router.push("(fleet)/fleets");
            },
        },
        {
            title: "Transaction Statement",
            Icon: <FontAwesome5 name="receipt" size={18} color="purple" />,
            bg: "bg-violet-100",
            image: "https://plus.unsplash.com/premium_photo-1661598334703-c970f96ff584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fGZpbGxpbmclMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            action: () => {
                router.push("(coupon)/report");
            },
        },
        {
            title: "Supply Me Product",
            Icon: (
                <MaterialCommunityIcons
                    name="truck-delivery"
                    size={18}
                    color="orange"
                />
            ),
            bg: "bg-orange-100",
            image: "https://images.unsplash.com/photo-1678983620241-f20e8c230db7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTQzfHxmaWxsaW5nJTIwc3RhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            action: () => {
                router.push("(supply)/supplies");
            },
        },
        {
            title: "Go Fuel-For-Me",
            Icon: (
                <MaterialCommunityIcons
                    name="swap-vertical-bold"
                    size={22}
                    color="gray"
                />
            ),
            bg: "bg-slate-200",
            image: "https://plus.unsplash.com/premium_photo-1674375348357-a25140a68bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGNhciUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            action: () => {
                router.push("(gffm)/gffms");
            },
        },
    ];

    useEffect(() => {
        let index = 0;
        setInterval(() => {
            index = index >= DATA.length - 1 ? 0 : index + 1;
            swipeRef?.current?.scrollToIndex({ index, animated: true });
        }, 4000);
    }, []);
    const handlePayNow = () => {
        setFundModalVisible(false);
        setPastackVisible(true);
    };

    const handleDone = (e: any) => {
        setSubRes(e);
        setShowMessage(true);
        setSubModal(false);
    };

    return (
        <SafeAreaView>
            {paystacklVisible && (
                <PaystackC
                    amount={fundAmount}
                    onCancel={() => setPastackVisible(false)}
                    onSuccess={() => setPastackVisible(false)}
                />
            )}
            {fundModalVisible && (
                <FundModal
                    visible={fundModalVisible}
                    handleSubmit={handlePayNow}
                    onChange={(e: any) => setFundAmount(e)}
                    handleClose={() => setFundModalVisible(false)}
                />
            )}
            {subModal && (
                <Subscription
                    visible={subModal}
                    handleClose={() => setSubModal(false)}
                    handleDone={handleDone}
                />
            )}
            <Message
                message={subRes.message}
                success={subRes.success}
                visible={showMessage}
                handleClose={() => setShowMessage(false)}
            />
            <View className="mb-10 group">
                <View className="w-full flex justify-center items-center h-[22vh] px-3 mt-3">
                    <View className=" w-full rounded-lg overflow-hidden h-full bg-white -dark:bg-gray-900 py-6  ">
                        <View className="">
                            <Text className="text-black -dark:text-white font-bold text-sm text-center mb-2 group-hover:block">
                                Available Balance{" "}
                            </Text>
                            <Text className="text-black -dark:text-white font-bold text-xl text-center">
                                NGN {user.wallet?.amount}
                            </Text>
                        </View>
                        <Pressable
                            onPress={() => setFundModalVisible(true)}
                            className="bg-[#CC9933] flex items-center justify-center w-8 h-8 rounded-full shadow absolute right-3 bottom-3"
                        >
                            <FontAwesome5 name="plus" size={20} color="white" />
                        </Pressable>
                    </View>
                </View>
                <View className="w-screen h-auto flex flex-row flex-wrap justify-between mt-6 px-2">
                    {DATA.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.3}
                            className={`${item.bg} w-[31.5%] rounded-lg overflow-hidden flex justify-evenly items-center py-4 px-2 mb-2 `}
                            key={item.bg + index}
                            onPress={item.action}
                        >
                            <View className="mb-5">{item.Icon}</View>
                            <Text className="text-black font-bold text-xs text-center">
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="w-full h-52 mt-3">
                    <Swiper autoplay={true}>
                        {DATA.map((item, i) => (
                            <View
                                key={i}
                                className=" w-[95%] rounded-lg mx-2 overflow-hidden h-full bg-white -dark:bg-gray-900 "
                            >
                                <Image
                                    className="w-full h-full"
                                    alt="images"
                                    source={{ uri: item?.image }}
                                />
                            </View>
                        ))}
                    </Swiper>
                    {/* <FlashList
                        ref={swipeRef as any}
                        data={DATA}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className=" w-[82vw] rounded-lg mx-2 overflow-hidden h-full bg-white -dark:bg-gray-900 ">
                                <Image
                                    className="w-full h-full"
                                    alt="images"
                                    source={{ uri: item?.image }}
                                />
                            </View>
                        )}
                        estimatedItemSize={6}
                        horizontal
                    /> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default USerDashboard;

const styles = StyleSheet.create({});
