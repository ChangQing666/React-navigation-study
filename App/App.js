/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Button,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
class Greeting extends Component{
  render(){
    return(
        <Text>Hello{this.props.name}!</Text>
    )
  }
}
class Blink extends Component{
  constructor(props){
    super(props);
    this.state={showText:true}
    setInterval(()=>{
      this.setState(previousState=>{
        return {showText:!previousState.showText}
      })
    },1000)
  }
  render(){
    let display = this.state.showText?this.props.text:'';
    return(
        <Text style={[styles.blink,styles.red]}>{display}</Text>
    )
  }
}
class Translate extends Component{
  constructor(props){
    super(props);
    this.state = { text: ''}
  }
  render(){
    return(
        <View>
          <TextInput style={{height:40,color:'#ff0000'}}
                     placeholder='在这里输入进行翻译'
                     onChangeText={(text)=>this.setState({text})}
          />
          <Text>{this.state.text.split('').map((word)=>word && '🍕').join(' ')}</Text>
        </View>
    )
  }
}

class FlatListBasics extends Component{
  render(){
    return(
        <View>
          <FlatList
              data={[
                  {key: 'Devin'},
                  {key: 'Jackson'},
                  {key: 'James'},
                  {key: 'Joel'},
                  {key: 'John'},
                  {key: 'Jillian'},
                  {key: 'Jimmy'},
                  {key: 'Julie'},
              ]}
              renderItem={({item})=><Text>{item.key}</Text>}
          />
        </View>
    )
  }
}


type Props = {};
class App extends Component<Props> {
  render() {
    let pic = {
      uri:'https://tse3-mm.cn.bing.net/th?id=OIP.YuCM-twNToBK8QZfpGafVwHaHa&w=208&h=201&c=7&o=5&dpr=2&pid=1.7'
    }
    return (
      <ScrollView>
      <View style={styles.container}>

        <Image source={pic} style={{width: 400, height: 400}} />
        <Text style={styles.hello}>Hello world</Text>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Translate/>
        <Greeting name='chang'/>
        <Greeting name='xiang'/>
        <Blink text='I love to blik'/>
        <Blink  text='Look at me to see'/>
        <FlatListBasics/>
      </View>
      </ScrollView>
    );
  }
}

/*
* 导航
*
*
*
* */
class LogoTitle extends React.Component{
    render(){
        return(
            <Image
                source={require('../assets/images/logo.png')}
                style={{width:30,height:30}}
            />
        )
    }
}
class HomeScreen1 extends React.Component{
  static navigationOptions = {
    headerTitle:<LogoTitle/>,
    headerRight:(
        <Button
            onPress={()=>alert('This is a info button!')}
            title='info'
            color='#fff'
        />
    )
  }
  render(){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
          <Text style={{color:'#ff6600'}}>Home Screen</Text>
          <Button
              title="跳转到detail页面"
              color='#9900ff'
              onPress = {()=>{
                this.props.navigation.navigate('Details',{
                  itemId:88,
                  otherParam:'anything you want here',
                })}}
          />
        </View>
    )
  }
}
class HomeScreen extends React.Component{
    static navigationOptions = ({navigation})=>{
        const params = navigation.state.params || {};

        return{
            headerTitle:<LogoTitle/>,
            headerLeft:(
              <Button
                onPress={()=>navigation.navigate('MyModal')}
                title='点击出弹窗'
                color='#fff'
              />
            ),
            headerRight:(
                <Button
                  onPress = {params.increaseCount} title='点击+1' color='#fff'
                />
            )
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({increaseCount:this._increaseCount});
    }
    state={
        count:0,
    }
    _increaseCount=()=>{
        this.setState({
            count:this.state.count+1
        })
    };
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
                <Text style={{color:'#ff6600'}}>Home Screen</Text>
                <Text>Count:<Text style={{color:'#6b52ae'}}>{this.state.count}</Text></Text>
                <Button
                    title="跳转到detail页面"
                    color='#9900ff'
                    onPress = {()=>{
                        this.props.navigation.navigate('Details',{
                            itemId:88,
                            otherParam:'anything you want here',
                        })}}
                />
            </View>
        )
    }
}
class ModalScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:35}}>This is a modal!</Text>
                <Button
                  onPress={()=>this.props.navigation.goBack()}
                  title='Dismiss'
                />
            </View>
        )
    }
}
class DetailScreen extends React.Component{
    static navigationOptions = ({navigation,navigationOptions})=>{
        const {params} = navigation.state;
        return{
            title:params?params.otherParam:'A Nested Details Screen',
            headerStyle:{
                backgroundColor:navigationOptions.headerStyle,
            },
            headerTintColor:navigationOptions.headerStyle.backgroundColor,
        }
    }
  render(){
    const {params} = this.props.navigation.state;
    const itemId = params?params.itemId:null;
    const otherParam = params?params.otherParam:null;
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'#0066ff'}}>Detail Screen</Text>
          <Text>itemId:{JSON.stringify(itemId)}</Text>
          <Text>otherParam:{JSON.stringify(otherParam)}</Text>
          <Button
            title='Go to Details ... again'
            onPress = {()=>this.props.navigation.navigate("Details")}
          />
          <Button
            title='Go back'
            onPress={()=>this.props.navigation.goBack()}
          />
          <Button
            title="update the title"
            onPress={()=>this.props.navigation.setParams({otherParam:'Updated!'})}
          />
        </View>
    )
  }
}

const MainStack = StackNavigator(
    {
        Home:{
            screen:HomeScreen,
        },
        Details:{
          screen:DetailScreen,
        }
    },
    {
        initialRouteName:'Home',
        navigationOptions:{
            headerStyle:{
                backgroundColor:'#f4511e',
            },
            headerTintColor:'#fff',
                headerTitleStyle:{
                fontWeight:'bold',
            }
        }
    }
)
const RootStack = StackNavigator(
    {
        Main:{
            screen:MainStack,
        },
        MyModal:{
            screen:ModalScreen,
        }
    },{
       mode:'mode',
       headerMode:'none',
    }
)
export default RootStack;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  hello:{
    fontSize:40,
    color: '#ff6600',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  blink:{
    color:'#ff0000',
    fontSize:20,
  },
  red:{
    color:'#ff6600',
  }
});
