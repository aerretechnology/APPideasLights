import React, {Component} from 'react';
import {Button, Text, View, Switch, Slider, ScrollView, Alert} from 'react-native';

var ceil = require( 'math-ceil' );

var ipAddr = "";
nav = "";
var incomingData = new Array();

var lastAlert = 0;

/**
 * Main screen to control lights
 * 
 * @author costmo
 * @since 20180825
 * @return void
 */
export class ControlsScreen extends React.Component {
	
	constructor( props )
	{
		super( props );
		this.state = { lightsOn1: true, lightsOn2: true, 
				rValue1: 100, gValue1: 100, bValue1: 100, wValue1: 100,
				rValue2: 100, gValue2: 100, bValue2: 100, wValue2: 100
				};
		
		incomingData = this.props.navigation.getParam( "itemData", new Array() );
		ipAddr = incomingData.ipAddr;
		nav = props.navigation;
	}
	
	setAllSliders( whichPosition, value )
	{
		if( "first" == whichPosition )
		{
			this.setState( { rValue1: value } );
			this.setState( { gValue1: value } );
			this.setState( { bValue1: value } );
			this.setState( { wValue1: value } );
		}
		else
		{
			this.setState( { rValue2: value } );
			this.setState( { gValue2: value } );
			this.setState( { bValue2: value } );
			this.setState( { wValue2: value } );
		}
	}
	
	static navigationOptions = {
	    title: 'Controls',
	    headerBackTitle: 'Back',
	    headerRight: (
	            <Button
					onPress={ () => { nav.navigate( 'Config', 
							{
								itemData: incomingData
							} ); } }
		            title="Config"
		            color="#000"
		        />
	        ),
	  };
	
	/**
	 * Handle user toggling lights on/off
	 * 
	 * @author costmo
	 * @since 20180825
	 * @return void
	 * @param string	whichSet	Which light set to affect - first|second
	 */
	handleToggle( whichSet )
	{
		var args = "p=" + whichSet;
		args += "&c=all";
		
		if( "first" == whichSet )
		{
			if( this.state.lightsOn1 )
			{
				args += "&l=0";
				this.setState( { lightsOn1: false } );
				this.setAllSliders( whichSet, 0 );
			}
			else
			{
				args += "&l=100";
				this.setState( { lightsOn1: true } );
				this.setAllSliders( whichSet, 100 );
			}
		}
		else
		{
			if( this.state.lightsOn2 )
			{
				args += "&l=0";
				this.setState( { lightsOn2: false } );
				this.setAllSliders( whichSet, 0 );
			}
			else
			{
				args += "&l=100";
				this.setState( { lightsOn2: true } );
				this.setAllSliders( whichSet, 100 );
			}
		}
		this.sendCommand( "control", args );
	}
	
	/**
	 * Handle the user sliding the brightness controls
	 * 
	 * @author costmo
	 * @since 20180825
	 * @return void
	 * @param string	section	first|second
	 * @param string	color	red|green|blue|white
	 * @param string	value	1 - 100
	 */
	handleSlide( section, color, value )
	{
		var args = "p=" + section;
		args += "&c=" + color;
		args += "&l=" + value;
		this.sendCommand( "control", args );
		
		if( "red" == color )
		{
			if( "first" == section )
			{
				this.setState( { rValue1: value } );
			}
			else
			{
				this.setState( { rValue2: value } );
			}
		}
		else if( "green" == color )
		{
			if( "first" == section )
			{
				this.setState( { gValue1: value } );
			}
			else
			{
				this.setState( { gValue2: value } );
			}
		}
		else if( "blue" == color )
		{
			if( "first" == section )
			{
				this.setState( { bValue1: value } );
			}
			else
			{
				this.setState( { bValue2: value } );
			}
		}
		else if( "white" == color )
		{
			if( "first" == section )
			{
				this.setState( { wValue1: value } );
			}
			else
			{
				this.setState( { wValue2: value } );
			}
		}
	}
	
	/**
	 * Set the default slider and switch values after the interface components have mounted
	 * 
	 * @author costmo
	 * @since 20181028
	 * @return void
	 */
	componentDidMount()
	{
		this.setSliderValues();
	}
	
	/**
	 * Render the screen
	 * 
	 * @author costmo
	 * @since 20180825
	 * @return void
	 */
	  render() {

	    return (
	      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#D3E3F1', paddingTop: 20 }}>
	      <ScrollView contentContainerStyle={{flexGrow: 1 }}>
	        <Text>First set of lights{"\n"}</Text>
	        <Switch
	        	onValueChange = { () => { this.handleToggle( "first" ); } }
	        	value = { this.state.lightsOn1 }
	        />
	        
	        <Text>{"\n"}</Text>
	        <View style={{ flexDirection: 'row' }}>
	          <Text style={{ paddingTop: 8 }}>R </Text>
		      <Slider
		      	  style={{ width: '80%' }}
		          step={10}
		          minimumValue={0}
		          maximumValue={100}
		          onValueChange={ (value) => { this.handleSlide( "first", "red", value ) } }
		          value={ this.state.rValue1 }
		        />
		     </View>
		      
		     <Text>{"\n"}</Text>
		     <View style={{ flexDirection: 'row' }}>
	          <Text style={{ paddingTop: 8 }}>G </Text>
		      <Slider
		      	  style={{ width: '80%' }}
		          step={10}
		          minimumValue={0}
		          maximumValue={100}
		          onValueChange={ (value) => { this.handleSlide( "first", "green", value ) } }
		          value={ this.state.gValue1 }
		        />
		     </View>
		     
		     <Text>{"\n"}</Text>
		     <View style={{ flexDirection: 'row' }}>
	          <Text style={{ paddingTop: 8 }}>B </Text>
		      <Slider
		      	  style={{ width: '80%' }}
		          step={10}
		          minimumValue={0}
		          maximumValue={100}
		          onValueChange={ (value) => { this.handleSlide( "first", "blue", value ) } }
		          value={ this.state.bValue1 }
		        />
		     </View>
		      
		     <Text>{"\n"}</Text>
		     <View style={{ flexDirection: 'row' }}>
	          <Text style={{ paddingTop: 8 }}>W </Text>
		      <Slider
		      	  style={{ width: '80%' }}
		          step={10}
		          minimumValue={0}
		          maximumValue={100}
		          onValueChange={ (value) => { this.handleSlide( "first", "white", value ) } }
		          value={ this.state.wValue1 }
		        />
		     </View>
		      
		      <Text>{"\n\n\n\n"}</Text>
		      
		      
		      <Text>Second set of lights{"\n"}</Text>
		        <Switch
		        	onValueChange = { () => { this.handleToggle( "second" ); } }
		        	value = { this.state.lightsOn2 }
		        />
		        
		        <Text>{"\n"}</Text>
		        <View style={{ flexDirection: 'row' }}>
		          <Text style={{ paddingTop: 8 }}>R </Text>
			      <Slider
			      	  style={{ width: '80%' }}
			          step={10}
			          minimumValue={0}
			          maximumValue={100}
			          onValueChange={ (value) => { this.handleSlide( "second", "red", value ) } }
			          value={ this.state.rValue2 }
			        />
			     </View>
			      
			     <Text>{"\n"}</Text>
			     <View style={{ flexDirection: 'row' }}>
		          <Text style={{ paddingTop: 8 }}>G </Text>
			      <Slider
			      	  style={{ width: '80%' }}
			          step={10}
			          minimumValue={0}
			          maximumValue={100}
			          onValueChange={ (value) => { this.handleSlide( "second", "green", value ) } }
			          value={ this.state.gValue2 }
			        />
			     </View>
			     
			     <Text>{"\n"}</Text>
			     <View style={{ flexDirection: 'row' }}>
		          <Text style={{ paddingTop: 8 }}>B </Text>
			      <Slider
			      	  style={{ width: '80%' }}
			          step={10}
			          minimumValue={0}
			          maximumValue={100}
			          onValueChange={ (value) => { this.handleSlide( "second", "blue", value ) } }
			          value={ this.state.bValue2 }
			        />
			     </View>
			      
			     <Text>{"\n"}</Text>
			     <View style={{ flexDirection: 'row' }}>
		          <Text style={{ paddingTop: 8 }}>W </Text>
			      <Slider
			      	  style={{ width: '80%' }}
			          step={10}
			          minimumValue={0}
			          maximumValue={100}
			          onValueChange={ (value) => { this.handleSlide( "second", "white", value ) } }
			          value={ this.state.wValue2 }
			        />
			     </View>
			     <Text>{"\n\n"}</Text>
		  </ScrollView>
	      </View>
	    );
	  }
	  
	  /**
		 * Set the default slider and switch values by querying the ESP device
		 * 
		 * @author costmo
		 * @since 20181028
		 * @return void
		 */
	  setSliderValues()
	  {
		  var url = "http://" + ipAddr + ":5050/status";
		  fetch( url )
		    .then(
		    		(response) => 
		    		{
		    			return response.text();
		    		})
		    .then( 
		    		(responseText) => 
		    		{
		    	
		    			//var bodyJsonString = JSON.stringify( responseJson._bodyInit );
		    			var bodyJson = JSON.parse( responseText );
  			
		    			var firstRatios = bodyJson.firstratios;
		    			var secondRatios = bodyJson.secondratios;
		    			
		    			if( firstRatios != undefined )
	    				{
		    				var rValue = ceil( firstRatios[0] * 100 );
		    				var gValue = ceil( firstRatios[1] * 100 );
		    				var bValue = ceil( firstRatios[2] * 100 );
		    				var wValue = ceil( firstRatios[3] * 100 );
		    				
		    				if( rValue > 0 || gValue > 0 || bValue > 0 || wValue > 0 )
	    					{
		    					this.setState( { lightsOn1: true } );
	    					}
		    				else
	    					{
		    					this.setState( { lightsOn1: false } );
	    					}
		    				
		    				this.setState( { rValue1: rValue } );
		    				this.setState( { gValue1: gValue } );
		    				this.setState( { bValue1: bValue } );
		    				this.setState( { wValue1: wValue } );
	    				}
		    			
		    			if( secondRatios != undefined )
	    				{
		    				var rValue = ceil( secondRatios[0] * 100 );
		    				var gValue = ceil( secondRatios[1] * 100 );
		    				var bValue = ceil( secondRatios[2] * 100 );
		    				var wValue = ceil( secondRatios[3] * 100 );
		    				
		    				if( rValue > 0 || gValue > 0 || bValue > 0 || wValue > 0 )
	    					{
		    					this.setState( { lightsOn2: true } );
	    					}
		    				else
	    					{
		    					this.setState( { lightsOn2: false } );
	    					}
		    				
		    				this.setState( { rValue2: rValue } );
		    				this.setState( { gValue2: gValue } );
		    				this.setState( { bValue2: bValue } );
		    				this.setState( { wValue2: wValue } );
	    				}
		    	
		    			return bodyJson;
		    		})
		    .catch(
		    		(error) => 
				    {
				    	
				    	console.log( "ERROR SETTING CONTROL STATE: " + error );
				    });
	  }
	  
	  sendCommand( path, args )
	  {
		  var url = "http://" + ipAddr + ":5050/" + path + "?" + args;
		  return fetch( url )
		    .then(
		    		(response) => 
		    		{
		    			response.json();
		    		})
		    .then((responseJson) => {
		      return responseJson;
		    })
		    .catch((error) => {
		    	
		    	// only show errors/alerts once every 60 seconds. Dragging a control may show many alerts otherwise.
		    	var timeDiff = (Date.now() - lastAlert);
		    	if( timeDiff < (60 * 1000) )
		    	{
		    		return;
		    	}
		    	else
		    	{
		    	
			    	lastAlert = Date.now();
			    	
			    	Alert.alert(
		    			'NETWORK ERROR',
		    			'I have encountered a network error. Make sure that your device and the lights are connected to the same WiFi network and that the IP address of the controller is correct. Error: ' + error,
		    			[
		    				{ text: 'OK', onPress: () => { /* Just dismiss */ } }
		    			],
		    			{
		    				cancelable: true
		    			}
		    		);
		    	}
		    });
		    
	  }
	  
}