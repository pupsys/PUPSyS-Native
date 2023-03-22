// Library Imports
import { useState, } from "react";
import { StatusBar, View, } from "react-native";
import { DefaultTheme, NavigationContainer, } from "@react-navigation/native";
import { createStackNavigator, } from "@react-navigation/stack"; 

// Component Imports
import Calibration from "./navigation/Calibration";
import Patient from "./navigation/Patient";
import Status from "./navigation/Status";

// Style Imports
import { darkTheme, lightTheme } from "./assets/styles";

// API Imports
import { pageNames, } from "./api/enum";

// Context Imports
import { DarkContext, RouteContext, } from "./Context";

/** 
 * The main App Stack navigator, allowing the user to visit pages not contained within the mainPage bottom tab navigation 
 * @constant
 */
export const AppStack = createStackNavigator();

/** 
 * AppStack navigation theme inherits from the {@link DefaultTheme} and sets the navigation's background color to transparent 
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
  const [ currentRoute, setCurrentRoute ] = useState(pageNames.STATUS);

  // Render PUPSyS!
  return (
    <DarkContext.Provider value={{dark, setDark}}>  
    <RouteContext.Provider value={{currentRoute, setCurrentRoute}}>  
      <StatusBar backgroundColor={dark ? darkTheme.statusBarColor : lightTheme.statusBarColor} />
      <View style={{height: '100%'}}>
        <NavigationContainer theme={navTheme}>
          <AppStack.Navigator
            initialRouteName={pageNames.STATUS}
            screenOptions={{
              headerShown: false,
            }}
          >
            <AppStack.Screen name={pageNames.STATUS}      component={Status}      />
            <AppStack.Screen name={pageNames.PATIENT}     component={Patient}     />
            <AppStack.Screen name={pageNames.CALIBRATION} component={Calibration} />
          </AppStack.Navigator>
        </NavigationContainer>
      </View>
    </RouteContext.Provider>
    </DarkContext.Provider>
  );
}

export default App;