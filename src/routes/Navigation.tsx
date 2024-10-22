import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useCustomTheme} from '../themes/Theme';
import {mergedStacks} from './ScreenCollections';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const theme = useCustomTheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      text: theme.colors.text,
      card: theme.colors.card,
      border: theme.colors.border,
      notification: theme.colors.notification,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {mergedStacks.map((item, index) => {
          return (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
