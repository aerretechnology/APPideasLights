import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

/**
 * Screen with the buttons for selecting the option by which the controller should be added
 * 
 * TODO: Add a button that leads to the AddByScann screen and implement finding controllers by scanning the network
 * 
 * @author costmo
 * @since 20180825
 */
export class AddNodeScreen extends React.Component {
	
	static navigationOptions = {
	    title: 'Add lights',
	    headerBackTitle: 'Back',
	  };
	
	  render() {
	    return (
	      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#D3E3F1', paddingTop: 50 }}>
	        <Text>Add a WiFi LED controller...{"\n\n"}</Text>
	        <Button
	          title="By IP address"
	          onPress={() => this.props.navigation.navigate( 'AddByIP' )}
	        />
	        <Text>{"\n"}</Text>
	      </View>
	    );
	  }
	}