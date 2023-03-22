// Library Imports
import { useContext, useState, } from 'react'
import { Text, View, } from 'react-native'

// API Imports
import { pageNames, } from '../api/enum';

// Context Imports
import { RouteContext, } from '../Context'

// Component Imports
import Topbar from "../components/Topbar";

export default function Patient({navigation}) {

    // Get Context
    const { currentRoute, setCurrentRoute } = useContext(RouteContext);

    // Set current route on component mount
    useState(() => {
      setCurrentRoute(pageNames.PATIENT);
    }, []);

    return (
      <View>
        <Topbar title={currentRoute} onMenuClick={() => navigation.navigate(pageNames.CALIBRATION)}/>
        <Text>Patient</Text>
      </View>
    )
}