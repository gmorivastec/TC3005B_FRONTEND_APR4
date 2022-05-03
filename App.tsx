import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
// ESTRICTAMENTE TEMPORAL
var global_user = "";
var global_password = ""; 

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

const linking = {
  enabled: true,
  config: {
    screens: {
      Login: '',
      Principal: '/main'
    }
  }
};

export default function App() {
  // aquí dejamos el puro controlador de navegación
  return(
    <NavigationContainer linking={{enabled: true}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
          name="Login"
          component={Login}
        />
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

const Login = ({navigation} : any) => {
  const[user, setUser] = useState("");
  const[password, setPassword] = useState("");
  const[mensajeDeError, setMensajeDeError] = useState("");

  const login = async() => {

    // vamos a seguir usando fetch
    
    // para mandar info vamos a crear un objeto formdata
    const formData = new FormData();
    formData.append('email', user);
    formData.append('pass', password);

    // solicitud con POST y con datos 
    var response = 
    await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      body: formData
    });


    //alert(await response.text() + " ::: " + response.status);
    if(response.status == 200){

      const datosLogin = await response.json(); 

      console.log(datosLogin);
      /*
      global_user = user;
      global_password = password;
      */

      // también se puede guardar en memoria
      await AsyncStorage.setItem("user", user);
      await AsyncStorage.setItem("token", datosLogin.token);
      await AsyncStorage.setItem("validez", datosLogin.caducidad);
    }
  }

  const protegido = async () => {

    var headers = new Headers();
    // Authorization Basic

    // obtener valores locales
    var user = await AsyncStorage.getItem("user");
    var token = await AsyncStorage.getItem("token");

    headers.append("Authorization", user + ":" + token);
    var response = await fetch('http://127.0.0.1:5000/protegido', {headers: headers});
    alert(await response.text() + " --- " + response.status);
  }

  const logout = async () => {

    var headers = new Headers();
    // Authorization Basic

    // obtener valores locales
    var user = await AsyncStorage.getItem("user");
    var token = await AsyncStorage.getItem("token");

    headers.append("Authorization", user + ":" + token);
    var response = await fetch('http://127.0.0.1:5000/logout', {headers: headers});
    alert(await response.text() + " --- " + response.status);

    // mantenimiento local
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  }

  return (
    <View style={styles.container}>
      <Text>{mensajeDeError}</Text>
      <TextInput 
        placeholder='user'
        onChangeText={text => {
          setUser(text);
        }}
      />
      <TextInput 
        placeholder='password'
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <Button 
        title="LOGIN"
        onPress={() => {
          login();
        }}
      />
      <Button 
        title="PROTEGIDO"
        onPress={() => {
          protegido();
        }}
      />
      <Button 
        title="LOGOUT"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}

const Principal = ({navigation} : any) => {
  // JSX
  // syntaxis that looks like html
  // used to define objects
  /* 

  
  
  */

  const[cargando, setCargando] = useState(true);
  const[datos, setDatos] = useState([]);

  const solicitud = async() => {

    //var respuesta = await fetch("https://raw.githubusercontent.com/gmorivastec/TC3005B_FRONTEND_APR4/master/gatitos.json");
    var respuesta = await fetch("http://127.0.0.1:5000/");
    setDatos(await respuesta.json());
    setCargando(false);
  }

  solicitud();

  return (
    <View style={styles.container}>
      <Text>HEY EVERYONE! </Text>

      {cargando && <Text>CARGANDO...</Text>}
      {datos && (
        <FlatList 
          data={datos}
          renderItem={({item} : any) =>
            <Gatito 
              nombre={item.nombre}
              mensaje={item.nombre}
            />
          }
        />
      )}

      
      <Button
        title="VE AL DETALLE"
        onPress={() => {
          navigation.navigate("Detalle", {unDato: "pruebita1", otroDato: "pruebita2"});
        }}
       />
      <StatusBar style="auto" />
    </View>
  );
}

const Detalle = ({navigation, route} : any) => {

  return (
    <View style={styles.container}>
      <Text> INFO IMPORTANTE AQUI {route.params.unDato} </Text>
      <Text> MAS INFO IMPORTANTE ACÁ {route.params.otroDato} </Text>
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
