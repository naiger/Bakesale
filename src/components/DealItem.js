import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import priceDisplay from '../util'

class DealItem extends React.Component {
    static propTypes = {
        deals: PropTypes.object.isRequired,
        onPress : PropTypes.func.isRequired,
    };

    handlePress = () => {
        this.props.onPress(this.props.deal.key)
    }
  
    render(){
        return(
        <TouchableOpacity 
            style = {styles.list}
            onPress = {this.handlePress}  
        >
            <Image soruce={{uri: this.props.deal.media[0]}}
                   style={styles.image}
            />
            <View>
                <Text>{deal.title}</Text>
                <Text>{priceDisplay(deal.price)}</Text>
                <Text>{deal.couse.name}</Text>
            </View>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
});

export default DealItem;
