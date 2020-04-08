import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import { uri } from '../../data/full';
import axios from 'axios';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      )
    };
  };
  state = {
    food: []
  }
  componentDidMount() {
  //   console.log(this.props.navigation.state.params.item);
    const { item } = this.props.navigation.state.params;
    // console.log(`item:${item.name}`);
        // const item = navigation.getParam('item');
    const uri_connect={uri};
    axios.post(uri_connect.uri+`/api/comment`, {
      id: item.id
    })
    .then(res => {
        // console.log(res);
        const food=res.data;
        this.setState({food});
        console.log(this.state.food);
      })
    }
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,

    };
  }
  renderComment = ({item}) =>(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image style={styles.image} source={{uri: item.image}}/>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text  style={styles.name}>{item.title}</Text>
          <Text style={styles.time}>
            {item.created_at}
          </Text>
        </View>
        <Text rkType='primary3 mediumLine'>{item.body}</Text>
      </View>
    </View>
  );
  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };

  render() {
    const { activeSlide } = this.state;
    const { item } = this.props.navigation.state.params;
    // const item = navigation.getParam('item');
    // const category = getCategoryById(item.id);
    // const title = getCategoryName(category.id);
    // const Notification = item.item;
    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          {/* <View style={styles.carousel}>
            <Carousel 
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View> */}
         
        <Image style={styles.image} source={{ uri: item.path}} />
      </View>
        

        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.name}</Text>
          {/* <View style={styles.infoContainer}>
              <Text style={styles.category}>가격</Text>
          </View> */}

          <View style={styles.infoContainer}>
            {/* <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} /> */}
            <Text style={styles.infoRecipe}>{item.price}</Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                let ingredients = item.ingredients;
                let title = 'Ingredients for ' + item.title;
                navigation.navigate('Search', { ingredients, title });
              }}
            />
          </View>
         
          {/* <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View> */}
          <View style={styles.commentcontainer}>
              {/* <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: Notification.myimage}}/>
              </TouchableOpacity> */}
          </View>
        </View>
        <FlatList
        style={styles.root}
        data={this.state.food}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        // keyExtractor={(item)=>{
        //   return item.id;
        // }}
        renderItem={this.renderComment}
        keyExtractor={item => `${item.id}`}
            />
        </View>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
