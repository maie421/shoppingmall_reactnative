import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';
import { uri } from '../../data/full';
import axios from 'axios';

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

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
  componentDidMount() {
    const uri_connect={uri};
    // JSON.stringify(uri_connect)

    axios.get(uri_connect.uri+`/api/goods/meat`)
      .then(res => {
        const food = res.data;
        this.setState({ food });
      })
  }
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam(this.state.food.data);
    // const recipesArray = getRecipes(item.id);
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
