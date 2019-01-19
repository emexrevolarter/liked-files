/**
 * React Native App: XSeries
 * https://emexrevolarter.com
 *
 * copyright 2018
 */
//'use strict';
import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { SCREEN_X, SCREEN_Y } from '../constants/StyleConstant';
import MultiSelect from 'react-native-multiple-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const SCREEN_WIDTH = Dimensions.get("window").width;

export const SCREEN_X = (SCREEN_WIDTH - 10) / 10;

export const SCREEN_Y = (SCREEN_HEIGHT - 20) / 20;

export class EmexSearchableList extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedItems: [],
      value: props.value || props.label,
    }
    this.pickerMeasures = {};
  }

  setValue(value){
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}.
  }

  handleValueChange(value){// remove

    this.setState({value:(value && value!='')?value:this.props.label});

    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems: selectedItems });
    this.props.nav?
      typeof selectedItems == 'object' && selectedItems[0] !== '' && selectedItems[0] !== undefined?
        this.props.nav(selectedItems[0])
      : null
    : null;
    this.props.get?
      this.props.get(selectedItems)
    : null;

    this.setState({value:(selectedItems && selectedItems!='')?selectedItems:this.props.label});

    if(this.props.onChange)      this.props.onChange(selectedItems);
    if(this.props.onValueChange) this.props.onValueChange(selectedItems);
  };
  
  render() {
    const { selectedItems } = this.state;
    return (
      <View>
      <View 
          onLayout={this.handleLayoutChange.bind(this)}
          style={[
              this.props.containerStyle,
              this.props.label?{flexDirection: 'column'}: {flexDirection: 'row'}
            ]}>
          {(this.props.label)
            ?
            <View style={{flexDirection: 'row', justifyContent: this.props.iconLeft? 'flex-start' :'space-between'}}>
            {(this.props.iconLeft)
              ? <View style={{alignSelf: 'flex-start'}}>{this.props.iconLeft}</View>
              : null
            }
            <Text style={[{alignSelf: 'center', flexWrap: 'wrap', maxWidth: SCREEN_X * 7} ,this.props.labelStyle]}
              onLayout={this.handleLabelLayoutChange}
              onPress={this.handleFieldPress}
              suppressHighlighting={true}
              >{this.props.label}</Text>
              {(this.props.iconRight)
                  ? <View style={{alignSelf: 'flex-end'}}>{this.props.iconRight}</View>
                  : null
                }
            </View>
            : (this.props.iconLeft)
              ? <View style={{alignSelf: 'flex-start'}}>{this.props.iconLeft}</View>
              : null
          }
        <MultiSelect
          hideTags
          items={this.props.items}
          single={!this.props.multiple}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText=" Pick Items"
          searchInputPlaceholderText=" Search Items..."
          onChangeInput={ (text)=> {}}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#008080"
          selectedItemIconColor="#008080"
          itemTextColor="#000"
          displayKey="name"
          findKey="find"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Choose"
          style={{paddingHorizontal: 20}}
        />
            {(this.props.label && this.props.iconRight)
                  ? <View style={{alignSelf: 'flex-end'}}>{this.props.iconRight}</View>
                  : null
                }
        </View>
        <View style={this.props.tagStyle}>
          {this.multiSelect?this.multiSelect.getSelectedItemsExt(selectedItems): <Text></Text>}
        </View>
        <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
          {this.props.helpText}
        </Text>
        </View>
    );
  }
}

export class EmexSectionSearchableList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedItems: [],
      value: props.value || props.label,
    }
    this.pickerMeasures = {};
  }

  setValue(value){
    this.setState({value:value});
    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }
  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};

    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}.
  }

  handleValueChange(value){// remove

    this.setState({value:(value && value!='')?value:this.props.label});

    if(this.props.onChange)      this.props.onChange(value);
    if(this.props.onValueChange) this.props.onValueChange(value);
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.nav?
      typeof selectedItems == 'object' && selectedItems[0] !== '' && selectedItems[0] !== undefined?
        this.props.nav(selectedItems[0])
      : null
    : null;
    this.props.get?
      this.props.get(selectedItems)
    : null;

    this.setState({value:(selectedItems && selectedItems!='')?selectedItems:this.props.label});

    if(this.props.onChange) {
      this.props.onChange(selectedItems);
    }
    if(this.props.onValueChange) {
      this.props.onValueChange(selectedItems);
    }
  }

  render() {
    return (
      <View>
      <View 
          onLayout={this.handleLayoutChange.bind(this)}
          style={[
              this.props.containerStyle,
              this.props.label?{flexDirection: 'column'}: {flexDirection: 'row'}
            ]}>
          {(this.props.label)
            ?
            <View style={{flexDirection: 'row', justifyContent: this.props.iconLeft? 'flex-start' :'space-between'}}>
            {(this.props.iconLeft)
              ? <View style={{alignSelf: 'flex-start'}}>{this.props.iconLeft}</View>
              : null
            }
            <Text style={[{alignSelf: 'center', flexWrap: 'wrap', maxWidth: SCREEN_X * 7} ,this.props.labelStyle]}
              onLayout={this.handleLabelLayoutChange}
              onPress={this.handleFieldPress}
              suppressHighlighting={true}
              >{this.props.label}</Text>
              {(this.props.iconRight)
                  ? <View style={{alignSelf: 'flex-end'}}>{this.props.iconRight}</View>
                  : null
                }
            </View>
            : (this.props.iconLeft)
              ? <View style={{alignSelf: 'flex-start'}}>{this.props.iconLeft}</View>
              : null
          }
            <SectionedMultiSelect
            items={this.props.items} 
            single={!this.props.multiple}
            uniqueKey='id'
            subKey='children'
            selectText='Choose: '
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
            selectedItems={this.state.selectedItems}
            // renderSelectText={(objs)=>{}}//objs: all props
              style={[
                this.props.inputStyle,
                {justifyContent: 'center', alignSelf: 'center'}
              ]}
          />
            {(this.props.label && this.props.iconRight)
                  ? <View style={{alignSelf: 'flex-end'}}>{this.props.iconRight}</View>
                  : null
                }
        </View>
        <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
          {this.props.helpText}
        </Text>
        </View>
    );
  }
}
