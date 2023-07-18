import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

import Input from "../components/Input";
import Button from "../components/Button";

const GenerateCoupon = () => {
    const [selectedCar, setSelectedCar] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedDriver, setSelectedDriver] = useState();
    const colorScheme = useColorScheme();

    const router = useRouter();
    return (
        <View className="p-4">
            <View className="mb-4">
                <Text className="text-black  -dark:text-white mb-2">
                    Select Vehicle
                </Text>
                <View className="border border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden h-10  justify-center">
                    <Picker
                        selectedValue={selectedCar}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCar(itemValue)
                        }
                        style={{
                            color: colorScheme === "dark" ? "white" : "black",
                        }}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="KUJ 454 EL" value="KUJ454EL" />
                        <Picker.Item label="ABJ 983 DS" value="ABJ983DS" />
                        <Picker.Item label="LGS 765 YG" value="LGS765YG" />
                    </Picker>
                </View>
            </View>
            <View className="border border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden h-10 mb-4 justify-center px-4">
                <Text className="text-black  -dark:text-white text-base mb-2">
                    Black Mercedes Benz GLK
                </Text>
            </View>
            <View className="mb-4">
                <Text className="text-black  -dark:text-white mb-2">
                    Product
                </Text>
                <View className="border border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden h-10  justify-center">
                    <Picker
                        selectedValue={selectedProduct}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedProduct(itemValue)
                        }
                        style={{
                            color: colorScheme === "dark" ? "white" : "black",
                        }}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="PMS" value="PMS" />
                        <Picker.Item label="Diesel" value="Diesel" />
                        <Picker.Item label="LPG" value="LPG" />
                    </Picker>
                </View>
            </View>
            <View className="mb-4">
                <Text className="text-black  -dark:text-white mb-2">
                    Select Driver
                </Text>
                <View className="border border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden h-10  justify-center">
                    <Picker
                        selectedValue={selectedDriver}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedDriver(itemValue)
                        }
                        style={{
                            color: colorScheme === "dark" ? "white" : "black",
                        }}
                        dropdownIconColor="white"
                    >
                        <Picker.Item label="Barau Friday" value="BarauFriday" />
                        <Picker.Item
                            label="Bernado slate"
                            value="Bernadoslate"
                        />
                        <Picker.Item label="Salako nid" value="Salakonid" />
                    </Picker>
                </View>
            </View>
            <Input
                label="Amount"
                placeholder="Enter Value in Naira"
                keyboardType="number-pad"
            />
            <Button onPress={() => router.replace("coupon-success")}>
                <Text className="text-center font-semibold text-base">
                    Generate Code
                </Text>
            </Button>
        </View>
    );
};

export default GenerateCoupon;

const styles = StyleSheet.create({});
