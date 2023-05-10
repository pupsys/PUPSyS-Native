// Library Imports
import { LinearGradient, } from "expo-linear-gradient";
import { useContext, useRef, } from "react";
import { Pressable, View, } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

// Context Imports
import { DarkContext } from "../Context";

// API Imports
import { cardStyles, darkTheme, globalColors, lightTheme } from "../assets/styles";

/**
 * Component for rendering an elevated surface with linear gradient border
 * @param {Object} props - Component properties
 * @param {boolean} props.selected - Whether to display card as selected
 * @param {Function} props.onClick - Function to be called on card click
 * @param {boolean} props.disabled - Whether to display card as disabled
 * @param {boolean} props.solid - Whether to use solid color instead of gradient
 * @param {string} props.gradient - Gradient key for border ("white", "red", or "green")
 * @param {string} props.justifyContent - Content justification
 * @param {string} props.flexDirection - Flex direction
 * @param {React.Component} props.leftSwipeComponent - Component to render under card on left swipe
 * @param {React.Component} props.rightSwipeComponent - Component to render under card on right swipe
 * @param {Function} props.onLeftSwipe - Function to call on left swipe
 * @param {Function} props.onRightSwipe - Function to call on right swipe
 * @param {string} props.backgroundColor - Card background color
 * @returns {React.Component} - A card-styled Pressable surrounded by a LinearGradient
 */
export function GradientCard(props) {

  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Get the correct gradient stops given card props
   * @returns {string[]} - Array of string for gradient stops
   */
  function getGradientColors() {
    if (props.selected) {
      return globalColors.selectedGradient;
    }
    if (props.disabled) {
      return globalColors.disabledGradient;
    }
    if (props.gradient === "white" || !props.gradient) {
      return globalColors.whiteGradient;
    }
    if (props.gradient === "red" || props.gradient === globalColors.red) {
      return globalColors.redGradient;
    }
    if (props.gradient === "orange" || props.gradient === globalColors.orange) {
      return globalColors.orangeGradient;
    }
    if (props.gradient === "green" || props.gradient === globalColors.green) {
      return globalColors.greenGradient;
    }
  }

  function getBackgroundColor() {
    if (props.disabled) {
      return dark ? darkTheme.searchFill : lightTheme.searchFill;
    }
    if (props.backgroundColor) {
      return props.backgroundColor;
    }
    return dark ? darkTheme.cardFill : lightTheme.cardFill;
  }

  /**
   * Render the view component inside of the LinearGradient that makes up the border
   */
  function renderView() {
    if (!props.selected) {
      return (
        <Pressable
          display="flex"
          onPress={props.onClick}
          android_ripple={props.onClick ? {color: globalColors.greenAlpha} : {}}
          flexDirection={props.flexDirection ? props.flexDirection : "row"}
          alignItems={props.alignItems ? props.alignItems : "center"}
          justifyContent={props.justifyContent ? props.justifyContent : "space-between"}
          style={{
            borderRadius: cardStyles.cardBorderRadius, 
            width: '100%', 
            padding: 16, 
            height: "100%", 
            backgroundColor: getBackgroundColor(),
          }}
        >
          { props.children }
        </Pressable>
      )
    } else {
      return (
        <LinearGradient 
          start={[0, 0.5]}
          end={[1, 0.5]}
          colors={dark ? darkTheme.selectedFill : lightTheme.selectedFill}
          style={{
              borderRadius:  cardStyles.cardInnerBorderRadius, 
              width: '100%', 
              height: "100%", 
          }}
        >
          <Pressable 
            onPress={props.onClick} 
            android_ripple={props.onClick ? {color: globalColors.greenAlpha} : {}} 
            style={{
              display: 'flex', 
              flexDirection: "row", 
              padding: 16, 
              justifyContent: "space-between",
              alignItems: "center", 
              overflow: "hidden",
            }}
          >
            { props.children }
          </Pressable>
        </LinearGradient>     
      );
    }
  }
    
  // Create a ref to the swipeable so that we can use it in functions
  const swipeableRef = useRef(null);
   
  /**
   * Render any leftSwipeComponent under the card
   * @param {number} progress - Swipe progress 
   * @param {number} dragX - Horizontal displacement
   */
  function renderLeftActions(progress, dragX) {
    // Guard clauses:
    if (!props.leftSwipeComponent) { return; } // No component to render

    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return props.leftSwipeComponent;
  }   

  /**
   * Render any rightSwipeComponent under the card
   * @param {number} progress - Swipe progress 
   * @param {number} dragX - Horizontal displacement
   */
  function renderRightActions(progress, dragX) {
    // Guard clauses:
    if (!props.rightSwipeComponent) { return; } // No component to render
    
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return props.rightSwipeComponent;
  }   

  /**
   * Call the correct onSwipe function for the direction
   * @param {string} direction - Direction of swipe 
   */
  function handleSwipeOpen(direction) {
    if (direction === "left") {
      if (props.onLeftSwipe) {
        swipeableRef.current.close();
        props.onLeftSwipe();
      }
    }
    if (direction === "right") {
      if (props.onRightSwipe) {
          swipeableRef.current.close();
          props.onRightSwipe();
      }
    }
  }

  // Wrap the card in a Swipeable and render contents
  return (
    <Swipeable 
      ref={swipeableRef}
      containerStyle={{
          flex: 1
      }}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleSwipeOpen}
    >
      <LinearGradient 
        start={props.selected ? [0, 0] : [0, 0.5]}
        end={props.selected ? [1, 1] : [0.3, 0.5]}
        colors={getGradientColors()}
        style={{
            maxWidth: props.width ? props.width: '100%',
            borderRadius:  cardStyles.cardBorderRadius, 
            height: "100%", 
            marginBottom: cardStyles.cardMarginBottom, 
            elevation: cardStyles.cardElevation,
            flex: 1,
            padding: 1,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        }}
      >
        { renderView() }
      </LinearGradient>
    </Swipeable>
  )
}

/**
 * A component for rendering a full-width line in a card
 * @param {Object} props - Component properties
 * @param {boolean} props.vertical - Whether divider is vertical
 * @param {number} props.marginTop - Top margin
 * @param {number} props.marginBottom - Bottom margin
 * @param {string} props.color - Line color
 * @default
 * vertical = false;
 * @returns {React.Component} - A line to separate UI elements
 */
export function Divider(props) {
  
  // Get context
  const { dark } = useContext(DarkContext);

  /**
   * Get divider color by props or theme
   * @returns {string} - Color for divider line
   */
  function getDividerColor() {
    if (props.color) {
      return props.color;
    }
    return dark ? darkTheme.textPrimary : lightTheme.textPrimary;
  }
  
  return (
    <View 
      style={{          
        width: props.vertical ? "0%" : "100%",
        height: props.vertical ? "100%" : "0%",
        borderColor: getDividerColor(),
        borderBottomWidth: props.vertical ? 0 : 1,
        borderLeftWidth: props.vertical ? 1 : 0,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}
    />
  )
}