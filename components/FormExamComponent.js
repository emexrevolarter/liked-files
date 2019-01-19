import React, {Component} from 'react';
import { Page } from '../constants/AppConstant';
import {Button} from 'react-native';
import { IconSolid  } from '../components/IconComponent';
import {FormErrors} from '../constants/FeedbackConstant';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import { Form, Separator,InputField, LinkField, SwitchField, PickerField, DatePickerField,TimePickerField } from 'react-native-form-generator';
var yup = require('yup');
 
const schema = yup.object().shape({
  emailAddress: yup.string().email().required(),
});

export const SCREEN_WIDTH = Dimensions.get("window").width;

export const SCREEN_X = (SCREEN_WIDTH - 10) / 10;

export class ExamForm extends Component{
  static navigationOptions = ({navigation}) => {
    return {
    title: 'Exam Page',
    headerStyle: {
      backgroundColor: '#f00'
      },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
      },
    }
  }

  constructor(props){
    super(props);
    this.state = {
        refreshing: false,
        modalType: '',
        modalData: '',
        modalTitle: '',
        formData: {}, //object of fields
        showData: {}, //objects of data displayed
        isValid: true, // for form processing
        errors: [], //array of errors
        // fields state <MODIFY>
        fieldEmail: '', fieldEmailError: '',
    }
  }

  openPage = (page) => {
    this.props.navigation.navigate(page)
  }

  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData: formData})    
    this.setState({showData: ''})
    this.emexSanitizeData();
    this.props.onFormChange && this.props.onFormChange(formData);
  }

  emexSanitizeData = () => {
    errors = []; valid = true;
    //reset form state
      this.setState({isValid: true});
      this.setState({errors: ''});
    //iterate over fields <MODIFY>
    if(this.state.fieldEmail === false) {
      this.setState({isValid: false}); valid = false;
      errors['0'] = {email: this.state.fieldEmailError};
    }


    // save state of form
    if(valid === false){
      errorLength = errors.length;
      errorMsg = 'Errors found: ' + errorLength;
      this.setState({errors: errors}); // set to list errors
      // this.setState({errors: errorMsg}); // set to display message instead
    }
    
  }

  emexSendData = () => { // view result in form OR save OR send to backend
    if(this.state.isValid === true) {
      const data = this.state.formData;
      this.setState({showData: data})
    } else {
      const data = this.state.errors;
      this.setState({showData: data})
    }
  }

  emexSetField = (field = '', data) => {
    // fields <MODIFY>
    switch (field) {
      case 'email':
      if(data === true){ this.setState({fieldEmail: true}); } else {
        this.setState({fieldEmail: false});
        this.setState({fieldEmailError: FormErrors.email.invalid});
      }
        break;
    
      default:
        break;
    }
  }

  emexGetField = (field = '') => {
    // fields <MODIFY>
    switch (field) {
      case 'email': return this.state.fieldEmail; break;
    
      default:
        break;
    }
  }

  emexGetFieldError = (field = '') => {
    // fields <MODIFY>
    switch (field) {
      case 'email': return this.state.fieldEmailError; break;
    
      default:
        break;
    }
  }

  handleFormFocus(e, component){
    // console.warn(e, component);
  }
  openTermsAndConditionsURL(){

  }
  render(){
    return (
    <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1, paddingLeft:10,paddingRight:10, marginTop: 20}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='first_name'
          label='First Name'
          placeholder='First Name'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.first_name.valid){
                return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.first_name.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
        <InputField
          multiline={true}
          numberOfLines={10}
          ref='last_name'
          placeholder='Last Name'
          label='Enter your Last Name'
          helpText='This is your Surname'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 80, borderRadius: 15}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00'}]}
          inputStyle={[{minHeight: 50, minWidth: (SCREEN_X * 8)-20, maxWidth: (SCREEN_X * 9)-20, backgroundColor: '#ff0'}]}
          iconLeft={
            <IconSolid icon='amazon'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }
          
           />
        <InputField
          multiline={true}
          numberOfLines={10}
          ref='other_input'
          placeholder='Other Input'
          label='Enter your Other Info here'
          helpText='this is an helpful text it can be also very very long and it will wrap'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 180, borderRadius: 15}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00'}]}
          inputStyle={[{minHeight: 150, minWidth: (SCREEN_X * 8)-20, maxWidth: (SCREEN_X * 9)-20, backgroundColor: '#ff0'}]}
          iconLeft={
            <IconSolid icon='amazon'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }          
           />
        <Separator />
        <LinkField onPress={()=>this.openPage('Form')}
          label='Open Form Page'
          helpText='this opens a link'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 25, borderRadius: 5}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00'}]}
          iconLeft={
            <IconSolid icon='amazon'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }
        />

        <SwitchField label='I accept Terms & Conditions'
          ref="has_accepted_conditions"
          helpText='Please read carefully the terms & conditions'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 25, borderRadius: 5}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00'}]}
          switchStyle={{backgroundColor: '#f0f'}}
          iconLeft={
            <IconSolid icon='amazon'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }

          />
        <PickerField ref='unit'
          section={false}
          multiple={false}
          label='Single select'
          
      
          items = {[
            {
              id: 'Home',
              find: 'Home',
            name: <Text><IconSolid icon='home' size={15} style={[ {color:"#800000", width: SCREEN_X}]} /> Home</Text>,
          }, {
            id: 'About',
            find: 'About',
            name: <Text><IconSolid icon='user' size={15} style={[ {color:"#800000", width: SCREEN_X}]} /> About</Text>,
          }, {
            id: 'Settings',
            find: 'Settings',
            name: <Text><IconSolid icon='cog' size={15} style={[ {color:"#800000", width: SCREEN_X}]} /> Setting</Text>,
          }, {
            id: 'Form',
            find: 'Form',
            name: 'Form',
          }, {
            id: ' users',
            find: 'Users',
            name: 'Users',
          }, {
            id: ' editors',
            find: 'Editors',
            name: 'Editors',
          }, {
            id: ' premium',
            find: 'Premium',
            name: 'Premium',
          }, {
            id: ' accounts',
            find: 'Accounts',
            name: 'Accounts',
          }, {
            id: ' plugins',
            find: 'Plugins',
            name: 'Plugins',
          }
          ]}

          helpText='Choose any Service'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 100, borderRadius: 3, paddingHorizontal: 5}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00', paddingBottom: 10}]}
          tagStyle={{backgroundColor: '#f00'}}
          iconLeft={
            <IconSolid icon='cart-arrow-down'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }
          />
        <PickerField ref='multiple'
          section={true}
          multiple={true}
          label='Sectioned multiple select'
          items = {[
            {  
              name: "Home of Fruits",
              find: 'Fruit',
              id: 0,
              children: [{
                  name: <Text><IconSolid icon='home' size={15} style={[ {color:"#800000", width: SCREEN_X}]} /> Home</Text>,
                  id: ' Home',
                  find: 'Home'
                },{
                  name: "Strawberry",
                  id: ' Strawberry',
                  find: 'Strawberry'
                },{
                  name: "Pineapple",
                  id: ' Pineapple',
                  find: 'Pineapple'
                },{
                  name: "Banana",
                  id: ' Banana',
                  find: 'Banana'
                },{
                  name: "Watermelon",
                  id: ' Watermelon',
                  find: 'Watermelon'
                },{
                  name: "Kiwi fruit",
                  id: ' Kiwi',
                  find: 'Kiwi'
                }]
            },
            {
              name: "Gems",
              find: 'Gems',
              id: 1,
              children: [{
                  name: "Quartz",
                  id: ' Quartz',
                  find: 'Quartz'
                },{
                  name: "Zircon",
                  id: ' Zircon',
                  find: 'Zircon'
                },{
                  name: "Sapphire",
                  id: ' Sapphire',
                  find: 'Sapphire'
                },{
                  name: "Topaz",
                  id: ' Topaz',
                  find: 'Topaz'
                }]
            },
            {
              name: "Plants",
              find: 'Plants',
              id: 2,
              children: [{
                  name: "Spinach",
                  id: ' Spinach',
                  find: 'Spinach'
                },{
                  name: "Yucca",
                  id: ' Yucca',
                  find: 'Yucca'
                },{
                  name: "Monsteria",
                  id: ' Monsteria',
                  find: 'Monsteria'
                },{
                  name: "Palm",
                  id: ' Palm',
                  find: 'Palm'
                }]
            },
          ]}  
          helpText='Choose any Fruit'
          containerStyle={[{backgroundColor: '#ff0000', minHeight: 100, borderRadius: 3, paddingHorizontal: 5}, AppStyles.boxShadow]}
          labelStyle={[{color: '#00ff00', paddingBottom: 10}]}
          iconLeft={
            <IconSolid icon='cart-plus'
              size={20}
              style={[
                {color:"#61d062", width: SCREEN_X}
              ]}
            />
          }
          />
          <DatePickerField ref='birthday'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()}
          placeholder='Birthday'/>
        <TimePickerField ref='alarm_time'
        placeholder='Set Alarm'/>
        <DatePickerField ref='meeting'
          minimumDate={new Date('1/1/1900')}
          maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>

           <InputField
    label='Example' // if label is present the field is rendered with the value on the left (see First Name example in the gif), otherwise its rendered with textinput at full width (second name in the gif).
    ref='emailAddress' // used in onChange event to collect the value
    value='' // used as initial value
    keyboardType = 'email-address' // 'default', 'email-address', 'numeric', 'phone-pad', 'number-pad', 'ascii-capable', 'numbers-and-punctuation',
    // 'url', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password'    
    helpText={((self)=>{
      if(Object.keys(self.refs).length !== 0){
        if(!self.refs.registrationForm.refs.emailAddress.valid){
          return self.refs.registrationForm.refs.emailAddress.validationErrors.join("\n");
        }
      }
      // if(!!(self.refs && self.refs.email_address.valid)){
      // }
      })(this)}
    validationFunction = {(value)=>{

      if(value == '') return "Required";
      //Initial state is null/undefined
      if(!value) return true;

      //check validity
      let res, data;
      schema.isValid({
            emailAddress: value
          }).then(response => {
            this.emexSetField( 'email', response)
          }).catch(function(err){
            //console.warn(err)
          });

      data = this.emexGetField('email');
      if(data === false){
        return this.emexGetFieldError( 'email' );
      }
        
          return true;
          }
      }
    iconRight={
      <IconSolid icon='amazon'
        size={20}
        style={[
          {color:"#61d062", width: 50 },
          ((self)=>{
            //i can change the style of the component related to the attibute of email_address
            if(!!(self.refs && self.refs.email_address)){
              if(!self.refs.email_address.valid) return {color:'#d52222'}
            }
            }
          )(this)]}
        />
    }  //React Component
    />

    <Button title='Save' onPress={() => {this.emexSendData()}} />
        </Form>
        <Text>{JSON.stringify(this.state.showData)}</Text>

      </ScrollView>);
    }
  }