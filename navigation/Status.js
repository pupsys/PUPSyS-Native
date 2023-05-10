// Library Imports
import { useContext, } from 'react';
import { Dimensions, Image, View, } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { LineChart, } from "react-native-chart-kit";

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Context Imports
import { DarkContext, DevicesContext, SensorContext } from '../Context';

// API Imports
import { buttonImages, navigationImages, statusImages, } from "../api/image";
import { statusTabsPages, } from "../api/navigation";
import { 
  averagedAdc, 
  getGraphLabels, 
  getHumidityColor,
  getHumidityColorOverall, 
  getHumiditySource, 
  getPressureColor,
  getPressureColorOverall,
  getPressureSource,
  getScaledAdc, 
  getTemperatureColor,
  getTemperatureColorOverall,
  getTemperatureSource,
  thresholds, } from '../api/sensor'; 

// Component Imports
import { PauseButton, } from "../components/Button";
import { Divider, GradientCard, } from "../components/Card";
import { StyledText, } from '../components/Text';

/** Navigator for all status tabs */
const StatusTabs = createBottomTabNavigator();

/** Width of graphs relative to screen width */
const GRAPHSCALE = 0.85;

/**
 * Component to hold Status Tabs
 * @param {Object} props - Component properties
 * @param {ReactNavigation} props.navigation - Navigation object from AppStack 
 * @returns {React.Component} - Navigator component for Status pages
 */
export default function Status({navigation}) {

    // Get Context
    const { dark } = useContext(DarkContext);
    
    // Render Status tabs
    return (
      <View style={{height: '100%'}}>
        <StatusTabs.Navigator
          initialRouteName={statusTabsPages.SENSORS}
          backBehavior="none"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, size}) => {
              // Get the icon for each tab by darkmode value and tab name
              let imgSrc;
              let routeName = route.name;
              if (routeName === statusTabsPages.OVERALL) {
                imgSrc = focused ? navigationImages.sensorsTabs.OVERALLSELECTED : dark ? navigationImages.sensorsTabs.OVERALLDARK : navigationImages.sensorsTabs.OVERALLLIGHT;
              } else if (routeName === statusTabsPages.SENSORS) {
                imgSrc = focused ? navigationImages.sensorsTabs.SENSORSSELECTED : dark ? navigationImages.sensorsTabs.SENSORSDARK : navigationImages.sensorsTabs.SENSORSLIGHT;
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
          <StatusTabs.Screen name={statusTabsPages.OVERALL} component={Overall}/>
          <StatusTabs.Screen name={statusTabsPages.SENSORS} component={Sensors}/>
        </StatusTabs.Navigator>
      </View>
    )
}

/**
 * Component for displaying all sensor data at the same time
 */
function Overall() {

  // Get context
  const { devices } = useContext(DevicesContext);
  const { dark } = useContext(DarkContext);

  /**
   * Component to display a card with list of all connected devices and their pressure readings
   * @param {Objects} props - Component properties
   * @param {string} props.reading - Reading to display from device
   * @param {number} props.orange - Orange threshold
   * @param {number} props.red - Red threshold
   * @returns {React.Component} - ScrollView populated with a header and {@link DeviceListItem}
   */
  function DeviceList({reading, orange, red}) {

    /**
     * Component for rendering a device in BLE devices list
     * @param {Object} props - Component properties
     * @param {boolean} props.header - Whether this is the header
     * @param {Object} props.device - Device object
     * @returns {React.Component} - View acting as a ListItem for a device
     * @see {@link devices}
     */
    function DeviceListItem({header, device}) {

      /**
       * Get color of reading by thresholds {@link orange} and {@link red}
       * @returns {string} - Color key string
       */
      function getBackgroundColor() {
        // Guard clauses
        if (header)           { return; } // This is the header 
        if (!device[reading]) { return; } // Somehow there is no 
        
        if (device[reading] >= red) {
          return globalColors.redAlpha;
        }
        if (device[reading] >= orange) {
          return globalColors.orangeAlpha;
        }
      }

      // Render device in a View
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 2,
            backgroundColor: getBackgroundColor()
          }}
        >
          <StyledText text={header ? "#" : `${device.id + 1}`} width="10%" align="center"/>
          <Divider vertical={true}/>
          <StyledText text={header ? "Location" : device.location} width="50%"/>
          <Divider vertical={true}/>
          <StyledText text={header ? "Reading" : device[reading]} width="40%"/>
        </View>
      )
    }
      /**
       * Map BLE devices to list items
       */
      function renderBLEDevices() {
        return devices.map((device, index) => {
          return <DeviceListItem key={index} device={device}/>
        })
      }

      return (
        <ScrollView
            style={{
              backgroundColor: dark ? darkTheme.tabBarColor : lightTheme.tabBarColor,
              width: "100%",
              padding: 10,
              marginTop: 10,
              borderColor: dark ? darkTheme.cardBorder : lightTheme.cardBorder,
              borderWidth: 1,
              borderRadius: 5,
            }}
            >
              <DeviceListItem header={true}/>
              <Divider />
              { renderBLEDevices() }
        </ScrollView>
      )
    }

  /**
   * Component to display overall pressure readings
   * @returns {React.Component} - Overall pressure readings in a GradientCard
   */
  function PressureOverall() {

    /** Overall pressure color */
    const pressureOverallColor = getPressureColorOverall(devices);

    return (
      <GradientCard flexDirection="column" gradient={pressureOverallColor}>
        <StyledText text="Pressure (mmHg)" />
        <Divider marginTop={10} marginBottom={10}/>
        <CenteredChart data={exampleOverallPressureData} color={pressureOverallColor} />
        <DeviceList reading="pressure" orange={thresholds.pressure.ORANGE} red={thresholds.pressure.RED}/>
        <Divider marginTop={10} marginBottom={10}/>
        <Summary color={pressureOverallColor} />
      </GradientCard>
    );
  }

  /**
   * Component to display overall temperature readings
   * @returns {React.Component} - Overall temperature readings in a GradientCard
   */
  function TemperatureOverall() {

    /** Overall temperature color */
    const temperatureOverallColor = getTemperatureColorOverall(devices);

    return (
      <GradientCard flexDirection="column" gradient={temperatureOverallColor}>
        <StyledText text="Temperature (°C)" />
        <Divider marginTop={10} marginBottom={10}/>
        <CenteredChart data={exampleOverallPressureData} color={temperatureOverallColor} />
        <DeviceList reading="temperature" orange={thresholds.temperature.ORANGE} red={thresholds.temperature.RED}/>
        <Divider marginTop={10} marginBottom={10}/>
        <Summary color={temperatureOverallColor} />
      </GradientCard>
    );
  }

  /**
   * Component to display overall humidity readings
   * @returns {React.Component} - Overall humidity readings in a GradientCard
   */
  function HumidityOverall() {

    /** Overall humidity color */
    const humidityOverallColor = getHumidityColorOverall(devices);

    return (
      <GradientCard flexDirection="column" gradient={humidityOverallColor}>
        <StyledText text="Humidity (%)" />
        <Divider marginTop={10} marginBottom={10}/>
        <CenteredChart data={exampleOverallPressureData} color={humidityOverallColor} />
        <DeviceList reading="humidity" orange={thresholds.humidity.ORANGE} red={thresholds.humidity.RED}/>
        <Divider marginTop={10} marginBottom={10}/>
        <Summary color={humidityOverallColor} />
      </GradientCard>
    );
  }

  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      <PressureOverall />
      <TemperatureOverall />
      <HumidityOverall />
    </ScrollView>
  )
}

/**
 * Component for displaying sensors separately from one another
 */
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
   * @param {Object} props.device device from DevicesContext
   * @returns {React.Component} - A GradientCard with sensor data displays
   */
  function SensorCard({device}) {

    /** This device's pressure color */
    const pressureColor = getPressureColor(device);
    /** This device's temperature color */
    const temperatureColor = getTemperatureColor(device);
    /** This device's humidity color */
    const humidityColor = getHumidityColor(device);
    /** Get colors of all readings */
    const allColors = [ pressureColor, temperatureColor, humidityColor ];

    /**
     * Get the border color by picking the most extreme color of any reading
     * @returns {string} - Color key string
     */
    function getSummaryColor() {

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
     * Change the current device's paused status
     */
    function togglePaused() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      // Set current device's logTo to value of text field
      newDevices[device.id].paused = !newDevices[device.id].paused;
      // Update state
      setDevices(newDevices);
    }

    /**
     * Component to display humidity device
     */
    function HumidityReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getHumiditySource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={device.paused ? "..." : `${device.humidity}%`} 
            marginLeft={5} 
            marginRight={5} 
            color={humidityColor}
          />
        </View>
      )
    }

    /**
     * Component to display temperature device
     */
    function TemperatureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center">
          <Image 
            source={getTemperatureSource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={device.paused ? "..." : `${device.temperature}°C`} 
            marginLeft={5} 
            marginRight={5} 
            color={temperatureColor}
          />
        </View>
      )
    }

    /**
     * Component to display pressure device
     */
    function PressureReading() {
      return (
        <View display="flex" flexDirection="row" alignItems="center" >
          <Image 
            source={getPressureSource(device)}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <StyledText 
            text={device.paused ? "..." : `${device.pressure}mmHg`} 
            marginLeft={5} 
            marginRight={5} 
            color={pressureColor}
          />
        </View>
      )
    }

    /**
     * Components to show graphs so long as card is expanded
     * @returns {React.Component} - View with three graphs
     */
    function Graphs() {
      // Guard clauses:
      if (!device.expanded) { return; } // Card is not expanded
      
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
            <StyledText text="Pressure (adc)" marginLeft={5} color={pressureColor} />
          </View>
          { device.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart device={examplePressureDevice} color={pressureColor} /> }
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
              source={getTemperatureSource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Temperature (°C)" marginLeft={5} color={temperatureColor} />
          </View>
          { device.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart device={exampleTemperatureDevice} color={temperatureColor} /> }
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
              source={getHumiditySource()}
              style={{
                width: 30,
                height: 30,
              }}
            />
            <StyledText text="Humidity (%)" marginLeft={5} color={humidityColor} />
          </View>
          { device.paused  ? <StyledText text="Sensor Paused" width="100%" marginBottom={5} /> : <CenteredChart device={exampleHumidityDevice} color={humidityColor} /> }
        </View>
      )
    }

    /**
     * Toggle device expanded status
     */
    function toggleExpanded() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      // Set current device's logTo to value of text field
      newDevices[device.id].expanded = !newDevices[device.id].expanded;
      // Update state
      setDevices(newDevices);
    }

    return (
      <GradientCard
        flexDirection="column"
        justifyContent="center"
        gradient={getSummaryColor()}
        onClick={toggleExpanded}
        disabled={device.paused}
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
          <StyledText text={`Sensor ${device.id + 1}: ${device.location}`} fontWeight="bold" />
          <Image 
            source={dark ? buttonImages.ARROWDOWNDARK : buttonImages.ARROWDOWNLIGHT}
            style={{
              width: 40,
              height: 40,
              transform: [{ rotate: device.expanded ? "0deg" : "180deg" }],
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
        { device.expanded && <Divider /> }
        <Graphs />
        { !device.paused && <Summary color={getSummaryColor()} /> /* Only show summary if unpaused */ }
        { device.expanded && <PauseButton paused={device.paused} onClick={togglePaused}/> }
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

/**
 * Component to render a chart with a provided data
 * @param {Object} props - Component properties
 * @param {Object} props.data - Chart data
 * @param {string} props.color - Line color
 * @returns {React.Component} - A custom styled LineChart
 */
function CenteredChart({data, color}) {

  const {dark} = useContext(DarkContext)

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LineChart
        data={data}
        segments={4}
        width={Dimensions.get("window").width * GRAPHSCALE} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        withVerticalLines={false}
        chartConfig={{
          backgroundColor: dark ? darkTheme.cardFill : lightTheme.cardFill,
          backgroundGradientFrom: dark ? darkTheme.cardFill : lightTheme.cardFill,
          backgroundGradientTo: dark ? darkTheme.cardFill : lightTheme.cardFill,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => color,
          labelColor: () => dark ? darkTheme.textPrimary : lightTheme.textPrimary,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: dark ? darkTheme.textPrimary : lightTheme.textPrimary,
          },
          propsForBackgroundLines: {
            opacity: 0.2,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  )
}

/**
 * Summary component displaying smiley icon and text based on color input
 * @param {Object} props - Component properties
 * @param {string} props.color - Color key for summary
 * @returns {React.Component} - View with Image and StyledText for overall sensor readings
 */
function Summary({color}) {
  
    /**
     * Get the summary text based on card's background color
     * @returns {string} - Summary string ("Act Now", "Pay Attention", or "Good Job")
     */
    function getSummaryText() {
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
     * @returns {Image} - Image source
     */
    function getSummarySource() {
      if (color === globalColors.red) {
        return statusImages.faces.ACTNOW;
      }
      if (color === globalColors.orange) {
        return statusImages.faces.PAYATTENTION;
      }
        return statusImages.faces.GOODJOB;
    }

    return (
      <View display="flex" flexDirection="row" alignItems="center" >
        <Image source={getSummarySource()} style={{height: 20, width: 20}}/>
        <StyledText text={getSummaryText()} color={color} marginLeft={10}/>
      </View>
    )
}

const examplePressureData = {
  labels: getGraphLabels(averagedAdc),
  datasets: [
    {
      data: averagedAdc
    }
  ]
};

const exampleOverallPressureData = {
  labels: getGraphLabels(averagedAdc),
  datasets: [
    {
      data: averagedAdc
    },
    {
      data: getScaledAdc(.5)
    },
    {
      data: getScaledAdc(.8)
    },
    {
      data: getScaledAdc(.6)
    }
  ]
};

const exampleTemperatureData = {
  labels: getGraphLabels(
    [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  ),
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
};

const exampleHumidityData = {
  labels: getGraphLabels(
    [
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  ),
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
};