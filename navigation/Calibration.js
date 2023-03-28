// Library Imports
import { useContext, useState, } from 'react'
import { ActivityIndicator, ScrollView, Pressable, View, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

// Context Imports
import { DarkContext, } from '../Context';

// Style Imports
import { darkTheme, globalColors, lightTheme, } from '../assets/styles';

// Component Imports
import { Divider, GradientCard, } from '../components/Card';
import { Entry, } from '../components/Input';
import { StyledText, } from '../components/Text';
import { DropDownButton, StyledButton, } from '../components/Button';

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

export default function Calibration({navigation}) {

  // Create some example device data
  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "HT100",
      signal: "-77dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT100",
      location: "Left Hip",
      calibration: [30, 40, 50],
    },
    {
      id: "2",
      name: "HT110",
      signal: "-50dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT110",
      location: "Right Hip",
      calibration: [30, 40, 50],
    },
    {
      id: "3",
      name: "HT120",
      signal: "-111dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT120",
      location: "Left Heel",
      calibration: [30, 40, 50],
    },
    {
      id: "4",
      name: "HT130",
      signal: "-121dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT130",
      location: "Right Heel",
      calibration: [30, 40, 50],
    },
  ]);

  // Create other states
  const [unitsMenuOpen, setUnitsMenuOpen] = useState(false);        // Whether or not the unit dropdown menu is open
  const [units, setUnits]                 = useState(allUnits[0]);  // The currently selected unit
  const [currentDevice, setCurrentDevice] = useState(0);            // The index of the currently selected device
  const [calibrating, setCalibrating]     = useState(false);        // Whether or not we're showing calibration sequence

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Change the current device's logTo location
   * @param {string} t value from logTo text field 
   */
  function handleLogToChange(t) {
    // Clone devices list
    let newDevices = [];
    for (const d of devices) {
      newDevices.push(d);
    }
    // Set current device's logTo to value of text field
    newDevices[currentDevice].logTo = t;
    // Update state
    setDevices(newDevices);
  }

  /**
   * Map BLE devices to list items
   */
  function renderBLEDevices() {
    return devices.map((device, index) => {
      return <DeviceListItem key={index} device={device}/>
    })
  }

  /**
   * Component for rendering a device in BLE devices list
   * @param {boolean} header whether or not this is the header
   * @param {Object} device device object
   * @see {@link devices}
   */
  function DeviceListItem({header, device}) {

    /**
     * Handle click on a device.
     * Set device to current if we're not in calibration
     */
    function handleClick() {
      // Guard clauses:
      if (header) { return; }       // This is the header, not a device
      if (calibrating) { return; }  // We're calibrating right now, so it isn't safe to change devices
      
      // Set the current device
      setCurrentDevice(device.id - 1);
    }

    /**
     * Set background color of selected device to greenAlpha
     * @returns color key
     */
    function getBackgroundColor() {
      // Guard clauses:
      if (header) { return; } // This is not a device, this is the header

      if ((currentDevice + 1) === parseInt(device.id)) {
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
        <StyledText text={header ? "#" : device.id} width="10%" align="center"/>
        <Divider vertical={true}/>
        <StyledText text={header ? "Name" : device.name} width="50%"/>
        <Divider vertical={true}/>
        <StyledText text={header ? "Signal" : device.signal} width="40%"/>
      </Pressable>
    )
  }

  /**
   * Component to display all sensor details. Shown when not running calibration.
   */
  function SensorDetails() {
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
          <DropDownButton text={devices[currentDevice].location}/>
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
          <Entry width="75%" height={50} placeholderText="Log Location" value={devices[currentDevice].logTo} onChange={t => handleLogToChange(t)}/>
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

    const [calibrationStep, setCalibrationStep] = useState(1);    // Which step in calibration we're on
    const [currentWeight, setCurrentWeight]     = useState(null); // Weight of current calibration step

    const [calibrationUnitsMenuOpen, setCalibrationUnitsMenuOpen] = useState(false);        // Whether or not the unit dropdown menu is open
    const [calibrationUnits, setCalibrationUnits]                 = useState(allCalibrationUnits[0]);  // The currently selected unit

    const [loading, setLoading] = useState(false); // Whether or not we're waiting for calibration to complete

    const [calibrationReadings, setCalibrationReadings] = useState([null, null, null]);

    /**
     * Component for showing calibration progress
     * @param {number} number which stage of calibration this dot represents
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
      } else if (calibrationUnits === "lb") {
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
      setLoading(false);
      if (calibrationStep <= 2) {
        setCalibrationReadings(newReadings);
        setCalibrationStep(calibrationStep + 1);
      } else {
        setCalibrationStep(0);
        setCalibrating(false);
        confirmReadings()
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

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <StyledButton text="Submit" disabled={!currentWeight} onClick={handleSubmit}/>
        { loading && <ActivityIndicator size={60} color={globalColors.green} style={{marginTop: 60}} /> }
      </View>
    )
  }

  return (
    <View
      style={{
        padding: 10,
      }}
    >
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: "center",
          padding: 10,
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <StyledButton text={!calibrating ? "Calibrate" : "Cancel"} onClick={() => setCalibrating(!calibrating)}/>
        <StyledButton text="Disconnect" color={!calibrating ? "red" : null} disabled={calibrating} />
      </View>
      { calibrating ? <CalibrationSequence /> : <SensorDetails /> }
    </View>
  )
}