import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, RefreshControl } from "react-native";
import { ScrollView, Text } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import ConfirmationModal from "../../components/ConfirmationModal";
import CouponDetails from "../../components/Coupon/CouponDetails";
import Loader from "../../components/loader";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import CouponAPIManager from "../../services/coupon";
import FleetAPIManager from "../../services/fleet";
import { toast } from "../../utils";
import * as Clipboard from "expo-clipboard";
import DatePicker from "../../components/DatePicker";
import { useRecoilState } from "recoil";
import { COUPON_TYPE } from "../../utils/types";
import { couponState } from "../../atoms/coupon";
import Button from "../../components/Button";

type FLEET_TYPE = {
    vehicle_name?: string;
    vehicle_number?: string;
    id?: number;
};

type PAGINATION_TYPE = {
    from?: number;
    to?: number;
    total?: number;
    last_page?: number;
    per_page?: number;
    page?: number;
    current_page?: number;
};

const currentDate = new Date();
const oneMonthAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
);

const Activites = () => {
    const [coupons, setCoupons] = useState<Array<any>>([]);
    const [coupon, setCoupon] = useState<any>();
    const [pagination, setPagination] = useState<PAGINATION_TYPE>();
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [reload, setReload] = useState(false);
    const [id, setId] = useState(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [dateFrom, setDatefrom] = useState(oneMonthAgo);
    const [dateTo, setDateTO] = useState(currentDate);
    const [selecedCoupon, setSelectedCoupon] =
        useRecoilState<COUPON_TYPE>(couponState);

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
            const res: any = await new CouponAPIManager().getCouponReport(
                payload
            );

            setLoader(false);

            setCoupons(res?.data || []);
        } catch (error) {
            console.log({ error });
        }
    };
    const handleDelete = async () => {
        setConfirm(false);
        setLoader(true);
        const res: any = await new FleetAPIManager().deleteFleets(id);
        setLoader(false);
        toast(res.message);
        setReload(!reload);
    };

    const handleConfirm = (id: number) => {
        setId(id);
        setConfirm(true);
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(coupon?.code);
        Alert.alert("Copied");
        // setCoupon(undefined);
    };

    const handleView = (e: any) => {
        setSelectedCoupon(e);
        router.push("coupon-validated");
    };

    return (
        <>
            {loader && <Loader />}
            <CouponDetails
                data={coupon}
                onCancel={() => setCoupon(undefined)}
                onConfirm={() => {
                    copyToClipboard();
                }}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loader}
                        onRefresh={() => handleFecth()}
                    />
                }
            >
                <View
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        paddingTop: Dimensions.get("screen").height * 0.03,
                        backgroundColor: "white",
                    }}
                >
                    <View className="w-[45%] bg-white">
                        <DatePicker
                            onChange={(e) => setDatefrom(e)}
                            value={dateFrom}
                            label="Date From"
                        />
                    </View>
                    <View className="w-[44%] bg-white">
                        <DatePicker
                            onChange={(e) => setDateTO(e)}
                            value={dateTo}
                            label="Date To"
                        />
                    </View>
                </View>
                <DataTable style={styles.container}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title>Coupon</DataTable.Title>
                        <DataTable.Title>Amount</DataTable.Title>
                        <DataTable.Title>Vehicle No</DataTable.Title>

                        <DataTable.Title
                            style={{
                                justifyContent: "flex-end",
                            }}
                        >
                            <Text> Product</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    {coupons.map((e) => (
                        <DataTable.Row
                            key={e.code}
                            onPress={() => handleView(e)}
                        >
                            <DataTable.Cell>{e.code}</DataTable.Cell>
                            <DataTable.Cell>#{e.amount}</DataTable.Cell>

                            <DataTable.Cell>{e.vehicle_number}</DataTable.Cell>

                            <DataTable.Cell
                                style={{ justifyContent: "flex-end" }}
                            >
                                {e.product}
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        </>
    );
};

export default Activites;

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: "#DCDCDC",
    },
    addBtn: {
        position: "absolute",
        bottom: "5%",
        right: 20,
        backgroundColor: "#CC9933",
        justifyContent: "center",
        borderRadius: 100,
        elevation: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: 50,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    icon: {
        // padding: 10,
        // fontSize: 20,
        // height: 50,
        // width: 50,
        // textAlign: "center",
    },
});
