import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';

const dummyObj = { "type": "mcq", "id": 2979, "playlist": "Period 6: 1865-1898", "description": "5.5 Sectional Conflict: Regional Differences #apush", "question": "What were the two largest immigrant groups during the mid-1800's?", "image": "https://cross-platform-rwa.rp.devfactory.com/images/2979%20-%20german%20and%20irish%20immigrant%20groups.png", "options": [{ "id": "A", "answer": "German & Irish" }, { "id": "B", "answer": "Italian & German" }, { "id": "C", "answer": "Chinese & Japanese" }], "user": { "name": "AP US History", "avatar": "https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png" } }

const HomeScreen = () => {

  const [mcq, setMcq] = useState([dummyObj]);
  const [answer, setAnswer] = useState(null)
  const [clickedAnswer, setClickedAnswer] = useState('Z')
  const [isLoading, setIsLoading] = useState(true);

  //{"description": "5.5 Sectional Conflict: Regional Differences #apush", "id": 3794, "image": "https://cross-platform-rwa.rp.devfactory.com/images/3794%20-%20industrial%20vs%20agricultural%20economy.png", 
  // "options": [{"answer": "An industrial vs. agricultural economy", "id": "A"}, {"answer": "Income inequality", "id": "B"}, {"answer": "Dependence on imports", "id": "C"}], "playlist": "Period 6: 1865-1898", 
  // "question": "Aside from slavery, what was the most significant difference betweent the North and South during the mid-1800s?", "type": "mcq", 
  // "user": {"avatar": "https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png", "name": "AP US History"}}

  useEffect(() => {
    loadData()
    fetchMoreData()
  }, []);

  useEffect(() => {
    mcq && fetch(`https://cross-platform.rp.devfactory.com/reveal?id=${mcq.id}`).then(res => res.json()).then(answer => {
      setAnswer(answer.correct_options[0].id)
    })
  }, [])


  const fetchMoreData = () => {
    // setInterval(loadData, 10000)
  }

  const loadData = () => {
    setIsLoading(true)
    fetch('https://cross-platform.rp.devfactory.com/for_you')
      .then(res => res.json())
      .then(data => {
        const newData = [data]
        setMcq((prevData) => [...prevData, ...newData])
      })
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  const revealAnswer = (id) => {
    console.log(mcq.options)
  };

  const getBgColor = () => {
    let color = 'white'

    if(clickedAnswer === 'Z') return color

    if(clickedAnswer === answer) color = 'rgb(0, 255, 0)'
    else if(clickedAnswer != answer ) color = 'rgb(255, 0, 0)'

    return color
  }

  const renderItem = ({ item }) => {

    const options = item.options
    return (
      <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{ width: '100%', height: Dimensions.get('window').height + 30 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <View style={{ padding: 30, color: 'blue', flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
            <Text style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.7)', fontSize: 20, padding: 10, borderRadius: 10 }}>{item.question}</Text>

            <View style={{ flexDirection: 'column', gap: 20 }}>
              {options && options.map((item, item_index) => (
                <TouchableOpacity key={item_index} onPress={(a) => {
                  console.log(item.id)
                  setClickedAnswer(item.id)
                }}>
                  <View >
                    <Text style={{ backgroundColor: getBgColor(), color: 'white', fontSize: 18, padding: 7, borderRadius: 10, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}>{item.answer}</Text>
                  </View>
                </TouchableOpacity>
              ))
              }
            </View>
          </View>
        </View>
      </ImageBackground>
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
    <FlatList
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      data={mcq}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id} + "" + ${mcq.length}`}
  />
);
};


export default HomeScreen;