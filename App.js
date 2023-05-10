// Library Imports
import { useEffect, useState, } from "react";
import { StatusBar, View, } from "react-native";
import { NavigationContainer, } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons" 

// Component Imports
import Calibration from "./navigation/Calibration";
import { AppDrawer, navTheme, } from "./components/Navigation";
import Patient from "./navigation/Patient";
import Status from "./navigation/Status2";

// Style Imports
import { darkTheme, lightTheme, } from "./assets/styles";

// API Imports
import { appDrawerPages, } from "./api/navigation";
import { exampleDevices, } from "./api/sensor";
import { examplePatient, } from "./api/patient";

// Context Imports
import { DarkContext, DevicesContext, PatientContext, SensorContext } from "./Context";
import { navigationImages } from "./api/image";
import { generateRandomNumbers } from "./api/simulation";

/**
 * The entire PUPSyS app component. Creates states for all context and returns a Stack Navigator inside all context providers.
 */
function App() {

  // Init. contexts
  const [ dark, setDark ]       = useState(false);          // Current darkmode state
  const [ devices, setDevices ] = useState(exampleDevices); // Current devices
  const [ patient, setPatient ] = useState(examplePatient); // Current patient state
  const [ sensorData, setSensorData ] = useState({ // Current sensor state
    pressure: [],     // Default pressure readings to empty list
    temperature: [],  // Default temperature readings to empty list
    humidity: [],     // Default humidity readings to empty list
  });

  // Render PUPSyS!
  return (
    <SensorContext.Provider  value={{sensorData, setSensorData}}>  
    <PatientContext.Provider  value={{patient, setPatient}}>  
    <DarkContext.Provider     value={{dark, setDark}}>  
    <DevicesContext.Provider  value={{devices, setDevices}}>  
      <StatusBar backgroundColor={dark ? darkTheme.statusBarColor : lightTheme.statusBarColor} />
      <View style={{height: '100%'}}>
        <NavigationContainer theme={navTheme}>
          <AppDrawer.Navigator
            initialRouteName={appDrawerPages.STATUS}
          >
            <AppDrawer.Screen
              component={Status}
              name={appDrawerPages.STATUS}
              options={{
                drawerLabel: "Sensors",
                drawerIcon: ({ color, size }) => (
                  <Icon name={navigationImages.appDrawer.SENSORS} size={size} color={color} />
                ),
              }}
            />
            <AppDrawer.Screen
              component={Patient}
              name={appDrawerPages.PATIENT}
              options={{
                drawerLabel: "Patient Details",
                drawerIcon: ({ color, size }) => (
                  <Icon name={navigationImages.appDrawer.PATIENT} size={size} color={color} />
                ),
              }}
            />
            <AppDrawer.Screen
              component={Calibration}
              name={appDrawerPages.CALIBRATION}
              options={{
                drawerLabel: "Calibration",
                drawerIcon: ({ color, size }) => (
                  <Icon name={navigationImages.appDrawer.CALIBRATION} size={size} color={color} />
                ),
              }}
            />
          </AppDrawer.Navigator>
        </NavigationContainer>
      </View>
    </DevicesContext.Provider>
    </DarkContext.Provider>
    </PatientContext.Provider>
    </SensorContext.Provider>
  );
}3

export default App;