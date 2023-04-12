// Libray Imports
import { LinearGradient, } from 'expo-linear-gradient'
import { useContext, } from "react"
import { View, } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler'

// Context Imports
import { DarkContext, } from '../Context'

// Style Imports
import { darkTheme, lightTheme, } from '../assets/styles'

/**
 * Basic PUPSys styled page wrapper 
 * @param {Object} props - Component properties
 * @param {string} props.justifyContent - Column justification
 * @returns {React.Component} - A custom styled View for wrapping an entire page
 */
export function PageWrapper(props) {
  return (
    <View 
      style={{
        display: 'flex', 
        height: "100%", 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: props.justifyContent ? props.justifyContent : 'flex-start', 
        paddingLeft: 20, 
        paddingRight: 20,
        paddingBottom: 20
      }}
    >
      { props.children }
    </View>
  )
}

/**
 * Bastic PUPSys styled scrolling page wrapper  
 * @returns {Object} - Component properties
 * @returns {React.Component} - A custom styled ScrollView
 */
export function ScrollPage(props) {
  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center'}}  
      keyboardShouldPersistTaps="handled"
      style={{ 
        height: "100%", 
        paddingLeft: 20, 
        paddingRight: 20,
        paddingBottom: 20
      }}
    >
      { props.children }
    </ScrollView>
  )
}

/**
 * Scollview wrapper component for lists of components.
 * Taps are handled with keyboard up
 * @param {Object} props - Component properties
 * @param {number} props.marginTop - Top margin
 * @param {number} props.marginBottom - Bottom margin
 * @returns {React.Component} - A custom styled ScrollView that is tap transparent
 */
export function ListScroll(props) {
    return (
      <ScrollView 
        style={{
          width: '100%',
          marginTop: props.marginTop ? props.marginTop : 10,
          marginBottom: props.marginBottom ? props.marginBottom : 0,
        }}
        keyboardShouldPersistTaps="handled"
      >
        { props.children }
      </ScrollView>
    )
}

/**
 * Wrapper component for card-style children
 * @param {Object} props - Component properties
 * @param {string} props.flexDirection - Card flex direction
 * @param {string} props.alignItems - Card item alignment
 * @param {string} props.justifyContent - Card content justification
 * @param {number} props.paddingTop - Top padding 
 * @param {number} props.paddingBottom - Bottom padding 
 * @param {number} props.marginTop - Top margin 
 * @param {number} props.marginBottom - Bottom margin 
 * @default
 * flexDirection = "column";
 * alignItems = "center";
 * justiftContent = "center";
 * paddingTop = 5;
 * paddingBottom = 5;
 * marginTop = 20;
 * marginBottom = 20;
 * @returns {React.Component} - A custom styled wrapper compnent for card-style children
 */
export function CardWrapper(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  return (
    <View 
      style={{
        display: 'flex',  
        width: "100%", 
        flexDirection: props.flexDirection ? props.flexDirection : 'column', 
        alignItems: props.alignItems ? props.alignItems : 'center', 
        justifyContent: props.justifyContent ? props.justifyContent : 'center', 
        paddingLeft: 20, 
        paddingRight: 20,
        paddingTop: props.paddingTop ? props.paddingTop : 5,
        paddingBottom: props.paddingBottom ? props.paddingBottom : 5,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: props.marginTop ? props.marginTop : 20,
        marginBottom: props.marginBottom ? props.marginBottom : 20,
        elevation: 2,
        backgroundColor: dark ? darkTheme.cardFill : lightTheme.cardFill
      }}
    >
      { props.children }
    </View>
  )
}