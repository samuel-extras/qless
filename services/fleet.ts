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

class FleetAPIManager {
    constructor() {
        axios.defaults = Object.assign(axios.defaults, {
            baseURL: CONSTANT.BASE_URL,
            headers: {
                Accept: "application/json",
            },
        });
    }

    async getFleets(query?: string): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.get(`/vehicle${query || "?"}`, {
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
    async deleteFleets(id: number): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.delete(`/vehicle/${id}`, {
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
    async addFleet(payload: any): Promise<ResType> {
        try {
            const token = await retrieveData(CONSTANT.USER_TOKEN);
            const res = await axios.post(`/vehicle`, payload, {
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

export default FleetAPIManager;
