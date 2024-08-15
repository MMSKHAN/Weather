import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
const clear =require("../../asserts/clear.jpg");
const cloud =require("../../asserts/cloud-day.jpg");
const haze =require("../../asserts/haze-day.jpg");
const rain =require("../../asserts/rain-day.jpg");
const snow =require("../../asserts/snow-day.jpg");
import moment from 'moment';
export default function Weather () {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [ icon, setIcon ] = useState('');
  const [error, setError] = useState('');
  const [envir, setEnvir] = useState(clear);

  const API_KEY = "3ce0ef5145939457095b20952c2cc3f5";

  const fetchWeather = async () => {
    if (city === '') {
      setError('City name cannot be empty.');
    
    }
    
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError('');
    //   setCity(" ")
    } 
    catch (err) {
      setWeather(null);
      setError('Error fetching data. Please try again.');
    }
  };
  useEffect(() => {
    const iconObj = {
      snow: <FontAwesome name="snowflake-o" size={25} color="skyblue" />,
      clear: <Ionicons name="sunny" size={25} color="red" />,
      rain: <Ionicons name="rainy" size={25} color="wheat" />,
      haze: <Fontisto name="day-haze" size={25} color="yello" />,
      cloud: <Ionicons name="cloudy" size={25} color="black" />
    };

    if (weather) {
      const weatherCondition = weather.weather[0].main.toLowerCase(); // Use 'main' for better matching
      switch (weatherCondition) {
        case 'clouds':
          setIcon(iconObj.cloud);
          setEnvir(cloud)
          break;
          case 'snow':
            setIcon(iconObj.snow);
            setEnvir(snow)
            break;
            case 'clear':
              setIcon(iconObj.clear);
              setEnvir(clear)
              break;
              case 'rain':
                setIcon(iconObj.rain);
                setEnvir(rain)
               
                break;
                case 'haze':
                  setIcon(iconObj.haze);
                  setEnvir(haze)
                  break;
                  default:
          setEnvir(haze)
          setIcon(iconObj.haze);
      }
    }
  }, [weather]); // Dependency array includes 'weather'

  return (
    <View style={styles.container}>
     <ImageBackground
      source={envir}
      style={styles.backgroundImage}
    >
    
     <View style={styles.inputbox}  >
     <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <FontAwesome name="search" size={24} color="black" onPress={fetchWeather} />

     </View>
           
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temp}> {weather.main.temp}°C</Text>
        <View style={styles.addidata}  >

            <Text style={styles.description}> {icon} {weather.weather[0].description}   </Text>
            <Text style={styles.sunTimes}>Feel: {weather.main.feels_like}°C</Text>
            <Text style={styles.pressure}>Pressure: {weather.main.pressure} hPa</Text>
            <Text style={styles.pressure}>Humidity: {weather.main.humidity}%</Text>
            <Text style={styles.sunTimes}>
              Sunrise: {moment.unix(weather.sys.sunrise).format('hh:mm A')} 
            </Text>
            <Text style={styles.sunTimes} >
              Sunset: {moment.unix(weather.sys.sunset).format('hh:mm A')}

            </Text>
        </View>
          </View>
        )
      )}
      {/* <View style={styles.weatherContainer}>
          <View>
          <Text style={styles.city}>Oslo</Text>
          <Text style={styles.temp}> 35°C</Text>
          </View>
        <View style={styles.addidata}  >

            <Text style={styles.description}> <Ionicons name="sunny" size={25} color="red" /> clear   </Text>
            <Text style={styles.sunTimes}>Feel: 34°C</Text>
            <Text style={styles.pressure}>Pressure: 28 hPa</Text>
            <Text style={styles.pressure}>Humidity: 49%</Text>
            <Text style={styles.sunTimes}>
              Sunrise: 12:30 am
            </Text>
            <Text style={styles.sunTimes} >
              Sunset: 12:35 pm

            </Text>
        </View>
          </View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 marginTop:30  , 
    backgroundColor: '#fff',
  },
  inputbox:{
display:"flex",
flexDirection:"row",
justifyContenta:"center",
alignItems:"center",
borderBottomWidth:1,
borderColor:"gray"
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  weatherContainer: {
    height:610,
    marginTop: 20,
    alignItems: 'center',
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
  },
  city: {
    fontSize: 30,
    fontWeight:10,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 80,
    marginVertical: 50,
  },
  description: {
    fontSize: 16,
  },
  error: {
    color: 'red',
  },
  backgroundImage: {

    width: '100%',
    height:800

},addidata:{
color:"white",
// backgroundColor:"gray",
 backgroundColor: 'rgba(255, 255, 255, 0.5)',
// opacity:0.5,
width:"90%",
borderRadius:30,
padding:20,
display:"flex",
gap:5
},description:{
color:"black",
borderBottomColor:"white",
borderBottomWidth:2,
fontSize:20,
display:"flex",
gap:10
},pressure:{
  color:"black",
  fontSize:20,
  borderBottomColor:"white",
borderBottomWidth:2,
},sunTimes:{
  color:"black",
  fontSize:20,
  borderBottomColor:"white",
borderBottomWidth:2,
}
});
