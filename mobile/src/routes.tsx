import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import OrphanageVisitaion from "./pages/CreateOrphanage/OrphanageVisitaion";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";

import Header from "./components/Header";
import OrphanagesMap from "./pages/OrphanagesMap";
import Onboarding from "./pages/Onboarding";
import OrphanageDetails from "./pages/OrphanageDetails";
import Done from "./components/Done";

const {Navigator, Screen} = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name={'Onboarding'} component={Onboarding} />
                <Screen name={'Done'} component={Done} />
                <Screen name={'OrphanagesMap'} component={OrphanagesMap} />
                <Screen name={'OrphanageDetails'} component={OrphanageDetails} />
                <Screen name={'SelectMapPosition'} component={SelectMapPosition} />
                <Screen
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                    name={'OrphanageData'}
                    component={OrphanageData}
                />
                <Screen
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe as instruções" />
                    }}
                    name={'OrphanageVisitaion'}
                    component={OrphanageVisitaion}
                />
            </Navigator>
        </NavigationContainer>
    )
}
