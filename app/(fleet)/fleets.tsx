import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, RefreshControl } from "react-native";
import { ScrollView, Text } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import ConfirmationModal from "../../components/ConfirmationModal";
import Loader from "../../components/loader";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import FleetAPIManager from "../../services/fleet";
import { toast } from "../../utils";
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

const TableExample = () => {
    const [fleets, setfleets] = useState<Array<FLEET_TYPE>>([]);
    const [pagination, setPagination] = useState<PAGINATION_TYPE>();
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [reload, setReload] = useState(false);
    const [id, setId] = useState(0);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        handleFecth();
    }, [reload]);
    const handleFecth = async (page?: number) => {
        const query = page ? `?page=${page}` : "?";
        setLoader(true);
        const res: any = await new FleetAPIManager().getFleets(query);
        setLoader(false);
        if (!res.success) {
            toast(res.message);
            return;
        }

        setPagination(res.data);

        setfleets(res?.data?.data || []);
    };
    const handleDelete = async () => {
        setConfirm(false);
        setLoader(true);
        const res: any = await new FleetAPIManager().deleteFleets(id);
        setLoader(false);
        Alert.alert("Message", res.message);
        setReload(!reload);
    };

    const handleConfirm = (id: number) => {
        setId(id);
        setConfirm(true);
    };

    return (
        <>
            {loader && <Loader />}
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
                        <DataTable.Title>Plate No</DataTable.Title>
                        <DataTable.Title>Description</DataTable.Title>
                        <DataTable.Title
                            style={{
                                width: 100,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Text> Action</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    {fleets.map((e) => (
                        <DataTable.Row key={e.vehicle_number}>
                            <DataTable.Cell>{e.vehicle_number}</DataTable.Cell>
                            <DataTable.Cell>{e.vehicle_name}</DataTable.Cell>
                            <DataTable.Cell
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => handleConfirm(e.id as any)}
                                    style={{ padding: 10 }}
                                >
                                    <FontAwesome
                                        name="trash"
                                        color={"red"}
                                        size={20}
                                    />
                                </TouchableOpacity>
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
                onPress={() => router.push("(fleet)/add-fleet")}
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

export default TableExample;

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
