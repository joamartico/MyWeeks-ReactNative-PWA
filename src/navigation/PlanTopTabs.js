// import React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Plan from "../screens/Plan";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const Tab = createMaterialTopTabNavigator();

// const PlanTopTabs = () => {
// 	const insets = useSafeAreaInsets();
// 	return (
// 		<Tab.Navigator
// 			swipeVelocityImpact={100}
			
// 			backBehavior="none"
// 			tabBarOptions={
// 				{
// 					style: {
// 						paddingTop: 30
// 					}
// 					// activeTintColor: '#',
// 				}
// 			}
// 		>
// 			<Tab.Screen
// 				name="Month"
// 				component={Plan}
// 				initialParams={{ time: "month" }}
// 			/>
// 			<Tab.Screen
// 				name="Year"
// 				component={Plan}
// 				initialParams={{ time: "year" }}
// 			/>
// 			<Tab.Screen
// 				name="FiveYears"
// 				component={Plan}
// 				initialParams={{ time: "fiveyears" }}
// 				options={{
// 					title: "five years",
// 				}}
// 			/>
// 			<Tab.Screen
// 				name="TenYears"
// 				component={Plan}
// 				initialParams={{ time: "tenyears" }}
// 				options={{
// 					title: "ten years",
// 				}}
// 			/>
// 		</Tab.Navigator>
// 	);
// };

// export default PlanTopTabs;
