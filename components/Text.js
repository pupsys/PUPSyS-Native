// Library Imports
import { useContext, } from "react";
import { Pressable, Text, View, } from "react-native";

// Context Imports
import { DarkContext, } from "../Context";

// Style Imports
import { darkTheme, lightTheme, } from "../assets/styles";

/**
 * Get the correct text color based on component params. If no params, return primary.
 * @param {string} colorParam - Color parameter from text type component
 * @param {boolean} dark - Current darkmode value
 * @returns {string} - String for text color
 */
function getColor(colorParam, dark) {
  if (colorParam) {
    if (colorParam === "secondary") {
      return dark ? darkTheme.textSecondary : lightTheme.textSecondary;
    }
    return colorParam;
  }
  return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
}

/**
 * Basic centered text component that ignoes touch
 * @param {Object} props - Component properties
 * @param {string} props.text - Text to display in title
 * @param {string} props.color - Color or color key (ex. "secondary")
 * @param {number} props.marginTop - Top margin 
 * @param {number} props.marginBottom - Bottom margin 
 * @param {number} props.marginLeft - Left margin 
 * @param {number} props.marginRight - Right margin 
 * @param {string} props.fontWeight - Font weight ("bold", etc.)
 * @param {number} props.fontSize - Font size 
 * @default
 * color = "primary";
 * fontWeight = "bold";
 * fontSize = 16;
 * marginTop = 10;
 * marginBottom = 10;
 * marginLeft = 0;
 * marginRight = 0;
 * @returns {React.Component} - A custom styled View with text centered
 */
export function CenteredTitle(props) {

  // Get context
  const { dark } = useContext(DarkContext);

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
          color: getColor(props.color, dark), 
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
 * @param {Object} props - Component properties
 * @param {string} props.text - Text to display
 * @param {Function} props.onClick - Function to call on click
 * @param {string} props.color - Text color
 * @param {number} props.marginTop - Top margin 
 * @param {number} props.marginBottom - Bottom margin 
 * @param {number} props.marginLeft - Left margin 
 * @param {number} props.marginRight - Right margin 
 * @param {string} props.fontWeight - Font weight ("bold", etc.)
 * @param {number} props.fontSize - Font size 
 * @default
 * color = "primary";
 * fontWeight = "normal";
 * fontSize = 16;
 * marginTop = 0;
 * marginBottom = 0;
 * marginLeft = 0;
 * marginRight = 0;
 * onClick = null;
 * @returns {React.Component} - A custom styled View with text
 */
export function StyledText(props) {

  // Get context
  const { dark } = useContext(DarkContext);

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
        width: props.width,
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
          fontWeight: props.fontWeight ? props.fontWeight : 'normal', 
          color: getColor(props.color, dark), 
          textAlign: 'center',
          width: props.width ? "100%" : null,
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
 * @param {Object} props - Component properties 
 * @param {string} props.alignment - Row alignment ("center", "flex-start", "flex-end", etc.) 
 * @param {number} props.fontSize - Font size of text 
 * @param {string} props.fontWeight - Font weight of text ("bold", "italic", etc.) 
 * @param {string} props.color - Hex value of text color 
 * @param {number} props.marginTop - Top margin 
 * @param {number} props.marginBottom - Bottom margin 
 * @param {number} props.marginLeft - Left margin 
 * @param {number} props.marginRight - Right margin
 * @default
 * alignment = "center";
 * fontSize = 16;
 * fontWeight = "bold";
 * marginTop = 0;
 * marginBottom = 0;
 * marginLeft = 0;
 * marginRight = 0;
 * color = "primary";
 * @returns {React.Component} - A custom styled View with text
 */
export function AlignedText(props) {

  // Get context
  const { dark } = useContext(DarkContext);

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
          color: getColor(props.color, dark), 
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