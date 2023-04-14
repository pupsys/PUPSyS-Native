// Library Imports
import { useContext, useState, } from 'react'
import { ScrollView, Pressable, View, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

// Context Imports
import { DarkContext, PatientContext, } from '../Context';

// Style Imports
import { darkTheme, lightTheme, } from '../assets/styles';

// Component Imports
import { Divider, GradientCard, } from '../components/Card';
import { Entry, } from '../components/Input';
import { StyledText, } from '../components/Text';
import { StyledCheckbox } from '../components/Button';

// API Imports
import { heightMenuItems, weightMenuItems } from '../api/patient';

/** Space taken up by entry names */
const fieldNameWidth = 60;

/** All possible medical conditions for a patient (example data) */
const allConditions = ["Diabetes", "Option 2", "Option 3", "...", "Other"];

export default function Patient({navigation}) {

  // Get patient context
  const { patient, setPatient } = useContext(PatientContext);

  // Create states to keep track of whether or not any dropdown menus are open
  const [heightMenuOpen, setHeightMenuOpen] = useState(false);
  const [weightMenuOpen, setWeightMenuOpen] = useState(false);
  const [height, setHeight] = useState("73");
  const [age, setAge] = useState("21");
  
  const [medicalConditions, setMedicalConditions] = useState([])
  const [notesEntryValue, setNotesEntryValue] = useState("");

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Component to show a card with all of the patient's medical conditions, as well as a text box for more information
   */
  function MedicalConditionsCard() {

    /**
     * Map possible medical conditions to checkboxes. Clicking a checkbox toggles whether the 
     * medical condition is "selected" for the patient.
     */
    function renderConditionCheckboxes() {
      
      /**
       * Toggle whether patient has a medical condition selected
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
   */
  function NameEntry() {

    /**
     * Set patient's name and update context
     * @param {string} t - Text from name entry
     */
    function updatePatientName(t) {
      const newPatient = {...patient};
      newPatient.name = t;
      setPatient(newPatient);
    }

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
        <Entry width="75%" height={50} placeholderText="Name" value={patient.name} onChange={t => updatePatientName(t)}/>
      </View>
    )
  }

  /**
   * Component to show weight entry fields
   */
  function WeightEntry() {

    /**
     * Set patient's weight and update context
     * @param {string} t - Text from weight entry
     */
    function updatePatientWeight(t) {
      // Convert text to number
      const newWeight = parseInt(t);
      const newPatient = {...patient};
      newPatient.weight = newWeight;
      setPatient(newPatient);
    }

    /**
     * Update patient weight unit and close weight menu
     * @param {Object} item - Dropdown menu item 
     */
    function updatePatientWeightUnit(item) {
      const newPatient = {...patient};
      newPatient.weightUnit = item.value;
      setPatient(newPatient);
      setWeightMenuOpen(false);
    }

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
        <Entry width="25%" height={50} placeholderText="Weight" value={patient.weight.toString()} onChange={t => updatePatientWeight(t)}/>
        <DropDownPicker
          open={weightMenuOpen}
          value={patient.weightUnit}
          items={weightMenuItems}
          onPress={() => setWeightMenuOpen(!weightMenuOpen)}
          onSelectItem={item => updatePatientWeightUnit(item)}
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
   */
  function HeightEntry() {

    /**
     * Set patient's height and update context
     * @param {string} t - Text from height entry
     */
    function updatePatientHeight(t) {
      // Convert text to number
      const newHeight = parseInt(t);
      const newPatient = {...patient};
      newPatient.height = newHeight;
      setPatient(newPatient);
    }

    /**
     * Update patient height unit and close height menu
     * @param {Object} item - Dropdown menu item 
     */
    function updatePatientHeightUnit(item) {
      const newPatient = {...patient};
      newPatient.heightUnit = item.value;
      setPatient(newPatient);
      setHeightMenuOpen(false);
    }

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
        <Entry width="25%" height={50} placeholderText="Height" value={patient.height} onChange={t => updatePatientHeight(t)}/>
        <DropDownPicker
          open={heightMenuOpen}
          value={patient.heightUnit}
          items={heightMenuItems}
          onPress={() => setHeightMenuOpen(!heightMenuOpen)}
          onSelectItem={item => updatePatientHeightUnit(item)}
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