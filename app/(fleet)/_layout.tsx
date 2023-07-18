import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="fleets"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="add-fleet"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
