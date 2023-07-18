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
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/images/blackLogo.png";
import { StatusBar } from "react-native";
import Loader from "../../components/loader";
import AuthAPIManager from "../../services/auth";
import {
    checkError,
    formValidation,
    isError,
} from "../../utils/formValidation";
import { toast } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { COUPON_TYPE, USER_TYPE } from "../../utils/types";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import FleetAPIManager from "../../services/fleet";
import SelectInput from "../../components/Shared/SelectInput";
import CouponAPIManager from "../../services/coupon";
import { couponState } from "../../atoms/coupon";

type CouponT = {
    amount?: string;
    driver_name?: string;
    product?: string;
};

const GenerateCoupon = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [formData, setFormData] = useState<CouponT>({
        amount: "",
        driver_name: "",
        product: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [vehicles, setVehicles] = useState([]);
    const [stations, setStations] = useState([]);
    const [vehicle, setVehicle] = useState<any>();
    const [station, setStation] = useState<any>();
    const [product, setProduct] = useState("");
    const [coupon, setCoupon] = useRecoilState<COUPON_TYPE>(couponState);

    useEffect(() => {
        fetchVehicle();
        fetchStations();
    }, []);

    const handleChange = (value: string, name: string) => {
        const isValid = formValidation(name, value);
        setErrors({ ...errors, [name]: !isValid });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            //handle Error
            const checkErrors = checkError({
                ...formData,
                station_id: station?.id,
                vehicles_id: vehicle?.id,
            });
            setErrors(checkErrors);
            if (isError(checkErrors)) return;
            //
            const payload = {
                vehicles_id: vehicle.id,
                station_id: station.id,
                amount: formData?.amount,
                driver_name: formData?.driver_name,
                vehicle_number: vehicle.vehicle_number,
                vehicle_name: vehicle.vehicle_name,
                station_name: station.name,
                product: formData.product,
            };

            setLoader(true);
            const res: any = await new CouponAPIManager().createCoupon(payload);
            setLoader(false);

            if (!res.success) {
                // router.replace("/(home)");
                Alert.alert("Faild", res.message);
                return;
            }
            Alert.alert("Success", res.message);

            setCoupon(res.data);
            router.replace("/(coupon)/success");
        } catch (error) {
            console.log({ error });
        }
    };

    const fetchVehicle = async () => {
        const res: any = await new FleetAPIManager().getFleets(
            "?per_page=2000"
        );
        const allVehicles = res?.data?.data || [];

        const data = allVehicles.map((e: any, i: number) => ({
            key: i,
            label: e.vehicle_name,
            value: e,
        }));

        setVehicles(data);
    };

    const fetchStations = async () => {
        const res: any = await new CouponAPIManager().getStations();
        const allStations = res?.data || [];

        const data = allStations.map((e: any, i: number) => ({
            key: i,
            label: e.name,
            value: e,
        }));

        setStations(data);
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
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView style={{ marginBottom: 50 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inner}>
                                <LinearGradient
                                    className="w-full flex justify-center items-center h-36 bg-gradient-to-r rounded-b-xl"
                                    colors={["#CC9933", "#926f34"]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                                >
                                    <Text className="font-bold text-lg text-black mt-2">
                                        Generate Coupon
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 mt-6 ">
                                    <SelectInput
                                        data={vehicles}
                                        onChange={(e) => setVehicle(e.value)}
                                        placeholder={"Select Vehicle"}
                                        label="Select Vehicle"
                                        message="Select a vehicle"
                                        error={
                                            errors?.vehicles_id && !vehicle?.id
                                        }
                                    />
                                    {vehicle && (
                                        <View className=" bg-gray-200 border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden mb-4 justify-center px-4 gap-y-2 py-2">
                                            <View className="flex flex-row justify-between">
                                                <Text className="text-gray-600  -dark:text-white text-base font-semibold  ">
                                                    Name
                                                </Text>
                                                <Text className="text-gray-700  -dark:text-white text-base ">
                                                    {vehicle?.vehicle_name}
                                                </Text>
                                            </View>
                                            <View className="flex flex-row justify-between">
                                                <Text className="text-gray-600  -dark:text-white text-base font-semibold  ">
                                                    Number
                                                </Text>
                                                <Text className="text-gray-700  -dark:text-white text-base ">
                                                    {vehicle?.vehicle_number}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    <SelectInput
                                        data={stations}
                                        onChange={(e) => setStation(e.value)}
                                        placeholder={"Select Station"}
                                        label="Select Station"
                                        message="Select a Station"
                                        error={
                                            errors?.station_id && !station?.id
                                        }
                                    />
                                    {station && (
                                        <View className=" bg-gray-200 border-gray-300  -dark:border-gray-600 rounded-lg overflow-hidden mb-4 justify-center px-4 gap-y-2 py-2">
                                            <View className="flex flex-row justify-between">
                                                <Text className="text-gray-600  -dark:text-white text-base font-semibold  ">
                                                    Name
                                                </Text>
                                                <Text className="text-gray-700  -dark:text-white text-base ">
                                                    {station?.name}
                                                </Text>
                                            </View>
                                            <View className="flex flex-row justify-between">
                                                <Text className="text-gray-600  -dark:text-white text-base font-semibold  ">
                                                    Address
                                                </Text>
                                                <Text className="text-gray-700  -dark:text-white text-base ">
                                                    {station?.adress || "---"}
                                                </Text>
                                            </View>
                                            <View className="flex flex-row justify-between">
                                                <Text className="text-gray-600  -dark:text-white text-base font-semibold  ">
                                                    City
                                                </Text>
                                                <Text className="text-gray-700  -dark:text-white text-base ">
                                                    {station?.city || "---"}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    <SelectInput
                                        data={products}
                                        onChange={(e) =>
                                            handleChange(e.value, "product")
                                        }
                                        placeholder={"Select Product"}
                                        label="Select Product"
                                        error={errors?.product}
                                        message={"Select a Product"}
                                    />
                                    <Input
                                        error={errors?.driver_name}
                                        message={"Enter driver name"}
                                        value={formData.driver_name}
                                        onChangeText={(e) =>
                                            handleChange(e, "driver_name")
                                        }
                                        label="Driver Name"
                                        placeholder="Enter Driver "
                                    />

                                    {/* <Input
                                        onChangeText={(e) =>
                                            handleChange(e, "amount")
                                        }
                                        label="Product"
                                        placeholder="Enter Product"
                                        keyboardType="decimal-pad"
                                    /> */}

                                    <Input
                                        error={errors?.amount}
                                        message={"Enter amount"}
                                        value={formData.amount}
                                        onChangeText={(e) =>
                                            handleChange(e, "amount")
                                        }
                                        label="Amount"
                                        placeholder="Enter Amount"
                                        keyboardType="decimal-pad"
                                    />

                                    <View>
                                        <Button onPress={handleSubmit}>
                                            <Text className="text-center text-base text-white font-semibold">
                                                Generate Coupon
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

export default GenerateCoupon;
