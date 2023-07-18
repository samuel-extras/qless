import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="set-pin"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="edit-profile"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="change-password"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
