import React, { useContext } from "react";
import {
	createBottomTabNavigator,
	BottomTabBar,
	BottomTabView,
} from "@react-navigation/bottom-tabs";
import Week from "../screens/Week";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import Profile from "../screens/Profile";
import Plan from "../screens/Plan";
import PlanTopTabs from "./PlanTopTabs";
import { Context } from "../context/ContextComponent";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	const { setActualRoute } = useContext(Context);
	return (
		<Tab.Navigator
			backBehavior="none"
			tabBarOptions={
				{
					title: "MyWeeks App"
					// activeTintColor: COLORS.primary,
				}
			}
			tabBar={(props) => (
				<BlurView tint="light" intensity={90} style={styles.blurView}>
					<BottomTabBar {...props} style={styles.bottomTabBar} />
				</BlurView>
			)}
		>
			<Tab.Screen
				name="Week"
				component={Week}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="calendar-week"
							size={24}
							color={color}
						/>
					),
				}}
				listeners={({ navigation, route }) => ({
					tabPress: (event) => {
						event.preventDefault();
						console.log(route.name);
						setActualRoute(route.name);
						navigation.replace("BottomTabs", {
							screen: route.name,
						});
					},
				})}
			/>
			<Tab.Screen
				name="Plan"
				component={Plan}
				options={{
					tabBarIcon: ({ color }) => (
						<Fontisto name="map" size={24} color={color} />
					),
				}}
				listeners={({ navigation, route }) => ({
					tabPress: (event) => {
						event.preventDefault();
						console.log(route.name);
						setActualRoute(route.name);
						navigation.replace("BottomTabs", {
							screen: route.name,
						});
					},
				})}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="account"
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	blurView: {
		position: "fixed",
		bottom: 0,
		left: 0,
		right: 0,
	},
	bottomTabBar: {
		backgroundColor: "transparent",
		borderTopColor: "#6666",
	},
});

export default BottomTabs;
