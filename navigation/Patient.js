// Library Imports
import { useContext, useState, } from 'react'
import { ScrollView, Pressable, View, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

// Context Imports
import { DarkContext, } from '../Context';

// Style Imports
import { darkTheme, lightTheme, } from '../assets/styles';

// Component Imports
import { Divider, GradientCard, } from '../components/Card';
import { Entry, } from '../components/Input';
import { StyledText, } from '../components/Text';
import { StyledCheckbox } from '../components/Button';

/** Space taken up by entry names */
const fieldNameWidth = 60;

/** All possible units of height */
const heightUnits = ["in", "cm"];
/** All possible units of weight */
const weightUnits = ["kg", "lb"];

/** All possible medical conditions for a patient (example data) */
const allConditions = ["Diabetes", "Option 2", "Option 3", "...", "Other"];

/** Dropdown menu items for possible weight units */
const weightMenuItems = [
  {value: weightUnits[0], label: weightUnits[0]},
  {value: weightUnits[1], label: weightUnits[1]},
]

/** Dropdown menu items for possible height units */
const heightMenuItems = [
  {value: heightUnits[0], label: heightUnits[0]},
  {value: heightUnits[1], label: heightUnits[1]},
]

/**
 * Component to display patient details
 * @param {Object} props - Component properties
 * @param {ReactNavigation} props.navigation - Navigation object from AppStack 
 * @returns {React.Component} - Patient detail page
 */
export default function Patient({navigation}) {

  // Create states to keep track of whether any dropdown menus are open
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
   * Component to show a card with all of the patient's medical conditions, as well as a text box for more information
   * @returns {React.Component} - GradientCard populated with all possible medical conditions
   */
  function MedicalConditionsCard() {

    /**
     * Map possible medical conditions to checkboxes. Clicking a checkbox toggles whether the 
     * medical condition is "selected" for the patient.
     */
    function renderConditionCheckboxes() {
      
      /**
       * Toggle whether patient has a medical condition selected
       * @param {number} index - Index of medical condition
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
      <ScrollView>
        <GradientCard flexDirection="column" gradient="white" justifyContent="flex-start" alignItems="flex-start">
          <StyledText text="Medical Conditions:" marginBottom={5}/>
          <Divider />
          { renderConditionCheckboxes() }
          <Entry placeholderText="Enter notes..." value={notesEntryValue} onChange={(t) => setNotesEntryValue(t)} />
        </GradientCard>
      </ScrollView>
    )
  }

  /**
   * Component to show name entry field
   * @returns {React.Component} - View with StyledText and Entry for patient name
   */
  function NameEntry() {
    return (
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
    )
  }

  /**
   * Component to show weight entry fields
   * @returns {React.Component} - View with StyledText, Entry, and DropDownPicker for patient weight
   */
  function WeightEntry() {
    return (
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
    )
  }

  /**
   * Component to show height entry fields
   * @returns {React.Component} - View with StyledText, Entry, and DropDownPicker for patient height
   */
  function HeightEntry() {
    return (
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
    )
  }

  /**
   * Component to display age entry field
   * @returns {React.Component} - View with StyledText and Entry for patient height
   */
  function AgeEntry() {
    return (
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
    )
  }

  return (
    <View style={{ padding: 10, }} >
      <NameEntry />
      <WeightEntry />
      <HeightEntry />
      <AgeEntry />
      <MedicalConditionsCard />
    </View>
  )
}