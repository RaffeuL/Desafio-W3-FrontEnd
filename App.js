import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AppRoutes from "./src/routes/AppRoutes";
import { store } from "./src/store";
import { Provider } from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar style="light" />
            <SafeAreaView style={{ flex: 1 }}>
                <AppRoutes />
            </SafeAreaView>
        </Provider>
    );
}
