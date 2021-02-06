import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Onboarding from "../screens/Onboarding";
import Plan from '../screens/Plan';

const Stack = createStackNavigator();

const Routes = ({ initialRoute }) => {
	// const {setUserId} = useContext(Context)

	// const [initialRoute, setInitialRoute] = useState(undefined);

	// useEffect(() => {
	// 	authentication.onAuthStateChanged((res) => {
	// 		res == null
	// 			? setInitialRoute("SignIn")
	// 			: setInitialRoute("BottomTabs");
	// 		console.log("RES: ", res);
	// 	});
	// }, []);

	// if (initialRoute == undefined) {
	// 	return (
	// 		<View style={{ flex: 1, background: COLORS.bg }}>
	// 			<Image
	// 				source={require("../../assets/icon.png")}
	// 				style={{ height: "100%", width: "100%" }}
	// 				resizeMode="contain"
	// 			/>
	// 		</View>
	// 	);
	// } else {
	return (
		<NavigationContainer
			linking={{
				prefixes: [
					"http://localhost:19006/",
					"http://192.168.0.11:19006/",
					"https://myweeks.vercel.app",
				],
				config: {
					screens: {
						SignIn: "/signin",
						SignUp: "/signup",
						Onboarding: "/onboarding",
						BottomTabs: {
							// path: "bottomtabs",
							screens: {
								Week: "/week",
								Plan: "/plan",
								Profile: "/profile",
							},
						},
					},
				},
			}}
		>
			<Stack.Navigator
				headerMode="screen"
				screenOptions={{
					headerStyle: {},
					headerTitleAlign: "center",
					headerShown: false,
				}}
				initialRouteName={initialRoute}
			>
				<Stack.Screen
					name="BottomTabs"
					component={BottomTabs}
					options={{}}
				/>

				<Stack.Screen
					name="SignIn"
					component={SignIn}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="SignUp"
					component={SignUp}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Onboarding"
					component={Onboarding}
					options={{
						headerShown: false,
					}}
				/>

				
				
			</Stack.Navigator>
		</NavigationContainer>
	);
	// }
};

export default Routes;
