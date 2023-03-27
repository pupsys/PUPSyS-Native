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

    return (
      <View>
        <Text>Patient</Text>
      </View>
    )
}