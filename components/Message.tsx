import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import React, { FC, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import Button from "./Button";

interface IFM {
    visible?: boolean;
    handleClose?: () => void;
    handleSubmit?: () => void;

    success?: boolean;
    message?: string;
}

const Message: FC<IFM> = ({ visible, handleClose, success, message }: IFM) => {
    const animation = useRef(null);
    const router = useRouter();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            statusBarTranslucent={true}
        >
            <View className="flex-1 justify-center gap-y-24 items-center p-14">
                <View className="items-center">
                    <View
                        className={`${
                            !success && "bg-red-500"
                        } rounded-full items-center justify-center h-20 w-20`}
                    >
                        <AnimatedLottieView
                            loop={false}
                            autoPlay
                            style={{
                                width: 160,
                                height: 160,
                            }}
                            colorFilters={[]}
                            ref={animation}
                            resizeMode="contain"
                            source={
                                success
                                    ? require("../assets/mark-success.json")
                                    : require("../assets/exclamation-mark.json")
                            }
                        />
                    </View>
                    <Text className="font-bold text-sm text-black -dark:text-white mt-20">
                        {message
                            ? message
                            : "Something went wrong, Pls try again later"}
                    </Text>
                </View>
                <View className="w-full items-center">
                    {/* <View className="flex flex-row w-full justify-center gap-2 pt-3 px-1 mb-10">
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
                            <Text className="text-black font-medium">
                                Retry
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                    <TouchableOpacity
                        className="rounded-full overflow-hidden mt-4 w-full"
                        onPress={handleClose}
                    >
                        <LinearGradient
                            colors={[
                                `${success ? "#00ff00" : "#CC9933"}`,
                                `${success ? "#3db489" : "#926f34"}`,
                            ]}
                            start={[0, 1]}
                            end={[1, 0]}
                            className="py-2"
                        >
                            <Text className="text-center text-base text-white px-4 w-full font-semibold">
                                Close
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default Message;
