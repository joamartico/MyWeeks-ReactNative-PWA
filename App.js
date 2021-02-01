import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { authentication } from "./firebase";
import Routes from "./src/navigation/Routes";
import Context from "./src/context/ContextComponent";

export default function App() {
	// const [user, setUser] = useState(undefined);

	// useEffect(() => {
	// 	authentication.onAuthStateChanged((res) => {
	// 		res == null ? setUser(false) : setUser(true);
	// 		console.log("RES: ", res);
	// 	});
	// }, []);

	// if(authentication.currentUser == null){
	// 	return (
	// 		<SafeAreaProvider>
	// 			<Routes initialRoute="SignIn" />
	// 		</SafeAreaProvider>
	// 	);
	// }
	// if (user == undefined) {
	// 	return <Text>Loading</Text>;
	// } else {
	// 	return (
	// 		<SafeAreaProvider>
	// 			<Routes initialRoute={user == true ? "BottomTabs" : "SignIn"} />
	// 		</SafeAreaProvider>
	// 	);
	// }

	return (
		<SafeAreaProvider>
			<Context>
				<Routes />
			</Context>
		</SafeAreaProvider>
	);
}
