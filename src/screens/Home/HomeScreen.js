import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,AsyncStorage } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { uri } from '../../data/full';
import axios from 'axios';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
  }
  state = {
    food: []
  }
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.path }} />
  <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.price}</Text>
      </View>
    </TouchableHighlight>
  );
  componentDidMount=async()=> {
    // try {
    //   const value = await AsyncStorage.getItem('user');
    //   // if (value !== null) {
    //     // We have data!!
    //     var json = JSON.parse(value);
    //     console.log( objectValues[json]+"실행");
    //   // }
    // } catch (error) {
    //   // Error retrieving data
    // }
    const uri_connect={uri};
    // JSON.stringify(uri_connect)

    axios.get(uri_connect.uri+`/api/goods/meat`)
      .then(res => {
        const food = res.data;
        this.setState({ food });
      })

  }
  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.food.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
