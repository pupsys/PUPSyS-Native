// Library Imports
import { useContext, } from "react";
import { Pressable, Text, View, } from "react-native";

// Context Imports
import { DarkContext, } from "../Context";

// Style Imports
import { darkTheme, lightTheme, } from "../assets/styles";

/**
 * Basic centered text component that ignoes touch
 * @param {string} text text to display in title
 * @param {string} color color or color key (ex. "secondary")
 * @param {number} marginTop top margin 
 * @param {number} marginBottom bottom margin 
 * @param {number} marginLeft left margin 
 * @param {number} marginRight right margin 
 * @param {string} fontWeight font weight ("bold", etc.)
 * @param {number} fonSize font weight 
 * @default
 * color = "primary";
 * fontWeight = "bold";
 * fontSize = 16;
 * marginTop = 10;
 * marginBottom = 10;
 * marginLeft = 0;
 * marginRight = 0;
 */
export function CenteredTitle(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Get the correct text color based on params. If no params, return primary
   * @returns text color string
   */
  function getColor() {
    if (props.color) {
      if (props.color === "secondary") {
        return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
      }
      return props.color;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }

  return (
    <View 
      style={{
        display: 'flex', 
        direction: "row", 
        alignItems: "center"
      }} 
      pointerEvents="none"
    >
      <Text 
        style={{ 
          fontSize: props.fontSize ? props.fontSize : 16, 
          fontWeight: props.fontWeight ? props.fontWeight : 'bold', 
          color: getColor(), 
          marginTop: props.marginTop ? props.marginTop : 10,
          marginBottom: props.marginBottom ? props.marginBottom : 10,
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          marginRight: props.marginRight ? props.marginRight : 0,
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}

/**
 * Basic styled text component with onClick function
 * @param {string} text text to display
 * @param {Function} onClick function to call on click
 * @param {string} color text color
 * @param {number} marginTop top margin 
 * @param {number} marginBottom bottom margin 
 * @param {number} marginLeft left margin 
 * @param {number} marginRight right margin 
 * @param {string} fontWeight font weight ("bold", etc.)
 * @param {number} fonSize font weight 
 * @default
 * color = "primary";
 * fontWeight = "bold";
 * fontSize = 16;
 * marginTop = 0;
 * marginBottom = 0;
 * marginLeft = 0;
 * marginRight = 0;
 * onClick = null;
 */
export function StyledText(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Get the correct text color based on params. If no params, return primary
   * @returns text color string
   */
  function getColor() {
    if (props.color) {
      if (props.color === "secondary") {
        return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
      }
      return props.color;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }

  return (
    <Pressable
      onPress={props.onClick} 
      pointerEvents="none" 
      display="flex" 
      flexDirection="row" 
      alignItems="center" 
      textAlign="center" 
      style={{
        height: props.height, 
        marginTop: props.marginTop ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
        marginLeft: props.marginLeft ? props.marginLeft : 0,
        marginRight: props.marginRight ? props.marginRight : 0,
      }}
    >
      <Text 
        pointerEvents="none"
        style={{ 
          zIndex: props.zIndex ? props.zIndex : 1,
          fontSize: props.fontSize ? props.fontSize : 16, 
          fontWeight: props.fontWeight ? props.fontWeight : 'bold', 
          color: getColor(), 
          textAlign: 'center'
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  )
}

/**
 * Component for showing a styled label aligned to a certain position inside of a flexRow
 * @deprecated since 2/27/2023: use {@link StyledText} or {@link CenteredTitle} instead
 * @param {string} alignment row alignment ("center", "flex-start", "flex-end", etc.) 
 * @param {number} fontSize font size of text 
 * @param {string} fontWeight font weight of text ("bold", "italic", etc.) 
 * @param {string} color hex value of text color 
 * @param {number} marginTop top margin 
 * @param {number} marginBottom bottom margin 
 * @param {number} marginLeft left margin 
 * @param {number} marginRight right margin
 * @default
 * alignment = "center";
 * fontSize = 16;
 * fontWeight = "bold";
 * marginTop = 0;
 * marginBottom = 0;
 * marginLeft = 0;
 * marginRight = 0;
 * color = "primary";
 */
export function AlignedText(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Get the correct text color based on params. If no params, return primary
   * @returns text color string
   */
  function getColor() {
    if (props.color) {
      if (props.color === "secondary") {
        return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
      }
      return props.color;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }

  return (
    <View 
      style={{
        display: 'flex', 
        direction: "row", 
        alignItems: props.alignment ? props.alignItems : 'center'
      }}
    >
      <Text 
        style={{ 
          fontSize: props.fontSize ? props.fontSize : 16, 
          fontWeight: props.fontWeight ? props.fontWeight : 'bold', 
          color: getColor(), 
          marginTop: props.marginTop ? props.marginTop : 0,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
          marginLeft: props.marginLeft ? props.marginLeft : 0,
          marginRight: props.marginRight ? props.marginRight : 0,
        }}
      >
        {props.text}
      </Text>
    </View>
  )
}