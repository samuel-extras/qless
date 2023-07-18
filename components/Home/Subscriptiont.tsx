import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { FC, useEffect, useState } from "react";
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import HomeAPIManager from "../../services/home";
import { toast } from "../../utils";
import Button from "../Button";
import Input from "../Input";

interface IFM {
    visible?: boolean;
    handleClose?: () => void;
    handleSubmit?: () => void;
    onChange?: (e: string) => any;
    handleDone: (e: any) => void;
}

const DATA = [
    {
        title: "VVIP",
        price: 20000,
        benefits: [
            "Q-Less VVIP Membership Access Card",
            "VVIP Access Card to all partner stations",
            "10 of partner stations",
            "All Our LPG Gas Outlets (List to be provided).",
            "Free Car Wash Twice a month at our partner car wash",
        ],
    },
    {
        title: "VIP",
        price: 10000,
        benefits: [
            "Q-Less VIP Membership Access Card",
            "Access to 6 partner stations",
            "Access to LPG Gas Outlets (List to be provided).",
            "Free Car Wash once a month at our partner car wash",
        ],
    },
    {
        title: "REGULAR",
        price: 5000,
        benefits: [
            "Q-Less REGULAR Membership Access Card",
            "Access to 3 partner stations",
            "All Our LPG Gas Outlets (List to be provided).",
        ],
    },
];

type PLAN_TYPE = {
    amount?: string;
    benefit?: BEN_TYPE;
    name?: string;
    station?: string;
    id?: string;
};

type BEN_TYPE = {
    content?: string;
    plan_id?: number;
};

const Subscription: FC<IFM> = ({
    visible,
    handleClose,
    handleSubmit,
    onChange,
    handleDone,
}: IFM) => {
    const [plans, setPlans] = useState<Array<PLAN_TYPE>>([]);
    useEffect(() => {
        handleOnload();
    }, []);

    const handleOnload = async () => {
        const res: any = await new HomeAPIManager().getPlans();

        if (!res.success) {
            toast(res.message);
            return;
        }

        setPlans(res.data);
    };
    const handleSub = async (payload: any) => {
        const res: any = await new HomeAPIManager().subscribe(payload);

        // if (!res.success) {
        //     toast(res.message);
        //     return;
        // }
        handleDone(res);

        // setPlans(res.data);
    };
    const colorScheme = useColorScheme();
    return (
        <Modal
            visible={visible}
            animationType="slide"
            statusBarTranslucent={true}
        >
            <TouchableOpacity
                style={{
                    paddingTop: 40,
                    paddingHorizontal: 10,
                    right: 20,
                    position: "absolute",
                    top: 25,
                    zIndex: 1,
                }}
                onPress={handleClose}
            >
                <FontAwesome name="times" size={20} />
            </TouchableOpacity>

            <SafeAreaView>
                <View className="h-screen w-screen px-4 pt-24  mb-50 bg-slate-100 ">
                    <FlashList
                        data={plans}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className=" w-full rounded-lg bottom-1 pb-5 overflow-hidden min-h-40 mb-4 bg-white -dark:bg-gray-900 ">
                                <View className="flex flex-row justify-between">
                                    <View className="bg-[#CC9933] px-3  flex flex-row items-center justify-between">
                                        <Text className="text-white font-bold text-xl ">
                                            {item.name}
                                        </Text>
                                        <Text className="text-sm text-white">
                                            {" "}
                                            @
                                        </Text>
                                        <View className="ml-2">
                                            <Text className="font-bold text-lg text-white">
                                                N{item.amount}
                                            </Text>
                                            <Text className="text-sm font-medium">
                                                Monthly
                                            </Text>
                                        </View>
                                    </View>
                                    <View></View>
                                </View>
                                <View className="px-3 pt-1">
                                    <Text className="text-[#aaa] text-lg font-semibold">
                                        Beneﬁts:
                                    </Text>
                                    {(item as any).benefit.map(
                                        ({ content }: BEN_TYPE) => (
                                            <View
                                                key={content}
                                                className="flex flex-row items-center mb-1"
                                            >
                                                <Entypo
                                                    name="dot-single"
                                                    size={18}
                                                    color={
                                                        colorScheme === "dark"
                                                            ? "white"
                                                            : "black"
                                                    }
                                                />
                                                <Text className="text-black -dark:text-white flex flex-row items-center">
                                                    {content}
                                                </Text>
                                            </View>
                                        )
                                    )}
                                </View>
                                <View className="px-20 mb-2">
                                    <Button
                                        onPress={() =>
                                            handleSub({
                                                plan_id: item.id,
                                                plan_name: item.name,
                                            })
                                        }
                                    >
                                        <Text className="text-center text-base text-white font-semibold">
                                            Subscribe
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        )}
                        estimatedItemSize={6}
                        contentContainerStyle={{ paddingBottom: 120 }}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default Subscription;
