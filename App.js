import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { authentication } from "./firebase";
import Routes from "./src/navigation/Routes";
import Context from "./src/context/ContextComponent";
import { Body } from "./constants/styledComponents";

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
		return (
			<Body>
				<ActivityIndicator />
			</Body>
		);
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
