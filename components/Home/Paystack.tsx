import React, { FC } from "react";

import { View } from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { CONSTANT } from "../../constants";
import { USER_TYPE } from "../../utils/types";
const { Paystack } = require("react-native-paystack-webview");

interface IPW {
    onSuccess?: () => void;
    onCancel?: () => void;
    amount?: string | number;
}

const PaystackWebView: FC<IPW> = ({ onSuccess, onCancel, amount }: IPW) => {
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey={CONSTANT.PAYSTACK_PK}
                amount={amount}
                billingEmail={user.email}
                activityIndicatorColor="yellow"
                onCancel={onCancel}
                onSuccess={onSuccess}
                autoStart={true}
            />
        </View>
    );
};
export default PaystackWebView;
