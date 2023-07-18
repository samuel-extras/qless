import {
    Alert,
    Modal,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

import Button from "../Button";
import { BlurView } from "expo-blur";
import Input from "../Input";
import { useRouter } from "expo-router";

import CouponAPIManager from "../../services/coupon";
import { ActivityIndicator } from "react-native";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

const ValidateDialog = ({ visible, onClose }: ModalProps) => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [code, setCode] = useState();
    const [loader, setLoader] = useState<boolean>(false);

    const validateCoupon = async () => {
        setLoader(true);
        const res: any = await new CouponAPIManager().validateCoupon({ code });
        setLoader(false);

        if (!res.success) {
            Alert.alert("Message", res.message || "something went wrong");
            return;
        }

        onClose();
        router.push("coupon-validated");
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <BlurView
                tint={colorScheme || "default"}
                intensity={90}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    // activeOpacity={1}
                    className=" absolute inset-0 w-screen h-screen -z-10 bg-[red]"
                    onPress={onClose}
                ></TouchableOpacity>
                <View className="w-full p-4 z-1">
                    <View className="pointer-events-none bg-white -dark:bg-gray-800 px-5 py-10 rounded-md w-full">
                        <Text className="text-xl font-bold mb-3 text-black -dark:text-white">
                            VALIDATE COUPON{" "}
                        </Text>
                        <TouchableOpacity
                            style={{
                                right: 20,
                                position: "absolute",
                                padding: 10,
                            }}
                            // activeOpacity={1}
                            className=" absolute -z-10  "
                            onPress={onClose}
                        >
                            <FontAwesome name="times" size={15} />
                        </TouchableOpacity>
                        <Text className="mb-5 text-black -dark:text-white">
                            Validate customer's Coupon Code (10-characters)
                        </Text>
                        <Input
                            label="Enter Coupon"
                            onChangeText={(e: any) => setCode(e)}
                        />
                        <Button
                            onPress={() => {
                                validateCoupon();
                                // onClose();
                                // router.push("coupon-validated");
                            }}
                        >
                            {loader ? (
                                <ActivityIndicator color={"white"} />
                            ) : (
                                <Text className="text-center text-base font-semibold">
                                    Validate
                                </Text>
                            )}
                        </Button>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default ValidateDialog;
