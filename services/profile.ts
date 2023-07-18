import axios from "axios";
import { CONSTANT } from "../constants";
import { retrieveData } from "../utils/storage";
// axios.defaults = Object.assign(axios.defaults, {
//     baseURL: `${process.env.BASE_URL}/auth`,
// });

export type ResType = {
    success: boolean;
    message: string;
    data?: any;
};

class ProfileAPIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: CONSTANT.BASE_URL,
            headers: {
                Accept: "application/json",
            },
        });
    }

    async userInfo(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/users`, {
                headers: { authorization: `Bearer ${token}` },
            });
            return { success: true, ...res.data };
        } catch (error: any) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message,
            };
        }
    }
    async updateUserInfo(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/users`, payload, {
                headers: { authorization: `Bearer ${token}` },
            });
            return { success: true, ...res.data };
        } catch (error: any) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message,
            };
        }
    }
    async changePassword(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/users/password`, payload, {
                headers: { authorization: `Bearer ${token}` },
            });
            return { success: true, ...res.data };
        } catch (error: any) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message,
            };
        }
    }
    async setPin(pin: string): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(
                `/users/pin`,
                { pin },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            return { success: true, ...res.data };
        } catch (error: any) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message,
            };
        }
    }
}

export default ProfileAPIManager;
