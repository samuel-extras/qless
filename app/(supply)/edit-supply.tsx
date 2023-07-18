import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    useColorScheme,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    DatePickerIOSBase,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { StatusBar } from "react-native";
import Loader from "../../components/loader";

import {
    checkError,
    formValidation,
    isError,
} from "../../utils/formValidation";
import { toast } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { USER_TYPE } from "../../utils/types";

import { TextInput } from "react-native-paper";
import SupplyAPIManager from "../../services/supply";
import DatePicker from "../../components/DatePicker";
import Message from "../../components/Message";
import Picker from "../../components/Shared/SelectInput";

type SupplyT = {
    amount?: string;
    product?: string;
    supply_date?: string | Date;
    contact?: string;
    address?: string;
    comment?: string;
};

const EditSupply = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [formData, setFormData] = useState<SupplyT>({
        address: "",
        amount: "",
        comment: "",
        contact: "",
        product: "",
        supply_date: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [serverRes, setServerRes] = useState<{
        message?: string;
        success?: boolean;
    }>({});
    const [showMessage, setShowMessage] = useState(false);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        handleFecth();
    }, [id]);
    const handleFecth = async (page?: number) => {
        setLoader(true);
        const res: any = await new SupplyAPIManager().getSupply(id as any);
        setLoader(false);
        setFormData(res.data);
        if (!res.success) {
            toast(res.message);
            return;
        }
    };

    const handleChange = (value: string, name: string) => {
        const isValid = formValidation(name, value);
        setErrors({ ...errors, [name]: !isValid });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const checkErrors = checkError(formData);
        setErrors(checkErrors);
        if (isError(checkErrors)) return;
        setLoader(true);

        setLoader(true);

        const res: any = await new SupplyAPIManager().editSupply(id, formData);
        setLoader(false);

        setServerRes({
            ...res,
            message: res.success
                ? res.message || "Successfully Edited"
                : res.message,
        });

        setShowMessage(true);
        // if (!res.success) {
        //     toast(res.message);
        //     return;
        // }
        // toast(res.message);
        // router.back();
        // await storeData(CONSTANT.USER_TOKEN, res?.token);

        // setUser({ ...res?.user, token: res?.token });
        // router.replace("/(home)");
    };

    const handleClose = () => {
        setShowMessage(false);
        if (serverRes.success) {
            setTimeout(() => {
                router.back();
            }, 100);
        }
    };

    let index = 0;
    const products = [
        { key: index++, label: "PMS", value: "PMS" },
        {
            key: index++,
            label: "DPK",
            value: "DPK",
        },
        { key: index++, label: "AGO", value: "AGO" },
    ];
    return (
        <>
            {loader && <Loader />}
            <Message
                message={serverRes.message}
                success={serverRes.success}
                visible={showMessage}
                handleClose={handleClose}
            />
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inner}>
                                <LinearGradient
                                    className="w-full flex justify-center items-center h-36 bg-gradient-to-r rounded-b-xl"
                                    colors={["#CC9933", "#926f34"]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                                >
                                    <Text className="font-bold text-lg text-black mt-2">
                                        Edit a supply
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 mt-6 ">
                                    <Picker
                                        data={products}
                                        onChange={(e) =>
                                            handleChange(e.value, "product")
                                        }
                                        placeholder={"Select Product"}
                                        label="Select Product"
                                        error={errors?.product}
                                        message={"Select a Product"}
                                        value={formData?.product}
                                    />

                                    <Input
                                        onChangeText={(e) =>
                                            handleChange(e, "amount")
                                        }
                                        label="Amount"
                                        placeholder="Enter Amount"
                                        value={formData?.amount}
                                        keyboardType="decimal-pad"
                                        error={errors?.amount}
                                        message={"Enter a valid amount"}
                                    />

                                    <DatePicker
                                        onChange={(e: any) =>
                                            handleChange(
                                                new Date(e)
                                                    ?.toISOString()
                                                    ?.slice(0, 10),
                                                "supply_date"
                                            )
                                        }
                                        value={
                                            formData.supply_date
                                                ? new Date(formData.supply_date)
                                                : new Date()
                                        }
                                    />

                                    <Input
                                        onChangeText={(e) =>
                                            handleChange(e, "contact")
                                        }
                                        label="Contact"
                                        placeholder="09033221100"
                                        keyboardType="phone-pad"
                                        value={formData?.contact}
                                        error={errors?.contact}
                                        message={"Enter a valid contact"}
                                    />
                                    <Input
                                        onChangeText={(e) =>
                                            handleChange(e, "address")
                                        }
                                        label="Address"
                                        placeholder="Enter Address"
                                        value={formData?.address}
                                        error={errors?.address}
                                        message={"Enter a valid address"}
                                    />

                                    <Text className="block text-sm mb-1.5 font-medium text-gray-900 -dark:text-white">
                                        Comment
                                    </Text>
                                    <TextInput
                                        value={formData?.comment}
                                        onChangeText={(e) =>
                                            handleChange(e, "comment")
                                        }
                                        multiline={true}
                                        numberOfLines={4}
                                        style={{}}
                                        placeholderTextColor="gray"
                                        className={`bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#CC9933] 
                        "focus:border-[red]" : "focus:border-[#CC9933]"
                    }  block w-full px-3 -dark:bg-transparent -dark:border-gray-600 -dark:placeholder-gray-400 -dark:text-white -dark:focus:ring-[#CC9933] -dark:focus:border-[#CC9933]`}
                                    />
                                    <View>
                                        <Button onPress={handleSubmit}>
                                            <Text className="text-center text-base text-white font-semibold">
                                                Edit
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom:
                                            Dimensions.get("screen").height / 7,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    inner: {
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default EditSupply;
