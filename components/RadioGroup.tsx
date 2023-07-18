import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import React, { FunctionComponent, ReactNode } from "react";
import { BlurView } from "expo-blur";
import Checkbox from "./Checkbox";

interface RadioGroupProps {
    Icon?: any;
    title?: string;
    subTitle?: string;
    checked?: boolean;
    onChecked?: () => void;
}

const RadioGroup = ({
    Icon,
    title,
    subTitle,
    checked,
    onChecked,
}: RadioGroupProps) => {
    const colorScheme = useColorScheme();

    return (
        <TouchableOpacity className="flex flex-row bg-gray-300  items-center justify-between py-4 px-10 mt-3 rounded-md mx-auto w-full">
            <View className="flex flex-row gap-4">
                <View className="bg-[#CC9933] p-1.5 rounded-full h-10 w-10 flex justify-center items-center">
                    {Icon}
                </View>
                <View className="">
                    <Text className="text-black -dark:text-white text-base font-bold">
                        {title}{" "}
                    </Text>
                    <Text className="text-[#CC9933] font-semibold text-base">
                        {subTitle}{" "}
                    </Text>
                </View>
            </View>
            <View>
                <Checkbox checked={checked} onChecked={onChecked} />
            </View>
        </TouchableOpacity>
    );
};

export default RadioGroup;

const styles = StyleSheet.create({});
