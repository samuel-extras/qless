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
import { USER_TYPE } from "../../utils/types";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

type FORM_DATA = {
    email?: string;
    password?: string;
    phone?: string;
    name?: string;
    cpassword?: string;
};

const SignUp = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [formData, setFormData] = useState<FORM_DATA>({
        cpassword: "",
        password: "",
        name: "",
        phone: "",
        email: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showCPassword, setShowCPassword] = useState<boolean>(false);

    useEffect(() => {
        //    if(user.email){
        //     router.push()
        //    }
    }, []);

    const handleChange = (value: string, name: string) => {
        const isValid = formValidation(name, value);
        setErrors({ ...errors, [name]: !isValid });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const checkErrors = checkError(formData);
        setErrors(checkErrors);
        if (isError(checkErrors)) return;
        if (formData.password !== formData.cpassword) {
            setErrors({ ...errors, cpassword: true });
            return;
        }

        setLoader(true);
        const res: any = await new AuthAPIManager().signUpUser(formData);
        setLoader(false);
        if (!res.success) {
            Alert.alert("Failed", res.message);
            return;
        }

        await storeData(CONSTANT.USER_TOKEN, res?.token);

        setUser({ ...res?.user, token: res?.token });
        router.push("/verification");
    };

    return (
        <>
            {loader && <Loader />}
            <SafeAreaView
                style={{
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
                                    className="w-full flex justify-center items-center h-52 bg-gradient-to-r rounded-b rounded-lg"
                                    colors={["#CC9933", "#926f34"]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                                >
                                    <Image
                                        source={Logo}
                                        alt="logo"
                                        className="w-32 h-28"
                                    />
                                    <Text className="font-bold text-lg text-black mt-2">
                                        Let’s get you Registered
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 -mt-6 ">
                                    <View className="px-6 py-10 flex flex-col rounded-lg bg-white shadow-lg">
                                        <Input
                                            error={errors.name}
                                            onChangeText={(e) =>
                                                handleChange(e, "name")
                                            }
                                            label="Name"
                                            placeholder="Enter Your Name"
                                            value={formData.name}
                                            message="Name must not be empty"
                                        />
                                        <Input
                                            error={errors.email}
                                            onChangeText={(e) =>
                                                handleChange(e, "email")
                                            }
                                            label="Email"
                                            placeholder="Enter your Email"
                                            keyboardType={"email-address"}
                                            value={formData.email}
                                            message="Enter a valid email address"
                                        />
                                        <Input
                                            error={errors.phone}
                                            onChangeText={(e) =>
                                                handleChange(e, "phone")
                                            }
                                            keyboardType="phone-pad"
                                            label="Phone Number"
                                            placeholder="Enter Your Phone Number"
                                            value={formData.phone}
                                            message="Phone must not be empty"
                                        />
                                        <Input
                                            error={errors.password}
                                            onChangeText={(e) =>
                                                handleChange(e, "password")
                                            }
                                            label="Password"
                                            placeholder="Enter Your password"
                                            secureTextEntry={!showPassword}
                                            message="Password must not be empty"
                                            icon={
                                                <FontAwesome
                                                    size={15}
                                                    name={
                                                        !showPassword
                                                            ? "eye"
                                                            : "eye-slash"
                                                    }
                                                />
                                            }
                                            onClickIcon={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            value={formData.password}
                                        />
                                        <Input
                                            error={errors.cpassword}
                                            onChangeText={(e) =>
                                                handleChange(e, "cpassword")
                                            }
                                            label="Confirm Password"
                                            placeholder="Reenter your password"
                                            secureTextEntry={!showCPassword}
                                            value={formData.cpassword}
                                            icon={
                                                <FontAwesome
                                                    size={15}
                                                    name={
                                                        !showCPassword
                                                            ? "eye"
                                                            : "eye-slash"
                                                    }
                                                />
                                            }
                                            onClickIcon={() =>
                                                setShowCPassword(!showCPassword)
                                            }
                                            message="Password Does not match"
                                        />
                                        <View>
                                            <Button onPress={handleSubmit}>
                                                <Text className="text-center text-base text-white font-semibold">
                                                    Sign Up
                                                </Text>
                                            </Button>
                                        </View>
                                        <View className="flex flex-row mt-2">
                                            <Text className="text-black  -dark:text-white">
                                                Already have an account?{" "}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    router.push(
                                                        "(auth)/sign-in"
                                                    )
                                                }
                                            >
                                                <Text className="italic text-[#CC9933]">
                                                    Sign in
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
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

export default SignUp;
