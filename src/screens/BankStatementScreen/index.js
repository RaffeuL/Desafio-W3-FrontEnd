import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Keyboard,
    Modal,
    FlatList,
} from "react-native";
import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";
import DateSelector from "./components/DateSelector";
import StatementList from "./components/StatementList";
import { getStatement } from "../../services/bankFeatures/statement";
import Statement from "./components/Statement";

export default function BankStatementScreen() {
    const [agency, setAgency] = useState("");
    const [account, setAccount] = useState("");

    const [showInitialDate, setShowInitialDate] = useState(false);
    const [showFinalDate, setShowFinalDate] = useState(false);

    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();

    const [statementList, setStatmentList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [errors, setErrors] = useState({});

    function handleError(errorMenssage, input) {
        setErrors((prevState) => ({ ...prevState, [input]: errorMenssage }));
    }

    function onChangeInitialDate(event, selectedDate) {
        const currentDate = selectedDate;
        setShowInitialDate(false);
        setInitialDate(currentDate);
    }
    function onChangeFinalDate(event, selectedDate) {
        const currentDate = selectedDate;
        setShowFinalDate(false);
        setFinalDate(currentDate);
    }

    function showMode(isInitialDate) {
        if (isInitialDate) {
            setShowInitialDate(true);
            handleError("", "initialDate");
        } else {
            setShowFinalDate(true);
            handleError("", "finalDate");
        }
    }

    async function validate() {
        Keyboard.dismiss();
        let valid = true;
        const agencyRegex = /^[0-9]{1,4}$/g;
        const accountRegex = /^[0-9]{6,}$/g;

        if (!agency) {
            handleError("Please input the agency", "agency");
            valid = false;
        } else if (!agencyRegex.test(agency)) {
            handleError(
                "Agency cannot contain letters and should have 4 digits",
                "agency"
            );
            valid = false;
        }

        if (!account) {
            handleError("Please input the account", "account");
            valid = false;
        } else if (!accountRegex.test(account)) {
            handleError(
                "Account Number cannot contain letters and should have 6 digits or more",
                "account"
            );
            valid = false;
        }
        if (!initialDate) {
            handleError("Please select the initial date", "initialDate");
            valid = false;
        }

        if (!finalDate) {
            handleError("Please select the final date", "finalDate");
            valid = false;
        } else if (finalDate.getTime() < initialDate.getTime()) {
            handleError(
                "Final date cannot be before initial date",
                "finalDate"
            );
            valid = false;
        }

        if (valid) {
            await statement();
        }
    }

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    async function statement() {
        const response = await getStatement(
            formatDate(initialDate),
            formatDate(finalDate)
        );
        if (response.status == "sucess") {
            setStatmentList(response.data);
            setModalVisible(true);
        }
    }

    return (
        <>
            <View style={styles.screen}>
                <Input
                    placeholder={"Agency"}
                    onChangeText={setAgency}
                    keyboardType={"numeric"}
                    error={errors.agency}
                    onFocus={() => {
                        handleError(null, "agency");
                    }}
                />
                <Input
                    placeholder={"Account Number"}
                    onChangeText={setAccount}
                    keyboardType={"numeric"}
                    error={errors.account}
                    onFocus={() => {
                        handleError(null, "account");
                    }}
                />
                <DateSelector
                    buttonLabel={"Initial Date"}
                    date={initialDate}
                    onChange={onChangeInitialDate}
                    show={showInitialDate}
                    onPress={() => showMode(true)}
                    error={errors.initialDate}
                />
                <DateSelector
                    buttonLabel={"Final Date"}
                    date={finalDate}
                    onChange={onChangeFinalDate}
                    show={showFinalDate}
                    onPress={() => showMode(false)}
                    error={errors.finalDate}
                />
                <View style={styles.modalCenter}>
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
                                keyExtractor={(statement) => statement.id}
                                renderItem={(statement) => (
                                    <Statement statement={statement.item} />
                                )}
                            />
                            <Button
                                label={"Fechar"}
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </Modal>
                </View>
                <Button label={"Check"} onPress={validate} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#232323",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    text: {
        color: "#FFB400",
        textAlign: "center",
    },
    modalCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
    },
    modalView: {
        backgroundColor: "black",
    },
});
