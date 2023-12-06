import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, TouchableOpacity, ImageBackground } from 'react-native';

const RenderItem = ({ item }) => {
  const [answer, setAnswer] = useState(null);
  const [clickedAnswer, setClickedAnswer] = useState('Z');

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        if (item) {
          const response = await fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${item.id}`);
          const data = await response.json();
          setAnswer(data.correct_options[0].id);
        }
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchAnswer();
  }, [item]);

  const renderOptions = () => (
    <View style={{ flexDirection: 'column', gap: 20 }}>
      {item.options && item.options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => {
            setClickedAnswer(option.id);
            console.log("clicked answer = ", clickedAnswer, " question id = ", item.id, " right answer = ", answer)
        }}>
          <View>
            <Text style={{
              backgroundColor: `${
                (answer !== null && clickedAnswer !== 'Z' && clickedAnswer === option.id && clickedAnswer === answer) ? 'rgba(0,255,0, 0.3)' :
                (answer !== null && clickedAnswer !== 'Z' && clickedAnswer === option.id && clickedAnswer !== answer) ? 'rgba(255,0,0, 0.3)' :
                'rgba(255,255,255, 0.3)'
              }`,
              color: 'white',
              fontSize: 18,
              padding: 7,
              borderRadius: 10,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 10
            }}>{option.answer}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{ width: '100%', height: Dimensions.get('window').height + 28}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <View style={{ padding: 30, color: 'blue', flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
          <Text style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.7)', fontSize: 20, padding: 10, borderRadius: 10 }}>{item.question}</Text>
          {renderOptions()}
        </View>
      </View>
    </ImageBackground>
  );
}

export default RenderItem;
