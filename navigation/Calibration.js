// Library Imports
import { useContext, useState, } from 'react'
import { Text, View, } from 'react-native'

// API Imports
import { pageNames, } from '../api/enum';

// Context Imports
import { RouteContext, } from '../Context'

// Component Imports
import Topbar from "../components/Topbar";

export default function Calibration({navigation}) {

    // Get Context
    const { currentRoute, setCurrentRoute } = useContext(RouteContext);

    // Set current route on component mount
    useState(() => {
        setCurrentRoute(pageNames.CALIBRATION);
      }, []);

    return (
      <View>
        <Topbar title={currentRoute} onMenuClick={() => navigation.navigate(pageNames.STATUS)}/>
        <Text>Calibration</Text>
      </View>
    )
}