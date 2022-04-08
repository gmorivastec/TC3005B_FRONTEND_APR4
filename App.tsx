import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// everything is done through components

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
        }}
       />
    </View>);
}

export default function App() {
  // JSX
  // syntaxis that looks like html
  // used to define objects
  return (
    <View style={styles.container}>
      <Text>HEY EVERYONE! </Text>
      <Gatito nombre="Misifus" mensaje="MIAU" />
      <Gatito nombre="Fluffy" mensaje="MIAU2" />
      <Gatito nombre="Gatito" mensaje="MIAU3" />
      <Gatito nombre="Garfiol" mensaje="MIAU4" />
      <StatusBar style="auto" />
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
