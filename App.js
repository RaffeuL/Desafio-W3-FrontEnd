import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import AppRoutes from "./src/routes/AppRoutes";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <AppRoutes />
        </SafeAreaView>
    );
}
