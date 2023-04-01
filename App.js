// Library Imports
import { useState, } from "react";
import { StatusBar, View, } from "react-native";
import { DefaultTheme, NavigationContainer, } from "@react-navigation/native";
import { createDrawerNavigator, } from "@react-navigation/drawer"; 

// Component Imports
import Calibration from "./navigation/Calibration";
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
 * The main App Stack navigator, allowing the user to visit pages not contained within the mainPage bottom tab navigation 
 * @constant
 */
export const AppDrawer = createDrawerNavigator();

/** 
 * AppDrawer navigation theme inherits from the {@link DefaultTheme} and sets the navigation's background color to transparent 
 * @constant
 * */
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

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
            <AppDrawer.Screen name={pageNames.STATUS}      component={Status}      />
            <AppDrawer.Screen name={pageNames.PATIENT}     component={Patient}     />
            <AppDrawer.Screen name={pageNames.CALIBRATION} component={Calibration} />
          </AppDrawer.Navigator>
        </NavigationContainer>
      </View>
    </DevicesContext.Provider>
    </DarkContext.Provider>
  );
}

export default App;