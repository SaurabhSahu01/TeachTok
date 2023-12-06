import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import RenderItem from '../src/components/renderItem';

const dummyObj = { "type": "mcq", "id": 2979, "playlist": "Period 6: 1865-1898", "description": "5.5 Sectional Conflict: Regional Differences #apush", "question": "What were the two largest immigrant groups during the mid-1800's?", "image": "https://cross-platform-rwa.rp.devfactory.com/images/2979%20-%20german%20and%20irish%20immigrant%20groups.png", "options": [{ "id": "A", "answer": "German & Irish" }, { "id": "B", "answer": "Italian & German" }, { "id": "C", "answer": "Chinese & Japanese" }], "user": { "name": "AP US History", "avatar": "https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png" } }

const HomeScreen = () => {

  const [mcq, setMcq] = useState([dummyObj]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData()
    fetchMoreData()
  }, []);

  const fetchMoreData = () => {
    fetch('https://cross-platform.rp.devfactory.com/for_you')
      .then(res => res.json())
      .then(data => {
        const newData = [data]
        setMcq((prevData) => [...prevData, ...newData])
      })
      .catch(err => console.log(err))
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
      renderItem={({ item }) => <RenderItem item={item} />}
      onEndReached={fetchMoreData} // Load more data when end is reached
      onEndReachedThreshold={0.1} // Trigger onEndReached when 10% from the bottom
      keyExtractor={(item) => `${item.id + Math.random() + mcq.length}`}
  />
);
};


export default HomeScreen;