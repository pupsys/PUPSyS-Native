// Library Imports
import { useContext } from 'react';
import { View, } from 'react-native';

// Component Imports
import { StyledText, } from './Text';

// Style Imports
import { darkTheme, lightTheme, } from '../assets/styles';

// Context Imports
import { MenuButton, } from './Button';
import { DarkContext, } from '../Context';

/**
 * Component for displaying the topbar with corrent screen name 
 */
export default function Topbar({title, onMenuClick}) {

  const { dark } = useContext(DarkContext);

  // There should be no cases where topbar isn't displayed— just render it
  return (
    <View 
      display="flex" 
      flexDirection="row" 
      justifyContent="flex-start" 
      alignItems="center" 
      style={{
        padding: 10,
        backgroundColor: dark ? darkTheme.navigationHeaderBackground : lightTheme.navigationHeaderBackground,
      }}
    >
      <MenuButton onClick={onMenuClick}/>
      <View display="flex" flexDirection="row" alignItems="center">
        <StyledText text={title} alignItems="flex-start" marginLeft={10}/>
      </View>
    </View>
  )
}

