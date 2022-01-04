import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Search from './screens/Search';
import NavBar from './components/NavBar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'screen'}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTransparent: true,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={true} />
            ),
            cardStyle: {backgroundColor: 'transparent'},
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTransparent: false,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTransparent: false,
            header: ({navigation}) => (
              <NavBar navigation={navigation} main={false} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
