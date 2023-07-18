import { Stack } from "expo-router";

export default function CouponLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="generate"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="coupons"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="success"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="validate-coupon"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="activities"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="report"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
