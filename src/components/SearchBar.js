import React from 'react';
import {View, Textinput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component{
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    };    
    state = {
        searchTerm: '',
    };
    debounceSearchDeals = debounce(this.props.searchDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({searchTerm}, () =>{
            this.debounceSearchDeals(this.state.searchTerm);
        });
    };
    render(){
        return(
            <Textinput 
                placeholder = "Search all Deals"
                style = {styles.input}
                onChangeText = {this.handleChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
      heigh: 40,
      marginHorizontal: 12,
    },
  });

export default SearchBar;