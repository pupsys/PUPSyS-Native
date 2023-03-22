// Library Imports
import { useContext, useState, } from 'react'
import { Image, View, } from 'react-native'
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';

// API Imports
import { pageNames, } from '../api/enum';

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, RouteContext, } from '../Context'

// Component Imports
import Topbar from "../components/Topbar";
import { StyledText } from '../components/Text';

/** Navigator for all status tabs */
const StatusTabs = createBottomTabNavigator();

const tabNames = {
  OVERALL: "Overall",
  SENSORS: "Sensors",
};

export default function Status({navigation}) {

    // Get Context
    const { currentRoute, setCurrentRoute } = useContext(RouteContext);
    const { dark } = useContext(DarkContext);

    // Set current route on component mount
    useState(() => {
      setCurrentRoute(pageNames.STATUS);
    }, []);
    
    // Render Status tabs
    return (
      <View style={{height: '100%'}}>
        <StatusTabs.Navigator
          initialRouteName={tabNames.OVERALL}
          backBehavior="none"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              // Get the icon for each tab by darkmode value and tab name
              let imgSrc;
              let routeName = route.name;
              if (routeName === tabNames.OVERALL) {
                imgSrc = focused ? require('../assets/images/PersonSelected.png') : dark ? require('../assets/images/PersonUnselected.png') : require('../assets/images/PersonUnselectedLight.png');
              } else if (routeName === tabNames.SENSORS) {
                imgSrc = focused ? require('../assets/images/SensorsSelected.png') : dark ? require('../assets/images/SensorsUnselected.png') : require('../assets/images/SensorsUnselectedLight.png');
              }
                return <Image style={{width: size, height: size}} source={imgSrc} />
              },
            tabBarActiveTintColor: globalColors.green,
            tabBarInactiveTintColor: dark ? darkTheme.textPrimary : lightTheme.textPrimary,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: dark ? darkTheme.tabBarColor : lightTheme.tabBarColor,
              paddingBottom: 5,
              height: 60, 
              paddingTop: 5,
            },
          })}
        >
          <StatusTabs.Screen name={tabNames.OVERALL} component={Overall}/>
          <StatusTabs.Screen name={tabNames.SENSORS} component={Sensors}/>
        </StatusTabs.Navigator>
      </View>
    )
}

function Overall() {
  return (
    <View>
        <Topbar title={pageNames.STATUS} />
    </View>
  )
}

function Sensors() {
  return (
    <View>
      <Topbar title={pageNames.STATUS} />
    </View>
  )
}

const exampleData = {
    sensors: [
        {
            location: "Left Hip",
            pressure: 300,
            temperature: 37,
            humidity: 5,
        },
        {
            location: "Right Hip",
            pressure: 300,
            temperature: 37,
            humidity: 5,
        },
        {
            location: "Left Heel",
            pressure: 300,
            temperature: 37,
            humidity: 5,
        },
        {
            location: "Right Heel",
            pressure: 300,
            temperature: 37,
            humidity: 5,
        },
    ]
}