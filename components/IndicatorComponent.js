/**
 * React Native App: XSeries
 * https://emexrevolarter.com
 *
 * copyright 2018
 */

import React, {Component} from 'react';
import { EmexTimeDayHour, EmexTimeAgo } from './FunctionComponent';
import { DbConnect, DocPage, DocSetting, EmexDbAdapter, EmexDbInfo, EmexDbGet } from '../database/AllSchemas';
import { IndicatorStyles, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/StyleConstant';
import {StyleSheet, Text, View, ActivityIndicator, Animated, Easing} from 'react-native';

export class RippleColors extends Component {

  constructor(props){
    super(props)
    this.state = {
      redirect: false,
      lastPage: '',
      lastPageDate: '',
      text: ''
    }
  }

  _getDb = () => {        
    EmexDbGet(DocPage).then(doc => {
      if(doc.last !== ''){
        this.setState({lastPage: doc.last});
        this.setState({text: doc.text});
        this.setState({lastPageDate: doc.modifyDate})
        this.setState({redirect: true})
      }else{
        this.setState({redirect: true})
      }
    }).catch(err=>{
        this.setState({redirect: true})
    })
  }

  componentWillMount(){
    this._getDb();
    this.mainColor = new Animated.Value(0);
    this.mainSize = new Animated.Value(0);
    this.ripple1Size = new Animated.Value(0);
    this.ripple2Size = new Animated.Value(0);
    this.ripple3Size = new Animated.Value(0);
    this.ripple4Size = new Animated.Value(0);
    this.ripple1Color = 'rgb(0,128,128)';
    this.ripple2Color = 'rgb(255,0,0)';
    this.ripple3Color = 'rgb(255,0,255)';
    this.ripple4Color = 'rgb(124,252,0)';
  }

  componentDidMount(){
    Animated.stagger(500, [
      Animated.timing(this.mainColor, {
        toValue: 10,
        duration: 1000,
        easing: Easing.bounce
      }),
      Animated.spring(this.mainSize, {
        toValue: 10,
        friction: 3,
        tension: 40
      }),
      Animated.timing(this.ripple1Size, {
        toValue: 10,
        duration: 300,
        easing: Easing.bounce
      }),
      Animated.spring(this.ripple2Size, {
        toValue: 10,
        friction: 3,
        tension: 20
      }),
      Animated.timing(this.ripple3Size, {
        toValue: 10,
        duration: 600,
        easing: Easing.bounce
      }),
      Animated.spring(this.ripple4Size, {
        toValue: 10,
        friction: 3,
        tension: 10
      }),
    ]).start()

  }

  render(){
    interpolateMainColor = this.mainColor.interpolate({
      inputRange: [0, 10],
      outputRange: ['rgba(0,0,139,0.5)', 'rgba(255,255,0, 0.5)'],
    });
    interpolateMainSize = this.mainSize.interpolate({
      inputRange: [0, 10],
      outputRange: [1, 3],
    });
    interpolateRipple1Size = this.ripple1Size.interpolate({
      inputRange: [0, 10],
      outputRange: [1, SCREEN_HEIGHT],
    });
    interpolateRipple2Size = this.ripple2Size.interpolate({
      inputRange: [0, 10],
      outputRange: [1, SCREEN_HEIGHT],
    });
    interpolateRipple3Size = this.ripple3Size.interpolate({
      inputRange: [0, 10],
      outputRange: [1, SCREEN_HEIGHT],
    });
    interpolateRipple4Size = this.ripple4Size.interpolate({
      inputRange: [0, 10],
      outputRange: [1, SCREEN_HEIGHT],
    });
    animatedIndicator = {
      transform: [
        {scale: interpolateMainSize}
      ],
      backgroundColor: interpolateMainColor
    }
    animatedRipple1 = {
      transform: [
        {scale: interpolateRipple1Size}
      ],
      borderColor: this.ripple1Color,
      borderWidth: 10,
    }
    animatedRipple2 = {
      transform: [
        {scale: interpolateRipple2Size}
      ],
      borderColor: this.ripple2Color,
      borderWidth: 10,
    }
    animatedRipple3 = {
      transform: [
        {scale: interpolateRipple3Size}
      ],
      borderColor: this.ripple3Color,
      borderWidth: 10,
    }
    animatedRipple4 = {
      transform: [
        {scale: interpolateRipple4Size}
      ],
      borderColor: this.ripple4Color,
      borderWidth: 10,
    }

    page = this.state.lastPage;
    rippleString3 = this.state.text? this.state.text: 'You can achieve more';
    getDate = this.state.lastPageDate?EmexTimeAgo(this.state.lastPageDate): ''
    lastTime = page!=''?getDate: '';
    rippleString1 = page? 'Found ' + page + ' page': '';
    rippleString2 = page? 'Visited ' + lastTime: '';
    return (
    <View style={IndicatorStyles.container}>
      <Animated.View style={[IndicatorStyles.subs, animatedRipple1]} />
      <Animated.View style={[IndicatorStyles.subs, animatedRipple2]} />
      <Animated.View style={[IndicatorStyles.subs, animatedRipple3]} />
      <Animated.View style={[IndicatorStyles.subs, animatedRipple4]} />
      <View style={IndicatorStyles.textContainer}>
        <Text style={IndicatorStyles.text}>{rippleString1} </Text>
        <Text style={IndicatorStyles.textTime}>Today ends {EmexTimeDayHour('endDay')}</Text>
        <Text style={IndicatorStyles.text}>{rippleString2} </Text>
        <Text style={IndicatorStyles.text}>{rippleString3} </Text>
      </View>
      <Animated.View style={[IndicatorStyles.activity, {padding: 10}, animatedIndicator]}>
        <ActivityIndicator color='#00008B' size='large' />
      </Animated.View>
    </View>
    )
  }
}