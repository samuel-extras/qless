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

import { toast } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { USER_TYPE } from "../../utils/types";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import FleetAPIManager from "../../services/fleet";
import {
    checkError,
    formValidation,
    isError,
} from "../../utils/formValidation";
import ProfileAPIManager from "../../services/profile";
import Message from "../../components/Message";

const UpdateProfile = () => {
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const router = useRouter();
    const [formData, setFormData] = useState<USER_TYPE>({
        city: user.city,
        address: user.address,
        name: user.name,
        state: user.state,
        phone: user.phone,
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [serverRes, setServerRes] = useState<{
        message?: string;
        success?: boolean;
    }>({});
    const [showMessage, setShowMessage] = useState(false);
    const [completed, setCompleted] = useState(false);

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

        setLoader(true);

        const res: any = await new ProfileAPIManager().updateUserInfo(formData);
        setLoader(false);

        setUser({ ...user, ...formData });
        setServerRes(res);
        setShowMessage(true);
        // await storeData(CONSTANT.USER_TOKEN, res?.token);

        // setUser({ ...res?.user, token: res?.token });
        // router.replace("/(home)");
    };
    useEffect(() => {
        if (completed) router.back();
    }, [completed]);
    return (
        <>
            {loader && <Loader />}

            <Message
                message={serverRes.message}
                success={serverRes.success}
                visible={showMessage}
                handleClose={() => {
                    setShowMessage(false);
                    setCompleted(serverRes.success as any);
                }}
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
                                        Update Profile
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 mt-6 ">
                                    <Input
                                        message="Name must not be empty"
                                        error={errors.name}
                                        onChangeText={(e) =>
                                            handleChange(e, "name")
                                        }
                                        label="Name"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                    />
                                    <Input
                                        message="Phone Number must not be empty"
                                        error={errors.phone}
                                        onChangeText={(e) =>
                                            handleChange(e, "phone")
                                        }
                                        label="Phone Number"
                                        placeholder="Enter Your Phone Number"
                                        value={formData.phone}
                                        keyboardType={"phone-pad"}
                                    />
                                    <Input
                                        message="Address must not be empty"
                                        error={errors.address}
                                        onChangeText={(e) =>
                                            handleChange(e, "address")
                                        }
                                        label="Address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                    />

                                    <Input
                                        error={errors.city}
                                        onChangeText={(e) =>
                                            handleChange(e, "city")
                                        }
                                        label="City"
                                        placeholder="Enter City"
                                        message="City must not be empty"
                                        value={formData.city}
                                    />

                                    <Input
                                        error={errors.state}
                                        onChangeText={(e) =>
                                            handleChange(e, "state")
                                        }
                                        label="State"
                                        placeholder="Enter State"
                                        message="State must not be empty"
                                        value={formData.state}
                                    />

                                    <View>
                                        <Button onPress={handleSubmit}>
                                            <Text className="text-center text-base text-white font-semibold">
                                                Update
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginBottom: 100 }} />
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

export default UpdateProfile;
