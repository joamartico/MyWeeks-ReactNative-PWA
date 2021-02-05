import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { authentication } from "./firebase";
import Routes from "./src/navigation/Routes";
import Context from "./src/context/ContextComponent";

export default function App() {
	const [initialRoute, setInitialRoute] = useState(undefined);

	useEffect(() => {
		authentication.onAuthStateChanged((res) => {
			res == null
				? setInitialRoute("Onboarding")
				: setInitialRoute("Weeks");
		});
	}, []);

	if (initialRoute === undefined) {
		return <Text>Loading...</Text>;
	} else {

		return (
			<SafeAreaProvider>
				<Context>
					<Routes initialRoute={initialRoute} />
				</Context>
			</SafeAreaProvider>
		);
	}
}
