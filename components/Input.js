// Library Imports
import { useContext } from "react";
import { Image, TextInput, View, } from "react-native";

// Context Imports
import { DarkContext } from "../Context";

// Style Imports
import { darkTheme, lightTheme, measurements, textStyles, } from "../assets/styles";
import { buttonImages } from "../api/image";

/**
 * General text entry component for PUPSys
 * @param {Function} onChange - Function to be called when text is changes 
 * @param {string} textAlign - Text alignment 
 * @param {number} marginLeft - Left margin
 * @param {number} marginRight - Right margin
 * @param {number} marginTop - Top margin
 * @param {number} marginBottom - Bottom margin
 * @param {number} height - Entry box height
 */
export function Entry(props) {
    
    const { dark } = useContext(DarkContext);

    return (
      <View 
        display="flex" 
        flexDirection="row" 
        alignItems="center"
        style={{
          backgroundColor: (dark ? darkTheme.textFieldFill : lightTheme.textFieldFill), 
          width: props.width ? props.width : "100%", 
          borderBottomColor: dark ? darkTheme.textFieldBorderColor : lightTheme.textFieldBorderColor,
          borderBottomWidth: 1,
          height: props.height ? props.height : measurements.entryHeight, 
          marginTop: props.marginTop ? props.marginTop : 0,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          marginRight: props.marginRight ? props.marginRight : 0,
        }}
      >
        <TextInput 
          placeholder={props.placeholderText ? props.placeholderText : ""}
          placeholderTextColor={dark ? darkTheme.textSecondary : lightTheme.textSecondary}
          onChangeText={props.onChange}
          onBlur={props.onBlur}
          inputMode={props.numeric ? "decimal" : "text"}
          keyboardType={props.numeric ? "numeric" : "default"}
          value={props.value ? props.value : ""}
          style={{
            paddingHorizontal: 10,
            textAlign: props.textAlign ? props.textAlign : "center",
            color: dark ? darkTheme.textPrimary : lightTheme.textPrimary, 
            width: "100%",
            fontSize: textStyles.entryFontSize
          }}
        />
      </View>
    )
}

/**
 * General search bar component for PUPSys that calls a function (setSearch) when text inside is changed
 * @private
 * @param {Object} props - Component properties
 * @param {boolean} props.halfWidth - Whether to display search bar at 50% width 
 * @param {boolean} props.fullWidth - Whether to display search bar at 100% width
 * @param {Function} props.setSearch - Function to be called on text change
 * @param {Function} props.onEnter - Function to be called on enter key press
 * @param {string} props.placeholder - Placeholder text
 * @default
 * width = "80%";
 * placeholder = "Search";
 * @returns {React.Component} - A custom styled SearchBar
 */
function SearchBar(props) {
    
    const { dark } = useContext(DarkContext);
    
    return (
      <View 
        display="flex" 
        flexDirection="row" 
        alignItems="center" 
        style={{
            backgroundColor: (dark ? darkTheme.searchFill : lightTheme.searchFill), 
            width: props.fullWidth ? "100%" : (props.halfWidth ? "50%" : "80%"), 
            height: 40,
            borderRadius: 100,
            elevation: 5
        }}
      >
        <Image source={dark ? buttonImages.SEARCHDARK : buttonImages.SEARCHLIGHT} style={{height: 32, width: 32, marginLeft: 10}} />
        <TextInput 
          placeholder={props.placeholder ? props.placeholder : "Search"}
          placeholderTextColor={dark ? "#FCFCFC" : "#0A1930"}
          onChangeText={props.setSearch}
          onSubmitEditing={props.onEnter}
          style={{
            marginLeft: 10, 
            color: dark ? "#FCFCFC" : "#0A1930", 
            width: "100%"
          }}
        />
      </View>
    )
}

/**
 * Full width PUPSys search bar component
 * @param {Object} props - Component properties
 * @param {Function} props.setSearch - Function to be called on text change
 * @param {Function} props.onEnter - Function to be called on enter key press
 * @param {string} props.placeholder - Placeholder text
 * @default
 * placeholder = "Search";
 * @returns {React.Component} - A custom styled SearchBar at 100% width
 */
export function SearchBarFull(props) {
    return <SearchBar setSearch={props.setSearch} onEnter={props.onEnter} placeholder={props.placeholder} fullWidth={true} />
}

/**
 * Half width PUPSys search bar component
 * @param {Object} props - Component Properties
 * @param {Function} props.setSearch - function to be called on text change
 * @param {Function} props.onEnter - Function to be called on enter key press
 * @param {string} props.placeholder - Placeholder text
 * @default
 * placeholder = "Search";
 * @returns {React.Component} - A custom styled SearchBar at 50% width
 */
export function SearchBarHalf(props) {
    return <SearchBar setSearch={props.setSearch} onEnter={props.onEnter} placeholder={props.placeholder} halfWidth={true} />
}

/**
 * 80% width PUPSys search bar component
 * @param {Object} props - Component Properties
 * @param {Function} props.setSearch - Function to be called on text change
 * @param {Function} props.onEnter - Function to be called on enter key press
 * @param {string} props.placeholder - Placeholder text
 * @default
 * placeholder = "Search";
 * @returns {React.Component} - A custom styled SearchBar at 80% width
 */
export function SearchBarShort(props) {
    return <SearchBar setSearch={props.setSearch} onEnter={props.onEnter} placeholder={props.placeholder}/>
}