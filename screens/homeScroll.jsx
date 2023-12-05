import React, { useState, useEffect, useRef } from 'react';
import { VirtualizedList, View, Animated, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);


const HomeScreen = () => {

    const scrollX = useRef(new Animated.Value(0)).current;

    const onPanGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: scrollX } }],
      { useNativeDriver: true }
    );
  
    const onPanHandlerStateChange = (event) => {
      if (event.nativeEvent.state === State.END) {
        // Perform any necessary actions when scrolling ends
      }
    };
  const [ data, setData] = useState([])
  const [mcqs, setMCQs] = useState([]);
  const [answer, setAnswer] = useState(null)
  const [clickedAnswer, setClickedAnswer] = useState(-1)
  const [isLoading, setIsLoading] = useState(false);
  const [bgImage, setBGImage] = useState()
  //{"description": "5.5 Sectional Conflict: Regional Differences #apush", "id": 3794, "image": "https://cross-platform-rwa.rp.devfactory.com/images/3794%20-%20industrial%20vs%20agricultural%20economy.png", "options": [{"answer": "An industrial vs. agricultural economy", "id": "A"}, {"answer": "Income inequality", "id": "B"}, {"answer": "Dependence on imports", "id": "C"}], "playlist": "Period 6: 1865-1898", "question": "Aside from slavery, what was the most significant difference betweent the North and South during the mid-1800s?", "type": "mcq", "user": {"avatar": "https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png", "name": "AP US History"}}
  useEffect(() => {
    loadData()
  }, []);

  useEffect(() => {
    mcqs && fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${mcqs.id}`).then(res => res.json()).then(answer => {
      setAnswer(answer.correct_options[0].id)
    })
  }, [])


  const fetchMoreData = () =>{
    setTimeout(() => loadData, 1000)
  }
  const loadData = () =>{
    fetch('https://cross-platform.rp.devfactory.com/for_you')
    .then(res => res.json())
    .then(newdata => {
    //   console.log(data)
      setMCQs(newdata)
      setData([...data, newdata])
      setBGImage(newdata.image)
    })
    .catch(err => console.log(err))
  }

  const revealAnswer = (id) => {
    console.log(mcqs.options)
  };

  const renderItem = ({ item }) =>{
    console.log(item)
    const options = item.options
    return (   
        <View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', widht: '100%' }}>
        <View style={{ padding: 30, color: 'blue', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.7)', fontSize: 20, padding: 10, borderRadius: 10 }}>{item.question}</Text>
          
        {options && options.map((item) => (
            <TouchableOpacity onPress={() => {
                setClickedAnswer(item.id)
              }}>
                <Text style={{ color: 'white', backgroundColor: `${(clickedAnswer !== -1 && item.id === clickedAnswer && clickedAnswer === answer) ? 'rgba(0,255,0,0.5)' : (clickedAnswer !== -1 && item.id === clickedAnswer && clickedAnswer !== answer) ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.5)'}`, fontSize: 18, padding: 7, borderRadius: 10, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }}>{item.answer}</Text>
            </TouchableOpacity>
          )) 
        }  
        </View>
      </View>
      </View>
    )
  }



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
   
    <ImageBackground source={{ uri: bgImage }} resizeMode="cover" style={styles.image}>
      <PanGestureHandler
        onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanHandlerStateChange}
      >
        <Animated.View>
          <AnimatedVirtualizedList
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={10}
            getItemCount={(data) => data.length} 
            getItem={(data, index) =>data[index]}
            onEndReached={fetchMoreData}
          />
        </Animated.View>
      </PanGestureHandler>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});

export default HomeScreen;