import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface IC {
    data?: any;
    onCancel?: () => void;
    onConfirm?: () => void;
    onEdit?: () => void;
}

const SupplyDetails: FC<IC> = ({ data, onCancel, onConfirm, onEdit }: IC) => {
    return (
        <Modal visible={data ? true : false} transparent>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View className=" bg-gray-200 border-gray-300 -dark:border-gray-600 rounded-lg overflow-hidden mb-4 justify-center px-4 gap-y-2 py-2 ">
                        <View className="flex flex-row justify-between border-b border-[#aaa] pb-3">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold ">
                                Product
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right">
                                {data?.product}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-[#aaa] pb-3 border-b">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Amount
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right ">
                                #{data?.amount}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-[#aaa] pb-3 border-b">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Pickup Date
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right ">
                                {new Date(data?.supply_date).toDateString()}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-[#aaa] pb-3 border-b">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Address
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right ">
                                {data?.address}
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between border-[#aaa] pb-3 border-b">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Contact
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right ">
                                {data?.contact}
                            </Text>
                        </View>

                        <View className="flex flex-row justify-between border-[#aaa] pb-3 border-b">
                            <Text className="text-gray-600 -dark:text-white text-base font-semibold  ">
                                Status
                            </Text>
                            <Text className="text-gray-700 -dark:text-white text-base w-2/3 text-right ">
                                {data?.status?.toUpperCase()}
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
                            onPress={onEdit}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: "red" }]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
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

export default SupplyDetails;
