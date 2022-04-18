import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// everything is done through components

// docs para fetch - https://reactnative.dev/docs/network
// método para request por HTTP
// la respuesta de un fetch as asíncrona
const solicitud = async() => {

  var respuesta = await fetch("https://raw.githubusercontent.com/gmorivastec/TC3005B_FRONTEND_APR4/master/gatitos.json");
  var json = await respuesta.json();

  console.log(json);
  console.log(json[1]);
}


// props 
// la manera de agregar atributos parametrizables al componente 
const Gatito = (props:any) => {
  
  // props se reciben del exterior
  // estados son valores internos de los que cada instancia tiene una copia
  // se modifican internamente

  // definición de un estado 
  const[cuenta, setCuenta] = useState(0);
  const[comio, setComio] = useState(false);
  const[nombre, setNombre] = useState("Garfiol");


  // los componentes regresan algún tipo de view
  return(<View>
      <Text>ESTO ES UN GATITO Y SU NOMBRE ES: {props.nombre} CUENTA: {cuenta}</Text>
      <Button
        title="EL GATITO"
        onPress={() => {
          alert("UN MIAU " + props.mensaje + " CUENTA: " + cuenta);
          setCuenta(cuenta + 1);
          solicitud();
        }}
       />
    </View>);
}

export default function App() {
  // aquí dejamos el puro controlador de navegación
  return(
    <NavigationContainer linking={{enabled: true}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Principal"
          component={Principal}
        />
        <Stack.Screen 
          name="Detalle"
          component={Detalle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Principal = ({navigation} : any) => {
  // JSX
  // syntaxis that looks like html
  // used to define objects
  /* 
  
  */
  return (
    <View style={styles.container}>
      <Text>HEY EVERYONE! </Text>
      <Gatito nombre="Misifus" mensaje="MIAU" />
      <Gatito nombre="Fluffy" mensaje="MIAU2" />
      <Gatito nombre="Gatito" mensaje="MIAU3" />
      <Gatito nombre="Garfiol" mensaje="MIAU4" />
      {/* 
      <FlatList
        data = {[]}
        renderItem = {}
      />    
      */}
      <Button
        title="VE AL DETALLE"
        onPress={() => {
          navigation.navigate("Detalle");
        }}
       />
      <StatusBar style="auto" />
    </View>
  );
}

const Detalle = ({navigation} : any) => {

  return (
    <View style={styles.container}>
      <Text> INFO IMPORTANTE AQUI </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
