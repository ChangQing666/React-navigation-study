import React,{Component} from 'react'
import {Button,Alert} from 'react-native'
class ButtonCustome extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let onButtonPress = ()=>{
            Alert.alert("按钮被点击")
        }
        return(
            <Button
                title={this.props.name}
                color='#ff6600'
                onPress={onButtonPress}
            />
        )
    }
}
export default class Mycomponent extends Component{
    render(){
        return(
            <ButtonCustome name='提示'/>
        )
    }
}
