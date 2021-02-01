import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import { authentication } from "../../firebase";
import { Text } from 'react-native';

const Stack = createStackNavigator();

const Routes = () => {
	const [initialRoute, setInitialRoute] = useState(undefined);

	useEffect(() => {
		authentication.onAuthStateChanged((res) => {
			res == null
				? setInitialRoute("SignIn")
				: setInitialRoute("BottomTabs");
			console.log("RES: ", res);
		});
	}, []);

	if (initialRoute == undefined) {
		return <Text>Loading...</Text>;
	} else {
		return (
			<NavigationContainer
				linking={{
					prefixes: [
						"http://localhost:19006/",
						"http://192.168.0.11:19006/",
						"https://myweeks.vercel.app/",
					],
					config: {
						screens: {
							SignIn: "signin",
							SignUp: "signup",
							BottomTabs: {
								path: "bottomtabs",
								screens: {
									Week: "week",
									Plan: "plan",
									Profile: "profile",
								},
							},
						},
					},
				}}
			>
				<Stack.Navigator
					initialRouteName={initialRoute}
					screenOptions={{
						headerStyle: {},
						headerTitleAlign: "center",
						headerShown: false,
					}}
				>
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
						name="BottomTabs"
						component={BottomTabs}
						options={{}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
};

export default Routes;
