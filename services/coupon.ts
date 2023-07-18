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

class CouponAPIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: CONSTANT.BASE_URL,
            headers: {
                Accept: "application/json",
            },
        });
    }

    async getStations(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/stations`, {
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
    async createCoupon(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/coupon`, payload, {
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
    async getCoupons(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/coupons`, {
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
    async getAllVehicles(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/vehicles`, {
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
    async getCouponMontly(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/station/coupon/month`, {
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
    async getCouponDaily(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/station/coupon/day`, {
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

    async getCouponYearly(): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/station/coupon/year`, {
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

    async validateCoupon(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/station/coupon`, payload, {
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
    async getvalidatedCoupon(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`station/coupons/report`, payload, {
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

    async getCouponReport(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`coupons/report`, payload, {
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
}

export default CouponAPIManager;
