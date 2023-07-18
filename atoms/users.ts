import { atom } from "recoil";
import { CONSTANT } from "../constants";
import { USER_TYPE } from "../utils/types";

const userData: USER_TYPE = {};

export const userState = atom({
    key: "USER_STATE",
    default: userData,
});

export const userIsOnboarded = atom({
    key: CONSTANT.ONBOARDED,
    default: false,
});
