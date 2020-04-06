import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
var { width } = Dimensions.get("window")


// import icons
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart:[],
    };
 }



 render() {
   return (
     <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height:20}} />
        {/* <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Cart food</Text> */}
        <View style={{height:10}} />

        <View style={{flex:1}}>
          <ScrollView>
              <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: 'https://shoppi.s3.ap-northeast-2.amazonaws.com/images/1577166515%EC%86%8C%EA%B3%A0%EA%B8%B0.jpg'}} />
                <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                  <View>
                    <Text style={{fontWeight:"bold", fontSize:20}}>이름</Text>
                    <Text>Lorem Ipsum de food</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>3000</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <TouchableOpacity onPress={()=>this.onChangeQuan(i,false)}>
                        <Icon name="ios-remove-circle" size={35} color={"#33c37d"} />
                      </TouchableOpacity>
                      <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>1</Text>
                      <TouchableOpacity onPress={()=>this.onChangeQuan(i,true)}>
                        <Icon name="ios-add-circle" size={35} color={"#33c37d"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            <View style={{height:20}} />

            <TouchableOpacity style={{
                backgroundColor:"#33c37d",
                width:width-40,
                alignItems:'center',
                padding:10,
                borderRadius:5,
                margin:20
              }}>
              <Text style={{
                  fontSize:24,
                  fontWeight:"bold",
                  color:'white'
                }}>
                CHECKOUT
              </Text>
            </TouchableOpacity>

            <View style={{height:20}} />
          </ScrollView>

        </View>

     </View>
   );
  }
}
