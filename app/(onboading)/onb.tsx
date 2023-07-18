import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import Button from "../../components/Button";

const OnboardingScreen = () => {
    const router = useRouter();

    const DotComponent = ({ selected }: any) => {
        return (
            <View
                className={`w-4 h-4 mx-1 flex items-center justify-center rounded-full ${
                    selected ? "border border-[#CC9933]" : ""
                }  p-2`}
            >
                <View
                    className={`w-2 h-2 ${
                        selected ? "bg-[#CC9933]" : "bg-yellow-500"
                    } rounded-full`}
                ></View>
            </View>
        );
    };

    return (
        <Onboarding
            onSkip={() => router.replace("signup")}
            onDone={() => router.replace("signup")}
            DotComponent={DotComponent}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: (
                        <Image
                            source={{
                                uri: "https://thumbs.dreamstime.com/b/gas-station-icon-isolated-white-background-pin-gas-noz-gas-station-icon-isolated-white-background-pin-gas-nozzle-d-121795644.jpg",
                            }}
                            className="w-72 h-72 object-contain"
                        />
                    ),
                    title: "Happy Shopping",
                    subtitle:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.",
                    titleStyles: {
                        color: "#36454F",
                    },
                },
                {
                    backgroundColor: "#fff",
                    image: (
                        <Image
                            source={{
                                uri: "https://thumbs.dreamstime.com/b/happy-taxi-driver-sitting-his-car-next-to-gas-station-happy-taxi-driver-sitting-his-car-next-to-gas-station-over-white-122305659.jpg",
                            }}
                            className="w-full h-80 object-contain"
                        />
                    ),
                    title: "All you need in One PLace",
                    subtitle:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.",
                    titleStyles: {
                        color: "#36454F",
                    },
                },
                {
                    backgroundColor: "#fff",
                    image: (
                        <Image
                            source={{
                                uri: "https://thumbs.dreamstime.com/b/3d-gas-station-27653648.jpg",
                            }}
                            className="w-72 h-72 object-contain"
                        />
                    ),
                    title: "Happy Sale, Happy Customer",
                    subtitle:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, voluptate!.",
                    titleStyles: {
                        color: "#36454F",
                    },
                },
            ]}
        />
    );
};

export default OnboardingScreen;
