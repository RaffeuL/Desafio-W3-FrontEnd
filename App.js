import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AppRoutes from "./src/routes/AppRoutes";
import { store } from "./src/store";
import { Provider } from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <AppRoutes />
            </SafeAreaView>
        </Provider>
    );
}
