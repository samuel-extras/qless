import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, RefreshControl } from "react-native";
import { ScrollView, Text } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import ConfirmationModal from "../../components/ConfirmationModal";
import Loader from "../../components/loader";
import Message from "../../components/Message";
import SupplyDetails from "../../components/Supply/SupplyDetails";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import FleetAPIManager from "../../services/fleet";
import GFFMAPIManager from "../../services/gffm";
import SupplyAPIManager from "../../services/supply";
import { toast } from "../../utils";

type PAGINATION_TYPE = {
    from?: number;
    to?: number;
    total?: number;
    last_page?: number;
    per_page?: number;
    page?: number;
    current_page?: number;
};

const GFFMS = () => {
    const [supplies, setSupplies] = useState<Array<any>>([]);
    const [pagination, setPagination] = useState<PAGINATION_TYPE>();
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [reload, setReload] = useState(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [supply, setSupply] = useState<any>(undefined);
    const [serverRes, setServerRes] = useState<{
        message?: string;
        success?: boolean;
    }>({});
    const [showMessage, setShowMessage] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        handleFecth();
    }, [reload, isFocused]);
    const handleFecth = async (page?: number) => {
        const query = page ? `?page=${page}` : "?";
        setLoader(true);
        const res: any = await new GFFMAPIManager().getGFFM(query);

        setLoader(false);
        if (!res.success) {
            toast(res.message);
            return;
        }

        setPagination(res.data);

        setSupplies(res?.data?.data || []);
    };
    const handleDelete = async () => {
        const id = supply?.id;
        setSupply(undefined);
        setLoader(true);
        const res: any = await new GFFMAPIManager().deleteSupply(id);
        setLoader(false);
        setServerRes({
            ...res,
        });

        setShowMessage(true);
        setReload(!reload);
    };

    const handleEdit = () => {
        const id = supply.id;
        setSupply(undefined);
        router.push(`/edit-gffm?id=${id}`);
    };

    const handleClose = () => {
        setShowMessage(false);
    };

    return (
        <>
            {loader && <Loader />}
            <Message
                message={serverRes.message}
                success={serverRes.success}
                visible={showMessage}
                handleClose={handleClose}
            />
            <SupplyDetails
                data={supply}
                onCancel={() => setSupply(undefined)}
                onEdit={() => handleEdit()}
                onConfirm={() =>
                    Alert.alert(
                        "Confirmation",
                        "Are you sure you want to delete this item?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("CANCELED"),
                                style: "cancel",
                            },
                            {
                                text: "OK",
                                onPress: () => handleDelete(),
                            },
                        ]
                    )
                }
            />
            <ConfirmationModal
                visible={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={handleDelete}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loader}
                        onRefresh={() => handleFecth(pagination?.page)}
                    />
                }
            >
                <DataTable style={styles.container}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title>Product</DataTable.Title>
                        <DataTable.Title>Amount</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title
                            style={{
                                width: 100,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Text> Pick Up Date</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    {supplies.map((e, i) => (
                        <DataTable.Row
                            key={i}
                            onPress={() =>
                                setSupply({
                                    ...e,
                                    supply_date: e.pick_up_date,
                                })
                            }
                        >
                            <DataTable.Cell>{e.product}</DataTable.Cell>
                            <DataTable.Cell>{e.amount}</DataTable.Cell>
                            <DataTable.Cell>
                                {e.status?.toUpperCase()}
                            </DataTable.Cell>
                            <DataTable.Cell
                                style={{
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Text>
                                    {new Date(
                                        e.pick_up_date
                                    ).toLocaleDateString()}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    <DataTable.Pagination
                        page={(pagination?.current_page as any) - 1}
                        numberOfPages={pagination?.last_page as any}
                        label={`${pagination?.current_page} - ${pagination?.last_page}`}
                        onPageChange={(e) => handleFecth(e + 1)}
                    />
                </DataTable>
            </ScrollView>

            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => router.push("/(gffm)/add-gffm")}
            >
                <FontAwesome
                    name={"plus"}
                    color={"#fff"}
                    style={styles.icon}
                    size={20}
                />
            </TouchableOpacity>
        </>
    );
};

export default GFFMS;

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
