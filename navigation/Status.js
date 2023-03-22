// Library Imports
import { useContext, useEffect, useState, } from 'react'
import { Image, Pressable, View, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';

// API Imports
import { pageNames, } from '../api/enum';

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, RouteContext, } from '../Context'

// Component Imports
import { Divider, } from "../components/Card";
import { StyledText } from '../components/Text';
import Topbar from "../components/Topbar";

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
  
  // Get Context
  const { dark } = useContext(DarkContext);

  // Get data from sensors over BLE
  const [ sensorData, setSensorData ] = useState(exampleData);
  
  // Update sensor data on mount
  useEffect(() => {
    setSensorData(exampleData);
  }, []);

  /**
   * Render a sensor card for each sensor in {@link sensorData}
   */
  function renderSensorCards() {
    // Guard Clauses:
    if (!sensorData)          { return; } // No sensor data exists, so we shouldn't try to render anything
    if (!sensorData.sensors)  { return; } // No sensor data exists, so we shouldn't try to render anything

    return sensorData.sensors.map((sensorData, index) => {
      return <SensorCard key={index} data={sensorData} />
    });
  }

  /**
   * A component for rendering sensor data
   */
  function SensorCard({data}) {

    /**
     * Get the border color by picking the most extreme color of any reading
     * @returns color key
     */
    function getBorderColor() {
      if (data.pressure > 350 || data.temperature > 50 || data.humidity > 50) {
        return globalColors.red;
      }
      if (data.pressure > 325 || data.temperature > 40 || data.humidity > 25) {
        return globalColors.orange;
      }
      return globalColors.green;
    }

    /**
     * Get the color of pressure text
     * @returns color key
     */
    function getPressureColor() {
      if (data.pressure > 350) {
        return globalColors.red;
      }
      if (data.pressure > 320) {
        return globalColors.orange;
      }
      return "primary";
    }

    /**
     * Get the color of temperature text
     * @returns color key
     */
    function getTemperatureColor() {
      if (data.temperature > 50) {
        return globalColors.red;
      }
      if (data.temperature > 40) {
        return globalColors.orange;
      }
      return "primary";
    }

    /**
     * Get the color of humidity text
     * @returns color key
     */
    function getHumidityColor() {
      if (data.humidity > 50) {
        return globalColors.red;
      }
      if (data.humidity > 25) {
        return globalColors.orange;
      }
      return "primary";
    }

    return (
      <Pressable
        android_ripple={{color: globalColors.greenAlpha}}
        style={{
          borderColor: getBorderColor(),
          borderWidth: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View 
          display="flex" 
          flexDirection="row" 
          aligntItems="center" 
          justifyContent="space-between"
          style={{          
            width: "100%",
          }}
        >
          <StyledText text={`Sensor ${parseInt(data.id)}: ${data.location}`} />
          <Image 
            source={dark ? require("../assets/images/ArrowDownDark.png") : require("../assets/images/ArrowDownLight.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <Divider />
        <View 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
          style={{          
            width: "100%",
            marginTop: 5,
          }}
        >
          <View 
            display="flex" 
            flexDirection="row" 
            alignItems="center" 
          >
            <Image 
              source={dark ? require("../assets/images/PressureDark.png") : require("../assets/images/PressureLight.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText 
              text={`${parseInt(data.pressure)}mmHg`} 
              marginLeft={5} 
              marginRight={5} 
              color={getPressureColor()}
            />
          </View>
          <View 
            display="flex" 
            flexDirection="row" 
            alignItems="center" 
          >
            <Image 
              source={dark ? require("../assets/images/TemperatureDark.png") : require("../assets/images/TemperatureLight.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText 
              text={`${parseInt(data.temperature)}°C`} 
              marginLeft={5} 
              marginRight={5} 
              color={getTemperatureColor()}
            />
          </View>
          <View 
            display="flex" 
            flexDirection="row" 
            alignItems="center" 
          >
            <Image 
              source={dark ? require("../assets/images/HumidityDark.png") : require("../assets/images/HumidityLight.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText 
              text={`${parseInt(data.humidity)}%`} 
              marginLeft={5} 
              marginRight={5} 
              color={getHumidityColor()}
            />
          </View>
        </View>
      </Pressable>
    )
  }
    
  return (
    <View>
      <Topbar title={pageNames.STATUS} />
      <ScrollView
        style={{
          paddingTop: 10,
        }}
      >
        { renderSensorCards() }
      </ScrollView>
    </View>
  )
}

const exampleData = {
  sensors: [
    {
      id: 1,
      location: "Left Hip",
      pressure: 300,
      temperature: 37,
      humidity: 5,
    },
    {
      id: 2,
      location: "Right Hip",
      pressure: 300,
      temperature: 37,
      humidity: 5,
    },
    {
      id: 3,
      location: "Left Heel",
      pressure: 300,
      temperature: 37,
      humidity: 5,
    },
    {
      id: 4,
      location: "Right Heel",
      pressure: 300,
      temperature: 37,
      humidity: 5,
    },
  ]
}