import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

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
	        <Button
	          title="Scan network"
	          onPress={() =>  this.props.navigation.navigate( 'AddByScan' )}
	        />
	      </View>
	    );
	  }
	}