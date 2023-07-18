import { atom } from "recoil";
import { CONSTANT } from "../constants";
import { COUPON_TYPE } from "../utils/types";

const coupon: COUPON_TYPE = {};

export const couponState = atom({
    key: "COUPON_STATE",
    default: coupon,
});
