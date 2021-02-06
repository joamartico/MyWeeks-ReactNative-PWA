import React from "react";
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
import Profile from '../screens/Profile';
import Plan from '../screens/Plan';
import PlanTopTabs from './PlanTopTabs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			backBehavior="none"
			tabBarOptions={{
				// activeTintColor: COLORS.primary,
			}}
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
			/>
			<Tab.Screen
				name="Plan"
				component={Plan}
				options={{
					tabBarIcon: ({ color }) => (
						<Fontisto name="map" size={24} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" size={24} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	blurView: {
		position: "absolute",
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
