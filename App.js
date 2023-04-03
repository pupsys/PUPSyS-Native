// Library Imports
import { useState, } from "react";
import { StatusBar, View, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons" 

// Component Imports
import Calibration from "./navigation/Calibration";
import { AppDrawer, navTheme, } from "./components/Navigation";
import Patient from "./navigation/Patient";
import Status from "./navigation/Status";

// Style Imports
import { darkTheme, lightTheme } from "./assets/styles";

// API Imports
import { pageNames, } from "./api/enum";
import { exampleDevices, } from "./api/sensor";

// Context Imports
import { DarkContext, DevicesContext, } from "./Context";

/**
 * The entire PUPSyS app component. Creates states for all context and returns a Stack Navigator inside all context providers.
 */
function App() {

  // Init. contexts
  const [ dark, setDark ] = useState(false);
  const [ devices, setDevices ] = useState(exampleDevices);

  // Render PUPSyS!
  return (
    <DarkContext.Provider value={{dark, setDark}}>  
    <DevicesContext.Provider value={{devices, setDevices}}>  
      <StatusBar backgroundColor={dark ? darkTheme.statusBarColor : lightTheme.statusBarColor} />
      <View style={{height: '100%'}}>
        <NavigationContainer theme={navTheme}>
          <AppDrawer.Navigator
            initialRouteName={pageNames.STATUS}
          >
            <AppDrawer.Screen
              component={Status}
              name={pageNames.STATUS}
              options={{
                drawerLabel: "Sensors",
                drawerIcon: ({ color, size }) => (
                  <Icon name="heart-outline" size={size} color={color} />
                ),
              }}
            />
            <AppDrawer.Screen
              component={Patient}
              name={pageNames.PATIENT}
              options={{
                drawerLabel: "Patient Details",
                drawerIcon: ({ color, size }) => (
                  <Icon name="person-outline" size={size} color={color} />
                ),
              }}
            />
            <AppDrawer.Screen
              component={Calibration}
              name={pageNames.CALIBRATION}
              options={{
                drawerLabel: "Calibration",
                drawerIcon: ({ color, size }) => (
                  <Icon name="settings-outline" size={size} color={color} />
                ),
              }}
            />
          </AppDrawer.Navigator>
        </NavigationContainer>
      </View>
    </DevicesContext.Provider>
    </DarkContext.Provider>
  );
}3

export default App;