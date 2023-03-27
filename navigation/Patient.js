// Library Imports
import { useContext, useState, } from 'react'
import { ScrollView, Pressable, View, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

// Context Imports
import { DarkContext, } from '../Context';

// Style Imports
import { darkTheme, lightTheme, measurements, } from '../assets/styles';

// Component Imports
import { Divider, GradientCard, } from '../components/Card';
import { Entry, } from '../components/Input';
import { StyledText, } from '../components/Text';
import { StyledCheckbox } from '../components/Button';

/** Space taken up by entry names */
const fieldNameWidth = 60;

const heightUnits = ["in", "cm"];
const weightUnits = ["kg", "lb"];

const allConditions = ["Diabetes", "Option 2", "Option 3", "...", "Other"];

const weightMenuItems = [
  {value: weightUnits[0], label: weightUnits[0]},
  {value: weightUnits[1], label: weightUnits[1]},
]

const heightMenuItems = [
  {value: heightUnits[0], label: heightUnits[0]},
  {value: heightUnits[1], label: heightUnits[1]},
]

export default function Patient({navigation}) {

  // Create states to keep track of whether or not any dropdown menus are open
  const [heightMenuOpen, setHeightMenuOpen] = useState(false);
  const [weightMenuOpen, setWeightMenuOpen] = useState(false);

  const [weightUnit, setWeightUnit] = useState(weightUnits[0]);
  const [heightUnit, setHeightUnit] = useState(heightUnits[0]);
  const [name, setName] = useState("Joseph Dobbelaar");
  const [weight, setWeight] = useState("78");
  const [height, setHeight] = useState("73");
  const [age, setAge] = useState("21");
  
  const [medicalConditions, setMedicalConditions] = useState([])
  const [notesEntryValue, setNotesEntryValue] = useState("");

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Toggle whether or not patient has a medical condition selected
   * @param {number} index index of medical condition
   */
  function toggleCondition(index) {
    const condition = allConditions[index];
    if (medicalConditions.includes(condition)) {
      setMedicalConditions(medicalConditions.filter(c => c !== condition));
    } else {
      let newConditions = [];
      for (const c of medicalConditions) {
        newConditions.push(c);
      }
      newConditions.push(condition);
      setMedicalConditions(newConditions);
    }
  }

  /**
   * Map possible medical conditions to checkboxes
   */
  function renderConditionCheckboxes() {
    return allConditions.map((cond, index) => {
      return (
        <Pressable
          key={index}
          onPress={() => toggleCondition(index)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            padding: 5,
          }}
        >
          <StyledCheckbox checked={medicalConditions.includes(cond)} />
          <StyledText text={cond} marginLeft={10}/>
        </Pressable>
      )
    })
  }

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: "center",
          padding: 10
        }}
      >
        <View style={{width: fieldNameWidth}}>
          <StyledText text="Name:" marginRight={5}/>
        </View>
        <Entry width="75%" height={50} placeholderText="Name" value={name} onChange={t => setName(t)}/>
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
          <StyledText text="Weight:" marginRight={5}/>
        </View>
        <Entry width="25%" height={50} placeholderText="Weight" value={weight} onChange={t => setWeight(t)}/>
        <DropDownPicker
          open={weightMenuOpen}
          value={weightUnit}
          items={weightMenuItems}
          onPress={() => setWeightMenuOpen(!weightMenuOpen)}
          onSelectItem={(item) => {setWeightUnit(item.value); setWeightMenuOpen(false);}}
          showArrowIcon={true}
          searchable={false}
          dropDownContainerStyle={{
            backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
            borderWidth: 0,
            borderRadius: 0,
            width: 80
          }}
          containerStyle={{
            marginLeft: 10,
            width: 80,
          }}
          style={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
          }}
        />
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
          <StyledText text="Height:" marginRight={5}/>
        </View>
        <Entry width="25%" height={50} placeholderText="Height" value={height} onChange={t => setHeight(t)}/>
        <DropDownPicker
          open={heightMenuOpen}
          value={heightUnit}
          items={heightMenuItems}
          onPress={() => setHeightMenuOpen(!heightMenuOpen)}
          onSelectItem={(item) => {setHeightUnit(item.value); setHeightMenuOpen(false);}}
          showArrowIcon={true}
          searchable={false}
          dropDownContainerStyle={{
            backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
            borderWidth: 0,
            borderRadius: 0,
            width: 80
          }}
          containerStyle={{
            marginLeft: 10,
            width: 80,
          }}
          style={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
          }}
        />
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
          <StyledText text="Age:" marginRight={5}/>
        </View>
        <Entry width="25%" height={50} placeholderText="Age" value={age} onChange={t => setAge(t)}/>
      </View>
      <ScrollView>
        <GradientCard flexDirection="column" gradient="white" justifyContent="flex-start" alignItems="flex-start">
          <StyledText text="Medical Conditions:" marginBottom={5}/>
          <Divider />
          { renderConditionCheckboxes() }
          <Entry placeholderText="Enter notes..." value={notesEntryValue} onChange={(t) => setNotesEntryValue(t)} />
        </GradientCard>
      </ScrollView>
    </View>
  )
}