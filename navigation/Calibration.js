// Library Imports
import { useContext, useState, } from 'react'
import { ScrollView, Pressable, View, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

// Context Imports
import { DarkContext, } from '../Context';

// Style Imports
import { darkTheme, globalColors, lightTheme, measurements, } from '../assets/styles';

// Component Imports
import { Divider, GradientCard, VerticalDivider, } from '../components/Card';
import { Entry, } from '../components/Input';
import { StyledText, } from '../components/Text';
import { DropDownButton, StyledButton, StyledCheckbox } from '../components/Button';

/** Space taken up by entry names */
const fieldNameWidth = 60;

const allUnits = ["Metric", "Imperial"];

const unitsMenuItems = [
  {value: allUnits[0], label: allUnits[0]},
  {value: allUnits[1], label: allUnits[1]},
]

export default function Calibration({navigation}) {

  // Create states to keep track of whether or not any dropdown menus are open
  const [unitsMenuOpen, setUnitsMenuOpen] = useState(false);

  const [units, setUnits] = useState(allUnits[0]);

  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "HT100",
      signal: "-77dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT100",
      location: "Left Hip",
    },
    {
      id: "2",
      name: "HT110",
      signal: "-50dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT110",
      location: "Right Hip",
    },
    {
      id: "3",
      name: "HT120",
      signal: "-111dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT120",
      location: "Left Heel",
    },
    {
      id: "4",
      name: "HT130",
      signal: "-121dBm",
      logTo: "C:\\Users\\Joe\\PUPSys\\HT130",
      location: "Right Heel",
    },
  ]);
  const [currentDevice, setCurrentDevice] = useState(0);

  const [age, setAge] = useState("21");
  

  // Get context
  const { dark } = useContext(DarkContext);

  function handleLogToChange(t) {
    let newDevices = [];
    for (const d of devices) {
      newDevices.push(d);
    }
    newDevices[currentDevice].logTo = t;
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

    function handleClick() {
      if (header) { return; }
      setCurrentDevice(device.id - 1);
    }

    function getBackgroundColor() {
      if (header) { return; } 
      if ((currentDevice + 1) === parseInt(device.id)) {
        console.log("FFFs") 
        return globalColors.greenAlpha;
       }
    }

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
        <StyledButton text="Calibrate" />
        <StyledButton text="Disconnect" color="red" />
      </View>
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