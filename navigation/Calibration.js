// Library Imports
import { useContext, useState } from 'react';
import { Alert, Animated, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PanGestureHandler, } from 'react-native-gesture-handler';

// Context Imports
import { DarkContext, DevicesContext } from '../Context';

// Style Imports
import { darkTheme, globalColors, lightTheme } from '../assets/styles';

// API Imports
import { formatUri } from '../api/strings';
import { exampleDevices } from "../api/sensor";

// Component Imports
import { Divider, GradientCard } from '../components/Card';
import { Entry } from '../components/Input';
import { CenteredTitle, StyledText } from '../components/Text';
import { DropDownButton, SaveButton, StyledButton } from '../components/Button';
import { createStackNavigator } from '@react-navigation/stack';
import { calibrationImages } from '../api/image';


/** Space taken up by entry names */
const fieldNameWidth = 60;

/** List of all possible units */
const allUnits = ["Metric", "Imperial"];
/** List of all possible calibration units */
const allCalibrationUnits = ["g", "oz"];

/** Unit dropdown menu items */
const unitsMenuItems = [
  {value: allUnits[0], label: allUnits[0]},
  {value: allUnits[1], label: allUnits[1]},
]
/** Calibration unit dropdown menu items */
const calibrationUnitsMenuItems = [
  {value: allCalibrationUnits[0], label: allCalibrationUnits[0]},
  {value: allCalibrationUnits[1], label: allCalibrationUnits[1]},
]

/** Stack navigator for calibration */
const CalibrationStack = createStackNavigator();

export default function Calibration({navigation}) {

  // Create some example device data
  const {devices, setDevices} = useContext(DevicesContext);

  // Create other states
  const [unitsMenuOpen, setUnitsMenuOpen] = useState(false);        // Whether the unit dropdown menu is open
  const [units, setUnits]                 = useState(allUnits[0]);  // The currently selected unit
  const [currentDevice, setCurrentDevice] = useState(0);            // The index of the currently selected device
  const [calibrating, setCalibrating]     = useState(false);        // Whether we're showing calibration sequence
  const [sensorLocationModalOpen, setSensorLocationModalOpen] = useState(false); // Whether modal is open

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Change the current device's logTo location
   * @param {string} newUri uri value from text field or DocumentPicker 
   */
  function handleLogToChange(newUri) {
    // Clone devices list
    let newDevices = [];
    for (const d of devices) {
      newDevices.push(d);
    }
    // Set current device's logTo to value of text field
    newDevices[currentDevice].logTo = newUri;
    // Update state
    setDevices(newDevices);
  }

  /**
   * Component to display a card with list of all connected devices
   */
  function DeviceList() {

    /**
     * Component for rendering a device in BLE devices list
   * @param {Object} props - Component properties
     * @param {boolean} props.header whether or not this is the header
     * @param {Object} props.device device object
     * @see {@link devices}
     */
    function DeviceListItem({header, device}) {
    
      /**
       * Handle click on a device.
       * Set device to current if we're not in calibration
       */
      function handleClick() {
        // Guard clauses:
        if (header)       { return; }  // This is the header, not a device
        if (calibrating)  { return; }  // We're calibrating right now, so it isn't safe to change devices
        
        // Set the current device
        setCurrentDevice(device.id);
      }
    
      /**
       * Set background color of selected device to greenAlpha
       * @returns color key
       */
      function getBackgroundColor() {
        // Guard clauses:
        if (header) { return; } // This is not a device, this is the header
      
        if (currentDevice === device.id) {
          // If this is the current device, return greenAlpha
          return globalColors.greenAlpha;
        }
      }
    
      // Render device in a Pressable
      return (
        <Pressable
          android_ripple={header ? null : {color: globalColors.greenAlpha}}
          onPress={handleClick}
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
          <StyledText text={header ? "Name" : device.name} width="50%"/>
          <Divider vertical={true}/>
          <StyledText text={header ? "Signal" : device.signal} width="40%"/>
        </Pressable>
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
      <ScrollView>
        <GradientCard flexDirection="column" gradient="white" justifyContent="flex-start" alignItems="flex-start">
          <StyledText text="BLE Devices:" marginBottom={5}/>
          <Divider />
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
        </GradientCard>
      </ScrollView>
    )
  }

  /**
   * Open the file browser and set delected directory as log location
   */
  async function openFileBrowser() {
    try {
      // Open picker
      const result = await DocumentPicker.pickDirectory();
      // Handle result
      handleLogToChange(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Cancelled
        console.log('User cancelled the picker');
      } else {
        // Otherwise, throw the error for handling later (maybe)
        throw err;
      }
    }
  }

  /**
   * Component to display all sensor details. Shown when not running calibration.
   * @param {Object} props - Component properties
   * @param {ReactNavigation} props.navigation navigation object from {@link CalibrationStack}
   */
  function SensorDetails({navigation}) {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            padding: 10
          }}
        >
          <StyledText text="Sensor Location:" marginRight={5}/>
          <DropDownButton text={devices[currentDevice].location} onClick={() => navigation.navigate("sensorLocation")}/>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            padding: 10
          }}
        >
          <View style={{width: fieldNameWidth}}>
            <StyledText text="Log To:" marginRight={5}/>
          </View>
          <Entry 
            width="65%" 
            height={50} 
            placeholderText="Log Location" 
            value={formatUri(devices[currentDevice].logTo)} 
            onChange={t => handleLogToChange(t)}
            textAlign="left"
          />
          <SaveButton onClick={openFileBrowser}/>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            padding: 10
          }}
        >
          <View style={{width: fieldNameWidth}}>
            <StyledText text="Units:" marginRight={5} />
          </View>
          <DropDownPicker
            open={unitsMenuOpen}
            value={units}
            items={unitsMenuItems}
            onPress={() => setUnitsMenuOpen(!unitsMenuOpen)}
            onSelectItem={(item) => {setUnits(item.value); setUnitsMenuOpen(false);}}
            showArrowIcon={true}
            searchable={false}
            dropDownContainerStyle={{
              backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
              borderWidth: 0,
              borderRadius: 0,
              width: 120
            }}
            containerStyle={{
              width: 120,
            }}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderRadius: 0,
              backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
            }}
          />
        </View>
      </View>
    )
  }

  /**
   * Component to show calibration sequence for selected sensor.
   */
  function CalibrationSequence() {

    // Create states
    const [calibrationStep, setCalibrationStep]                   = useState(1);                        // Which step in calibration we're on
    const [currentWeight, setCurrentWeight]                       = useState(null);                     // Weight of current calibration step
    const [calibrationUnitsMenuOpen, setCalibrationUnitsMenuOpen] = useState(false);                    // Whether or not the unit dropdown menu is open
    const [calibrationUnits, setCalibrationUnits]                 = useState(allCalibrationUnits[0]);   // The currently selected unit
    const [calibrationReadings, setCalibrationReadings]           = useState([null, null, null]);       // Weights entered during calibration

    /**
     * Component to display current calibration state
     */
    function CalibrationProgress() {

      
    /**
     * Component for showing calibration progress
     * @param {number} props.number which stage of calibration this dot represents
     */
    function CalibrationDot({number}) {
      
      // Determine state of calibration
      let state = 0;
      if (calibrationStep >= number) {
        state = 2
      }
      if (calibrationStep === number) {
        state = 1
      }

      /**
       * Get color of calibration progress dot by state param
       * @returns color key
       */
      function getDotColor() {
        if (state === 0) {
          return dark ? darkTheme.buttonFill : lightTheme.buttonFill;
        }
        if (state === 1) {
          return globalColors.greenAlpha;
        }
        return globalColors.green;
      }
      
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledText text={parseInt(number)} />
          <View 
            style={{
              margin: 10,
              height: 16,
              width: 16,
              borderRadius: 10,
              borderColor: dark ? darkTheme.buttonBorder : lightTheme.buttonBorder,
              borderWidth: 1,
              backgroundColor: getDotColor(),
            }}
          />
        </View>
      )
    }

      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalibrationDot number={1} />
          <CalibrationDot number={2} />
          <CalibrationDot number={3} />
        </View>
      )
    }

    /**
     * Handle submit button click.
     * Convert to grams and set current device's calibration stage to text box value.
     */
    function handleSubmit() {
      // Convert to grams
      let grams = currentWeight;
      if (calibrationUnits === "kg") {
        grams /= 1000;
      } else if (calibrationUnits === "lb") {
        grams /= 453.592;
      } else if (calibrationUnits === "oz") {
        grams /= 28.3495;
      }

      // Update readings
      let newReadings = [];
      for (const r of calibrationReadings) {
        newReadings.push(r);
      }
      newReadings[calibrationStep -1] = grams;

      // Move on to next step
      setCurrentWeight(null);
      if (calibrationStep <= 2) {
        // There are next steps
        setCalibrationReadings(newReadings);
        setCalibrationStep(calibrationStep + 1);
      } else {
        // No next step— reset and save to device
        setCalibrationStep(0);
        setCalibrating(false);
        confirmReadings();
      }
    }

    /**
     * Push readings from calibration to device
     */
    function confirmReadings() {
      // Clone devices list
      let newDevices = [];
      for (const d of devices) {
        newDevices.push(d);
      }
      newDevices[currentDevice].calibration = calibrationReadings;
      setCalibrationReadings([null, null, null]);
    }

    /**
     * Component for entering weights during a calibration step
     */
    function CalibrationForm() {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <StyledText text={`Weight ${calibrationStep}:`} width={100}/>
          <Entry width="25%" height={50} placeholderText="0" value={currentWeight ? currentWeight.toString() : null} onChange={t => setCurrentWeight(parseInt(t))} numeric={true}/>
          <DropDownPicker
            open={calibrationUnitsMenuOpen}
            value={calibrationUnits}
            items={calibrationUnitsMenuItems}
            onPress={() => setCalibrationUnitsMenuOpen(!calibrationUnitsMenuOpen)}
            onSelectItem={(item) => {setCalibrationUnits(item.value); setCalibrationUnitsMenuOpen(false);}}
            showArrowIcon={true}
            searchable={false}
            dropDownContainerStyle={{
              backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
              borderWidth: 0,
              borderRadius: 0,
              width: 60,
            }}
            containerStyle={{
              width: 60,
              marginLeft: 10,
            }}
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderRadius: 0,
              backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
            }}
          />
        </View>
      )
    }

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CalibrationProgress />
        <CalibrationForm />
        <StyledButton text="Submit" disabled={!currentWeight} onClick={handleSubmit}/>
      </View>
    )
  }

  /**
   * Component for buttons related to calibration
   */
  function CalibrationActions() {

    /**
     * Display an alert to disconnect the device
     */
    function handleDisconectClick() {

      /**
       * Remove device from device list
       */
      function confirmDisconnect() {
        // Filter out current device
        let newDevices = [];
        for (let i = 0; i < devices.length; i++) {
          if (i !== currentDevice) {
            const d = devices[i];
            d.id = i;
            newDevices.push(d);
          }
        }
        if (currentDevice === devices.length - 1) {
          setCurrentDevice(currentDevice - 1);
        }
        setDevices(newDevices);
      }

      // Alert user
      Alert.alert("Disconnect", `Disconnect device "${devices[currentDevice].name}"?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          onPress: () => confirmDisconnect(),
          style: 'destructive',
        },
      ])
    }

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: "center",
          padding: 5,
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <StyledButton text={!calibrating ? "Calibrate" : "Cancel"} onClick={() => setCalibrating(!calibrating)}/>
        <StyledButton text="Disconnect" color={!calibrating ? "red" : null} disabled={calibrating} onClick={handleDisconectClick}/>
      </View>
    )
  }
  
  /**
   * Component to show a reset devices button when calibration sequence is not active
   */
  function ResetDevicesButton() {
    // Guard causes:
    if (calibrating) { return; } // Don't show reset button during calibration sequence

    /**
     * Reset device state (for testing)
     */
    function resetDevices() {
      setDevices(exampleDevices);
    }
    
    return (
      <View 
        style={{
          width: "100%",
          alignItems: "center",
          padding: 5,
        }}
        >
        <StyledButton text="Reset Devices" onClick={resetDevices}/>
      </View>
    )
  }

  /**
   * Component to display sensor location picker in navigation
   * @param {Object} props - Component properties
   * @param {ReactNavigation} props.navigation navigation object from {@link CalibrationStack}
   */
  function SensorLocationScreen({navigation}) {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          padding: 10,
          elevation: 5,
          borderColor: dark ? darkTheme.cardBorder : lightTheme.cardBorder,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: dark ? darkTheme.cardFill : lightTheme.cardFill,
          borderRadius: 10,
        }}
      >
        <CenteredTitle text="Sensor Location" />
        <DraggableSensorIcon iconSource={calibrationImages.SENSORICON} />
        <StyledButton text="Done" onClick={() => navigation.navigate("default")} />    
      </View>
    )
  }

  /**
   * Component to display default calibration screen w/ device list and actions
   * @param {Object} props - Component properties
   * @param {ReactNavigation} props.navigation navigation object from {@link CalibrationStack}
   */
  function DefaultCalibrationScreen({navigation}) {
    return (
      <View
        style={{
          padding: 10,
        }}
      >
        <DeviceList />
        <CalibrationActions />
        <ResetDevicesButton />
        { calibrating ? <CalibrationSequence /> : <SensorDetails navigation={navigation}/> /** Show sensor details or calibration sequence */ }
      </View>
    )
  }
  
  return (
    <CalibrationStack.Navigator 
      initialRouteName='default'
      screenOptions={{
        headerShown: false,
      }}
    >
      <CalibrationStack.Screen name="default" component={DefaultCalibrationScreen} />
      <CalibrationStack.Screen name="sensorLocation" component={SensorLocationScreen} />
    </CalibrationStack.Navigator>
  )
}

/**
 * A draggable sensor icon overlaid on top of an image.
 * @param {Object} props - Component properties.
 * @param {Image} props.iconSource - The source of the sensor icon image.
 */
function DraggableSensorIcon({ iconSource }) {
  
  // Get context
  const { dark } = useContext(DarkContext)

  /**
   * Styles for the DraggableSensorIcon component.
   * @type {Object}
   */
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderColor: dark ? darkTheme.cardBorder : lightTheme.cardBorder,
      borderWidth: 1,
      borderRadius: 5,
    },
    icon: {
      position: 'absolute',
    },
    iconImage: {
      width: 30,
      height: 30,
    },
  });

  /**
   * The current position of the sensor icon.
   * @type {Object}
   * @property {number} x - The x-coordinate of the sensor icon.
   * @property {number} y - The y-coordinate of the sensor icon.
   */
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });

  /**
   * Handles the gesture event to update the icon position.
   * @param {Object} event - The gesture event object.
   */
  function handleGesture(event) {
    const { translationX, translationY } = event.nativeEvent;
    console.log( iconPosition.x, iconPosition.y );
    setIconPosition({ x: translationX, y: translationY });
  };

  return (
    <View style={styles.container}>
      <Image source={calibrationImages.HUMANDIAGRAM} style={styles.backgroundImage} />
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[styles.icon, { transform: [{ translateX: iconPosition.x }, { translateY: iconPosition.y }] }]}>
          <Image source={iconSource} style={styles.iconImage} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};