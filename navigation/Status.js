// Library Imports
import { useContext, useState, } from 'react'
import { Image, View, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { LineChart } from "react-native-chart-kit";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, DevicesContext, } from '../Context'

// Component Imports
import { PauseButton, } from "../components/Button"
import { Divider, GradientCard, } from "../components/Card";
import { StyledText } from '../components/Text';

/** Navigator for all status tabs */
const StatusTabs = createBottomTabNavigator();

const tabNames = {
  OVERALL: "Overall",
  SENSORS: "Sensors",
};

export default function Status({navigation}) {

    // Get Context
    const { dark } = useContext(DarkContext);
    
    // Render Status tabs
    return (
      <View style={{height: '100%'}}>
        <StatusTabs.Navigator
          initialRouteName={tabNames.SENSORS}
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
    </View>
  )
}

function Sensors() {
  
  // Get Context
  const { dark } = useContext(DarkContext);

  // Get data from sensors over BLE
  const { devices, setDevices } = useContext(DevicesContext);

  /**
   * Render a sensor card for each sensor in {@link sensorData}
   */
  function renderSensorCards() {
    // Guard Clauses:
    if (!devices) { return; } // No sensor data exists, so we shouldn't try to render anything

    return devices.map((devices, index) => {
      return <SensorCard key={index} data={devices} />
    });
  }

  /**
   * A component for rendering sensor data
   */
  function SensorCard({data}) {

    const [expanded, setExpanded] = useState(false); // Whether card expanded or not

    /**
     * Get the border color by picking the most extreme color of any reading
     * @returns color key
     */
    function getSummaryColor() {
      /** Get colors of all sensors */
      const allColors = [getPressureColor(), getTemperatureColor(), getHumidityColor()];
      // If any of the colors are red, make the card red
      for (const readingColor of allColors) {
        if (readingColor === globalColors.red) {
          return readingColor;
        }
      }
      // If any of the colors are orange, make the card orange
      for (const readingColor of allColors) {
        if (readingColor === globalColors.orange) {
          return readingColor;
        }
      }
      // Everything is well! Make the card green.
      return globalColors.green;
    }

    /**
     * Get the color of pressure text
     * @returns color key
     */
    function getPressureColor() {
      if (data.pressure >= 350) {
        return globalColors.red;
      }
      if (data.pressure >= 320) {
        return globalColors.orange;
      }
      return "primary";
    }

    /**
     * Get the image source for pressure icon based on reading color
     * @returns image source
     */
    function getPressureSource() {
      const color = getPressureColor();
      if (color === globalColors.red) {
        return require("../assets/images/PressureRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/PressureOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/PressureDark.png") : require("../assets/images/PressureLight.png");
    }

    /**
     * Get the color of temperature text
     * @returns color key
     */
    function getTemperatureColor() {
      if (data.temperature >= 50) {
        return globalColors.red;
      }
      if (data.temperature >= 40) {
        return globalColors.orange;
      }
      return "primary";
    }

    /**
     * Get the image source for temperature icon based on reading color
     * @returns image source
     */
    function getTemperatureSource() {
      const color = getTemperatureColor();
      if (color === globalColors.red) {
        return require("../assets/images/TemperatureRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/TemperatureOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/TemperatureDark.png") : require("../assets/images/TemperatureLight.png");
    }

    /**
     * Get the color of humidity text
     * @returns color key
     */
    function getHumidityColor() {
      if (data.humidity >= 50) {
        return globalColors.red;
      }
      if (data.humidity >= 25) {
        return globalColors.orange;
      }
      return "primary";
    }

    /**
     * Get the image source for humidity icon based on reading color
     * @returns image source
     */
    function getHumiditySource() {
      const color = getHumidityColor();
      if (color === globalColors.red) {
        return require("../assets/images/HumidityRed.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/HumidityOrange.png");
      }
      // No worries, return theme colored icon
      return dark ? require("../assets/images/HumidityDark.png") : require("../assets/images/HumidityLight.png");
    }

    /**
     * Get the summary text based on card's background color
     * @returns summary string ("Act Now", "Pay Attention", or "Good Job")
     */
    function getSummaryText() {
      const color = getSummaryColor();
      if (color === globalColors.red) {
        return "Act Now";
      }
      if (color === globalColors.orange) {
        return "Pay Attention";
      }
      return "Good Job";
    }

    /**
     * Get the summary image based on card's background color
     * @returns image source
     */
    function getSummarySource() {
      const color = getSummaryColor();
      if (color === globalColors.red) {
        return require("../assets/images/ActNow.png");
      }
      if (color === globalColors.orange) {
        return require("../assets/images/PayAttention.png");
      }
      return require("../assets/images/GoodJob.png");
    }

    /**
     * Change the current device's paused status
     */
    function togglePaused() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      // Set current device's logTo to value of text field
      newDevices[data.id - 1].paused = !newDevices[data.id - 1].paused;
      // Update state
      setDevices(newDevices);
    }

    /**
     * Component to display humidity data
     */
    function HumidityReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getHumiditySource()}
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
      )
    }

    /**
     * Component to display temperature data
     */
    function TemperatureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center">
          <Image 
            source={getTemperatureSource()}
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
      )
    }

    /**
     * Component to display pressure data
     */
    function PressureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getPressureSource()}
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
      )
    }

    /**
     * Components to show graphs so long as card is expanded
     */
    function Graphs() {
      // Guard clauses:
      if (!expanded) { return; } // Card is not expanded
      
      // Render graphs
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            padding: 5,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              padding: 5,
            }}
          >
            <Image 
              source={getPressureSource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Pressure (mmhg)" marginLeft={5} color={getPressureColor()} />
          </View>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={"90%"} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      )
    }

    return (
      <GradientCard
        flexDirection="column"
        justifyContent="center"
        gradient={getSummaryColor()}
        onClick={() => setExpanded(!expanded)}
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
          <StyledText text={`Sensor ${parseInt(data.id)}: ${data.location}`} fontWeight="bold" />
          <Image 
            source={dark ? require("../assets/images/ArrowDownDark.png") : require("../assets/images/ArrowDownLight.png")}
            style={{
              width: 40,
              height: 40,
              transform: [{ rotate: expanded ? "0deg" : "180deg" }],
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
            margin: 5,
          }}
        >
          <PressureReading />
          <TemperatureReading />
          <HumidityReading />
        </View>
        { expanded && <Divider /> }
        <Graphs />
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image source={getSummarySource()} style={{height: 20, width: 20}}/>
          <StyledText text={getSummaryText()} color={getSummaryColor()} marginLeft={10}/>
        </View>
        { expanded && <PauseButton paused={data.paused} onClick={togglePaused}/> }
      </GradientCard>
    )
  }
    
  return (
    <View>
      <ScrollView
        style={{
          padding: 10,
        }}
      >
        { renderSensorCards() }
      </ScrollView>
    </View>
  )
}