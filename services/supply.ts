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

class SupplyAPIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: CONSTANT.BASE_URL,
            headers: {
                Accept: "application/json",
            },
        });
    }

    async getsupplies(query?: string): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/supply${query || "?"}`, {
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
    async deleteSupply(id: number): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.delete(`/supply/${id}`, {
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
    async getSupply(id: number): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/supply/${id}`, {
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
    async addSupply(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/supply`, payload, {
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
    async editSupply(id: any, payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.put(`/supply/${id}`, payload, {
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

export default SupplyAPIManager;
