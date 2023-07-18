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

class AuthAPIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: CONSTANT.BASE_URL,
            headers: {
                Accept: "application/json",
            },
        });
    }

    async signInUser(payload: any): Promise<ResType> {
        try {
            const res = await axios.post(`/login`, payload);

            return { success: res?.data?.status, ...res.data };
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

    async signUpUser(payload: any): Promise<ResType> {
        try {
            const res = await axios.post(`/register`, payload);

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

    async verifyEmail(payload: { code: string }): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/email/validate`, payload, {
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

    async sendVerifyEmail(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(
                `/email/send`,
                {},
                { headers: { authorization: `Bearer ${token}` } }
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

    async forgotPassword(payload: any): Promise<ResType> {
        try {
            const res = await axios.post(
                "auth/request/password-reset",
                payload
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

export default AuthAPIManager;
