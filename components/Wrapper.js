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
 * Basic CitrusNative styled page wrapper 
 * @param {string} justifyContent column justification
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
 * Bastic CitrusNative styled scrolling page wrapper  
 * @returns 
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
 * @param {number} marginTop top margin
 * @param {number} marginBottom bottom margin
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
 * 
 * @param {string} flexDirection card flex direction
 * @param {string} alignItems card item alignment
 * @param {string} justifyContent card content justification
 * @param {number} paddingTop top padding 
 * @param {number} paddingBottom bottom padding 
 * @param {number} marginTop top margin 
 * @param {number} marginBottom bottom margin 
 * @default
 * flexDirection = "column";
 * alignItems = "center";
 * justiftContent = "center";
 * paddingTop = 5;
 * paddingBottom = 5;
 * marginTop = 20;
 * marginBottom = 20;
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