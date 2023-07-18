import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import {
    Pressable,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";

import Colors from "../../constants/Colors";
import { USER_TYPE } from "../../utils/types";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome5>["name"];
    color: string;
}) {
    return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
    const colorScheme = useColorScheme();
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const router = useRouter();

    useEffect(() => {
        if (!user.is_phone_verified && !user.is_email_verified) {
            router.replace("/(auth)/verification");
        }
    }, []);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitle: "",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome5
                                    name="bell"
                                    size={20}
                                    color={Colors[colorScheme ?? "light"].text}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                    }}
                                />
                            )}
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <View className="flex flex-row items-center px-4 gap-x-2">
                            <View className="p-2 flex justify-center items-center bg-yellow-50 -dark:bg-gray-900 rounded-full w-10 h-10">
                                <FontAwesome5
                                    name="user"
                                    size={22}
                                    color="gray"
                                />
                            </View>
                            <Text className="font-bold text-xl text-slate-900 -dark:text-white">
                                {" "}
                                Hi {user.name},
                            </Text>
                        </View>
                    ),
                    headerTitleAlign: "center",
                }}
            />
            <Tabs.Screen
                name="quick-services"
                options={{
                    title: "Quick service",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="automobile" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="support"
                options={{
                    title: "Support",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="headphones" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="cogs" color={color} />
                    ),
                    headerRight: (props) => (
                        <TouchableOpacity
                            className="pr-5"
                            onPress={() =>
                                router.push("(settings)/edit-profile")
                            }
                        >
                            <Text className="text-blue-800">Edit</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}
