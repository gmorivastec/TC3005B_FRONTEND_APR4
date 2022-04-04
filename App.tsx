import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// everything is done through components

// props 
// la manera de agregar atributos parametrizables al componente 
const Gatito = (props:any) => {

  // los componentes regresan algún tipo de view
  return(<View>
      <Text>ESTO ES UN GATITO Y SU NOMBRE ES: {props.nombre}</Text>
      <Button
        title="EL GATITO"
        onPress={() => {
          alert("UN MIAU " + props.mensaje);
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
      <Gatito />
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
