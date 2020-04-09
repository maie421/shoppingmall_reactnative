import React, { useState } from "react";
import { View ,AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import {LoginCheck} from '../../data/full';

export default class DrawerContainer extends React.Component {
  state={
    title:"Login",
  }
  render() {
    AsyncStorage.getItem("user", (err, value )=>{
      if (err == null){
          let json = JSON.parse(value);
          if(json){
              this.state.title="Logout";
              
            }else{
              this.state.title="Login"
              
            }
          }
        });

    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="메뉴"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          
           <MenuButton
            title={this.state.title}
            source={require('../../../assets/icons/Login.png')}
            onPress={() => {
              navigation.navigate(this.state.title);
              if(this.state.title==="Logout"){
                AsyncStorage.removeItem('user');
              }
              navigation.closeDrawer();
            }}
          />
          {/* <MenuButton
            title="장바구니"
            source={require('../../../assets/icons/cart.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          /> */}
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
