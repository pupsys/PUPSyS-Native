// Library Imports
import CheckBox from "expo-checkbox";
import { LinearGradient, } from 'expo-linear-gradient';
import { useContext, } from 'react';
import { Image, Pressable, Text, View, } from "react-native";

// Context Imports
import { DarkContext, } from '../Context';

// API Imports
import { buttonImages, } from "../api/image"

// Style Imports
import { buttonStyles, darkTheme, globalColors, lightTheme, textStyles, } from '../assets/styles';

/**
 * Simple darkmode toggle button. Changes {@link DarkContext} on click.
 * @returns {React.Component} - A custom styled darkmode button
 */
export function DarkModeButton() {

  const { dark, setDark } = useContext(DarkContext);

  return (
    <Pressable onPress={() => setDark(!dark)}>
      <View display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Image source={dark ? buttonImages.LIGHTMODE : buttonImages.DARKMODE} style={{width: 40, height: 40, backgroundColor: "transparent"}}/>
      </View>
    </Pressable>
  )
}

/**
 * General button with text component for PUPSys
 * @param {Object} props - Component properties
 * @param {Function} props.onClick - Function to be called onClick
 * @param {string} props.color - Hex value or color key (ex. "red", "green", "venmo")
 * @param {boolean} props.disabled - Whether to show this button as disabled
 * @param {string} props.buttonBorder - Color for button border
 * @param {boolean} props.buttonBorderDisabled - Whether to hide the border
 * @param {number} props.width - Width of button
 * @param {number} props.height - Height of button
 * @param {number} props.marginTop - Top margin
 * @param {number} props.marginBottom - Bottom margin
 * @param {boolean} props.selected - Whether to display button as selected 
 * @default
 * marginTop = 10;
 * marginBottom = 0;
 * @returns {React.Component} - A custom styled button
 */
export function StyledButton(props) {

  const { dark } = useContext(DarkContext);

    /**
   * Get the correct border color from props or default to buttonBorder based on DarkContext
   * @returns {string} - String for border color
   */
  function getBorderColor() {
    if (props.color) {
      if (props.color === "red") {
        return globalColors.red;
      }
      if (props.color === "green") {
        return globalColors.green;
      }
      if (props.color === "venmo") {
        return globalColors.venmo;
      }
    }
    if (props.disabled) {
      return dark ? darkTheme.buttonBorderDisabled : lightTheme.buttonBorderDisabled;
    }
    return dark ? darkTheme.buttonBorder : lightTheme.buttonBorder;
  }

  /**
   * Get the correct text color from props or default to textPrimary based on DarkContext
   * @returns {string} - String for text color
   */
  function getTextColor() {
    if (props.color) {
      if (props.color === "red") {
        return globalColors.red;
      }
      if (props.color === "green") {
        return globalColors.green;
      }
    }
    if (props.disabled) {
      return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }

  // If the button is "selected", render it with a gradient
  if (props.selected) {
    return (
      <LinearGradient 
        start={[0, 0.5]}
        end={[1, 0.5]}
        colors={dark ? darkTheme.selectedFill : lightTheme.selectedFill}
        style={{
          display: 'flex', 
          flexDirection: "row", 
          width: props.width ? props.width : buttonStyles.buttonWidth, 
          height: props.height ? props.height : buttonStyles.buttonHeight,
          marginTop: props.marginTop ? props.marginTop : 10,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
          borderRadius: 10,
          backgroundColor: dark ? darkTheme.buttonFill : lightTheme.buttonFill,
          elevation: buttonStyles.buttonElevation
        }}
      >
        <Pressable
          onPress={props.onClick}
          disabled={props.disabled}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 10,
            borderWidth: buttonStyles.buttonBorderWidth,
            borderColor: getBorderColor(),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text 
            style={{
              color: (getTextColor()), 
              fontSize: 20
              }}
            >
              {props.text}
          </Text>
        </Pressable>
      </LinearGradient>
    );
  }

  // Button is unselected. Render without gradient
  return (
    <View 
      style={{
        display: 'flex', 
        flexDirection: "row", 
        width: props.width ? props.width : buttonStyles.buttonWidth, 
        height: props.height ? props.height : buttonStyles.buttonHeight,
        marginTop: props.marginTop ? props.marginTop : 10,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
        borderRadius: 10,
        backgroundColor: dark ? darkTheme.buttonFill : lightTheme.buttonFill,
        elevation: buttonStyles.buttonElevation
      }}
    >
      <Pressable
        onPress={props.onClick}
        disabled={props.disabled}
        android_ripple={props.onClick ? {color: globalColors.greenAlpha} : {}}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 10,
          borderWidth: buttonStyles.buttonBorderWidth,
          borderColor: getBorderColor(),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text 
          style={{
            color: (getTextColor()), fontSize: 20
            }}
          >
          {props.text}
        </Text>
      </Pressable>
    </View>
  )
}

/**
 * Checkbox component styled to theme
 * @param {Object} props - Component properties
 * @param {boolean} props.checked - Whether checkbox is checked
 * @returns {React.Component} - A custom styled Checkbox component
 */
export function StyledCheckbox(props) {
  return (
    <CheckBox 
      value={props.checked} 
      color="#767676"
      onValueChange={props.onChange}
    />
  )
}

/**
 * A {@link StyledButton} with a cute little arrow glyph to signify that it will open some sort of menu
 * @param {Object} props - Component properties
 * @param {Function} props.onClick - Function to be called onClick
 * @param {string} props.color - Hex value or color key (ex. "red", "green", "venmo")
 * @param {boolean} props.disabled - Whether to show this button as disabled
 * @param {string} props.buttonBorder - Color for button border
 * @param {boolean} props.buttonBorderDisabled - Whether to hide the border
 * @param {number} propswidth - Width of button
 * @param {number} propsheight - Height of button
 * @param {number} propsmarginTop - Top margin
 * @param {number} propsmarginBottom - Bottom margin
 * @param {boolean} props.selected - Whether to display button as selected 
 * @default
 * marginTop = 10;
 * marginBottom = 0;
 * @returns {React.Component} - A custom styled button that looks like a dropdown menu
 */
export function DropDownButton(props) {

  const { dark } = useContext(DarkContext);

  /**
   * Get the correct text color from props or default to textPrimary based on DarkContext
   * @returns {string} - String for text color
   */
  function getDropdownButtonTextColor() {
    if (props.color) {
      if (props.color === "red") {
        return globalColors.red;
      }
      if (props.color === "green") {
        return globalColors.green;
      }
    }
    if (props.disabled) {
      return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
    }
    if (props.red) {
      return globalColors.red;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }

  /**
   * Get the right arrow based on DarkContext
   * @returns {Image} - Image path
   */
  function getArrowImageSource() {
    if (props.disabled) {
      return dark ? buttonImages.ARROWDOWNDARKDISABLED : buttonImages.ARROWDOWNLIGHTDISABLED;
    }
    if (props.red) {
      return buttonImages.ARROWDOWNRED;
    }
    return dark ? buttonImages.ARROWDOWNDARK : buttonImages.ARROWDOWNLIGHT;
  }

  return (
    <View 
      style={{ 
        alignSelf: "center",
        height: buttonStyles.dropDownButtonHeight,
        marginLeft: 10,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
        backgroundColor: dark ? darkTheme.textFieldFill : lightTheme.textFieldFill,
        borderBottomColor: dark ? darkTheme.textFieldBorderColor : lightTheme.textFieldBorderColor,
        borderBottomWidth: 1,
      }}
    >
      <Pressable
        onPress={props.onClick}
        disabled={props.disabled}
        android_ripple={{color: globalColors.greenAlpha}}
        style={{
          height: "100%",
          paddingLeft: 10,
          paddingRight: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{color: (getDropdownButtonTextColor()), fontSize: textStyles.entryFontSize}}>
          {props.text}
        </Text>
        <Image source={getArrowImageSource()} style={{marginLeft: 5, height: 20, width: 20}}/>
      </Pressable>
    </View>
  )
}

/**
 * Simple save icon button|
 * @param {Object} props - Component properties
 * @param {Function} props.onClick - Function to call when clicked
 * @returns {React.Component} - A custom styled save button
 */
export function SaveButton(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  return (
    <Pressable 
      onPress={props.onClick}
      android_ripple={{color: globalColors.greenAlpha}}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderColor: dark ? darkTheme.buttonBorder : lightTheme.buttonBorder,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
      }}
    >
        <Image source={dark ? buttonImages.SAVEDARK : buttonImages.SAVELIGHT} style={{width: 40, height: 40, backgroundColor: "transparent"}}/>
    </Pressable>
  )
}

/**
 * Pause button with text component for PUPSys
 * @param {Object} props - Component properties
 * @param {Function} props.onClick - Function to call when clicked
 * @param {boolean} props.paused - Whether to show button as paused
 * @default
 * marginTop = 10;
 * marginBottom = 0;
 * @returns {React.Component} - A custom styled pause button
 */
export function PauseButton(props) {

  const { dark } = useContext(DarkContext);

    /**
   * Get the correct border color from props or default to buttonBorder based on DarkContext
   * @returns {string} - String for border color
   */
  function getPauseButtonBorderColor() {
    return dark ? darkTheme.buttonBorder : lightTheme.buttonBorder;
  }

  /**
   * Get the correct text color from props or default to textPrimary based on DarkContext
   * @returns {string} - String for text color
   */
  function getPauseButtonTextColor() {
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }
  
  /**
   * Get pause or play image by props.paused
   * @reutrns image source
   */
  function getPauseButtonImage() {
    if (props.paused) {
      return dark ? buttonImages.PLAYDARK : buttonImages.PLAYLIGHT;
    }
    return dark ? buttonImages.PAUSEDARK : buttonImages.PAUSELIGHT;
  }

  /**
   * Get pause or play text by props.paused
   * @reutrns button text
   */
  function getPauseButtonText() {
    if (props.paused) {
      return "Resume";
    }
    return "Pause";
  }

  // Button is unselected. Render without gradient
  return (
    <View 
      style={{
        display: 'flex', 
        flexDirection: "row", 
        width: buttonStyles.buttonWidth, 
        height: buttonStyles.buttonHeight,
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: dark ? darkTheme.buttonFill : lightTheme.buttonFill,
        elevation: buttonStyles.buttonElevation
      }}
    >
      <Pressable
        onPress={props.onClick}
        android_ripple={props.onClick ? {color: globalColors.greenAlpha} : {}}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 10,
          borderWidth: buttonStyles.buttonBorderWidth,
          borderColor: getPauseButtonBorderColor(),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={getPauseButtonImage()} style={{width: 30, height: 30, backgroundColor: "transparent"}}/>
        <Text 
          style={{
            color: (getPauseButtonTextColor()), 
            fontSize: 14,
            margin: 5,
          }}
          >
          {getPauseButtonText()}
        </Text>
      </Pressable>
    </View>
  )
}