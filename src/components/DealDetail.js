import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import priceDisplay from '../util';
import ajax from '../ajax';

class DealDetail extends React.Component {
    static propTypes = {
        initialDealDate: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealDate,
    };
    async componentDidMount(){
        const fullDeal = await ajax.fetchInitialDeals(this.state.deal.key); 
        //console.log(fullDeal);
        this.setState({
            deal: fullDeal,
        });
    }
  
    render(){
        const {deal} = this.state;
        return(
            <View style = {styles.list}>
                <TouchableOpacity onPress = {this.props.onBack}>
                    <Text style = {styles.backlink}>Back</Text>
                </TouchableOpacity>
                <Image soruce={{uri: this.props.deal.media[0]}}
                    style={styles.image}
                />
                <View>
                    <Text>{deal.title}</Text>
                    <Text>{priceDisplay(deal.price)}</Text>
                    <Text>{deal.couse.name}</Text>
                </View>
                { deal.user && (
                    <View>
                        <Image soruce={{uri: this.props.user.avatar}}
                            style={styles.avatar}/>
                        <Text>{deal.user.name}</Text>
                    </View>
                )}
                <View>
                    <Text>{deal.description}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
  avatar: {
      width: 60,
      height: 60,
  },
  backlink: {
    marginBottom: 5,
    color: '#22f',
  },
});

export default DealDetail;
