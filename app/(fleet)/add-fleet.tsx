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
import { USER_TYPE } from "../../utils/types";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import FleetAPIManager from "../../services/fleet";

type VehicleT = {
    vehicle_name?: string;
    vehicle_number?: string;
};
const AddFleet = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [formData, setFormData] = useState<VehicleT>({
        vehicle_name: "",
        vehicle_number: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);

    useEffect(() => {}, []);

    const handleChange = (value: string, name: string) => {
        const isValid = formValidation(name, value);
        setErrors({ ...errors, [name]: !isValid });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        //handle Error
        const checkErrors = checkError(formData);
        setErrors(checkErrors);
        if (isError(checkErrors)) return;
        //
        setLoader(true);
        const res: any = await new FleetAPIManager().addFleet({
            ...formData,
            user_id: user.id,
        });
        setLoader(false);

        if (!res.success) {
            toast(res.message);
            return;
        }
        toast(res.message);
        router.push("fleets");
        // await storeData(CONSTANT.USER_TOKEN, res?.token);

        // setUser({ ...res?.user, token: res?.token });
        // router.replace("/(home)");
    };

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
                                        Add a new vehicle
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 mt-6 ">
                                    <Input
                                        error={errors.vehicle_number}
                                        onChangeText={(e) =>
                                            handleChange(e, "vehicle_number")
                                        }
                                        label="Vehicle Number"
                                        placeholder="Enter Vehicle Number "
                                        value={formData.vehicle_number}
                                        message="Vehicle number must not be empty"
                                    />

                                    <Input
                                        value={formData.vehicle_name}
                                        message="Vehicle Name must not be empty"
                                        error={errors.vehicle_name}
                                        onChangeText={(e) =>
                                            handleChange(e, "vehicle_name")
                                        }
                                        label="Vehicle Description"
                                        placeholder="Enter Vehicle Description"
                                    />

                                    <View>
                                        <Button onPress={handleSubmit}>
                                            <Text className="text-center text-base text-white font-semibold">
                                                Add Vehicle
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} />
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

export default AddFleet;
