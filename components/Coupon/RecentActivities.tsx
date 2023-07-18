import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { useRecoilState } from "recoil";
import { couponState } from "../../atoms/coupon";
import CouponAPIManager from "../../services/coupon";
import { COUPON_TYPE } from "../../utils/types";

type PAGINATION_TYPE = {
    from?: number;
    to?: number;
    total?: number;
    last_page?: number;
    per_page?: number;
    page?: number;
    current_page?: number;
};
const RecentActivities = () => {
    const [coupons, setCoupons] = useState<Array<any>>([]);
    const [pagination, setPagination] = useState<PAGINATION_TYPE>();
    const [selecedCoupon, setSelectedCoupon] =
        useRecoilState<COUPON_TYPE>(couponState);

    const router = useRouter();

    const handleFecth = async () => {
        const currentDate = new Date();
        const oneMonthAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
        );
        // const formattedDate = oneMonthAgo.toLocaleDateString('en-US');
        const payload = {
            from: oneMonthAgo,
            to: currentDate,
        };
        const res: any = await new CouponAPIManager().getvalidatedCoupon(
            payload
        );

        setCoupons(res?.data || []);
    };
    useEffect(() => {
        handleFecth();
    }, []);

    const handleView = (e: any) => {
        setSelectedCoupon(e);
        router.push("coupon-validated");
    };
    return (
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
                    onPress={() => {
                        handleView(e);
                    }}
                >
                    <DataTable.Cell>{e.code}</DataTable.Cell>
                    <DataTable.Cell>₦ {e.amount}</DataTable.Cell>

                    <DataTable.Cell>{e.vehicle_number}</DataTable.Cell>

                    <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                        {e.product}
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
            {/* <DataTable.Pagination
                page={(pagination?.current_page as any) - 1}
                numberOfPages={pagination?.last_page as any}
                label={`${pagination?.current_page} - ${pagination?.last_page}`}
                onPageChange={(e) => handleFecth(e + 1)}
            /> */}
        </DataTable>
    );
};

export default RecentActivities;

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
