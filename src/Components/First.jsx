import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function First() {
  const [stat, setStat] = useState();
  const [text, setText] = useState();
function pressed(){
  setStat(text)
}

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
      <TextInput
        placeholder='City'
        style={styles.input}
        onChangeText={text=>setText(text)}
        defaultValue={text}
       
      />
       <Button title={"Search"} style={{borderRadius:40}} onPress={pressed} />
      </View>
      
     
    <View>
    <Text style={styles.salam}>Assalam u Alaikum</Text> 
  
    <ScrollView>
    <Image source={{uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'}}
       style={{width: 400, height: 400}} />
    <Text  style={{fontSize:200}}  > Changes Made:
Fixed display: flex Issue: Changed display:flex to flexDirection: 'row' for proper syntax.
Added onPress Handler: Included a handleSearch function and attached it to the Button's onPress prop. You can customize this function based on what you want to achieve with the button press.
Added StatusBar Component: Included the StatusBar component to ensure it's displayed and styled appropriately.
You can now test the button functionality by typing a city name into the TextInput field and pressing the "Search" button. The current implementation will log the city name to the console.
  </Text> 
    </ScrollView>
    <Text style={styles.salam}>{stat}</Text>

    </View>
     
    </View>
  );
}

const styles = StyleSheet.create({

  input: {
   
    borderStyle: 'solid',
    borderColor: 'pink',
    borderWidth: 1, 
    paddingLeft:4,
    width:'80%', 
    borderRadius:40,
  },
  inputContainer:{
    marginHorizontal:5,
    marginVertical:30,
    display:"flex",
    flexDirection:'row',
    borderColor:"pink",
    borderBottomWidth:1,
    paddingVertical:5

  },
  salam: {
    color: 'blue',
    fontSize: 30,
  },
});
