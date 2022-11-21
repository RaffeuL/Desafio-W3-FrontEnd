import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList } from "react-native";
import Button from "../../../globalComponents/Button";
import { getStatement } from "../../../services/bankFeatures/statement";
import Statement from "./Statement";

export default function StatementList({ statementList }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <FlatList
                            data={statementList}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => (
                                <Statement
                                    type={item.type}
                                    value={item.value}
                                    date={item.date}
                                />
                            )}
                        />
                        <Button
                            label={"Fechar"}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </Modal>
                <Button
                    label={"Ver extrato"}
                    onPress={() => setModalVisible(true)}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
    },
    text: {
        color: "white",
    },
});
