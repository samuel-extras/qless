import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

import Button from "../Button";
import { BlurView } from "expo-blur";
import Input from "../Input";
import { useRouter } from "expo-router";

import CouponAPIManager from "../../services/coupon";
import DatePicker from "../DatePicker";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

const currentDate = new Date();
const oneMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
);

const StatementModal = ({ visible, onClose }: ModalProps) => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const [code, setCode] = useState();
    const [dateFrom, setDatefrom] = useState(oneMonthAgo);
    const [dateTo, setDateTO] = useState(currentDate);
    const [coupons, setCoupons] = useState<Array<any>>([]);
    const [loader, setLoader] = useState<boolean>(false);

    const validateCoupon = async () => {
        const res: any = await new CouponAPIManager().validateCoupon({ code });

        onClose();
        router.push("coupon-validated");
        if (!res.success) {
            Alert.alert("Message", res.message || "something went wrong");
            return;
        }

        // onClose();
        router.push("coupon-validated");
    };

    useEffect(() => {
        handleFecth();
    }, [dateFrom, dateTo]);

    const handleFecth = async () => {
        try {
            // const formattedDate = oneMonthAgo.toLocaleDateString('en-US');
            const payload = {
                from: dateFrom,
                to: dateTo,
            };
            setLoader(true);
            const res: any = await new CouponAPIManager().getvalidatedCoupon(
                payload
            );

            setLoader(false);

            setCoupons(res?.data || []);
        } catch (error) {
            console.log({ error });
        }
    };

    const getHtml = () => {
        try {
            const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Inline CSS Example</title>
          </head>
          <body>

          <center><h1>Statement From  ${new Date(dateFrom).toLocaleDateString(
              "en-US",
              {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
              }
          )} To ${new Date(dateTo).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            })} </h1></center>
            <div style="display: flex; flex-direction: column; background-color:white">
              <div style="overflow-x: auto; margin-left: -1rem; margin-right: -1rem;">
                <div style="padding-top: 0.5rem; display: inline-block; min-width: 100%; padding-left: 1.5rem; padding-right: 1.5rem;">
                  <div style="overflow: hidden;">
                    <table style="width: 100%;">
                      <thead style="background-color: #fff; border-bottom: 1px solid;">
                        <tr>
                          <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                            #
                          </th>
                          <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                            Code
                          </th>
                          <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                            Amount
                          </th>
                          <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                         Vehicle Number
                          </th>
                        
                         
                           <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                           Product
                            </th>

                            <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                            Station
                             </th>
                         
                              <th scope="col" style="font-size: 0.875rem; font-weight: 500; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; text-align: left;">
                             Date
                              </th>
                        </tr>
                      </thead>
                      <tbody>
                        ${
                            coupons.length &&
                            coupons
                                .map(
                                    (coupon, i) => `
                            <tr style="background-color: #F3F4F6; border-bottom: 1px solid;">
                              <td style="padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: 0.875rem; font-weight: 500; color: #111827;">
                                ${i + 1}
                              </td>
                              <td style="padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: 0.875rem; font-weight: 500; color: #111827;">
                                ${coupon.code}
                              </td>
                              <td style="font-size: 0.875rem; font-weight: 300; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; white-space: nowrap;">
                                ${coupon.amount}
                              </td>
                              <td style="font-size: 0.875rem; font-weight: 300; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; white-space: nowrap;">
                                ${coupon.vehicle_number}
                              </td>
                             
                              
                              <td style="font-size: 0.875rem; font-weight: 300; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; white-space: nowrap;">
                              ${coupon.product}
                            </td>
                            <td style="font-size: 0.875rem; font-weight: 300; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; white-space: nowrap;">
                            ${coupon.station_name}
                          </td>
                       
                        <td style="font-size: 0.875rem; font-weight: 300; color: #111827; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; white-space: nowrap;">
                        ${new Date(coupon.created_at).toLocaleDateString(
                            "en-US",
                            {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                      </td>
                            </tr>
                          `
                                )
                                .join("")
                        }
                      </tbody>r
                    </table>
                    ${
                        !coupons.length &&
                        "<center><h1>No Record Found </h1></center>"
                    }
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

            return html;
        } catch (error) {
            console.log({ error });
            return "";
        }
    };

    const createAndSavePDF = async (html: any) => {
        try {
            const { uri } = await Print.printToFileAsync({ html });

            if (Platform.OS === "ios") {
                await Sharing.shareAsync(uri);
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();

                if (permission.granted) {
                    await MediaLibrary.createAssetAsync(uri);
                    Alert.alert("SUCCESS", "STATEMENT GENERATED SUCCESSFULLY");
                    onClose();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <BlurView
                tint={colorScheme || "default"}
                intensity={90}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    // activeOpacity={1}
                    className=" absolute inset-0 w-screen h-screen -z-10 bg-[red]"
                    onPress={onClose}
                ></TouchableOpacity>
                <View className="w-full p-4 z-1">
                    <View className="pointer-events-none bg-white -dark:bg-gray-800 px-5 py-10 rounded-md w-full">
                        <Text className="text-xl font-bold mb-3 text-black -dark:text-white">
                            Statement Period
                        </Text>
                        <TouchableOpacity
                            style={{
                                right: 20,
                                position: "absolute",
                                padding: 10,
                            }}
                            // activeOpacity={1}
                            className=" absolute -z-10  "
                            onPress={onClose}
                        >
                            <FontAwesome name="times" size={15} />
                        </TouchableOpacity>
                        {/* <Text className="mb-5 text-black -dark:text-white">
                            Select Period of time you wamt to generate coupon
                            for
                        </Text> */}
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                flexDirection: "row",
                                paddingTop:
                                    Dimensions.get("screen").height * 0.03,
                                height: 120,
                            }}
                        >
                            <View className="w-[45%]">
                                <DatePicker
                                    onChange={(e) => setDatefrom(e)}
                                    value={dateFrom}
                                    label="Date From"
                                />
                            </View>
                            <View className="w-[44%]">
                                <DatePicker
                                    onChange={(e) => setDateTO(e)}
                                    value={dateTo}
                                    label="Date To"
                                />
                            </View>
                        </View>
                        <Button
                            onPress={() => {
                                createAndSavePDF(getHtml());
                                // onClose();
                                // router.push("coupon-validated");
                            }}
                        >
                            {loader ? (
                                <ActivityIndicator color={"white"} />
                            ) : (
                                <Text className="text-center text-white text-base font-semibold">
                                    Generate
                                </Text>
                            )}
                        </Button>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

export default StatementModal;
