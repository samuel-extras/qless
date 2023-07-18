import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface IC {
    data?: any;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const CouponDetails: FC<IC> = ({ data, onCancel, onConfirm }: IC) => {
    return (
        <Modal visible={data ? true : false} transparent>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View className=" bg-gray-200 border-gray-300 -dark:border-gray-600 rounded-lg overflow-hidden mb-4 justify-center px-4 gap-y-2 py-2 ">
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Coupon
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.code}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Amount
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                #{data?.amount}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Driver Name
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.driver}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Vehicle Number
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.vehicle_number}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Vehicle Name
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.vehicle_name}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Product
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.product}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Status
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.status}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Date
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {new Date(data?.created_at).toDateString()}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Station Name
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.station_name}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Station Address
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.station_address}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Station City
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.station_city}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>Copy Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
        backgroundColor: "rgb(229,231,235)",
        borderRadius: 10,
        // alignItems: "center",
        overflow: "hidden",
        padding: 10,
        marginHorizontal: 30,
        width: "90%",
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#FFA500",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default CouponDetails;
