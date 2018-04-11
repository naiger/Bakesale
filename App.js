import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from './src/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';

class App extends React.Component {
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  };  

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    //console.log(deals);
    this.setState({deals});
  }
  searchDeals = async (searchTerm) =>{
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
    }
    this.setState({dealsFromSearch});
  };
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  };
  unsetCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: null
    })
  };
  currentDeal = () =>{
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };

  render(){
    if (this.state.currentDealId) {
      return (<DealDetail 
        initialDealData={this.currentDeal()}
        onBack = {this.unsetCurrentDeal}/>);
      }
    const dealsToDisplay = this.state.dealsFromSearch.length > 0
      ? this.state.dealsFromSearch
      : this.state.deals;

    if (dealsToDisplay.length > 0){
      return (
      <View style={style.main}>
        <Searchbar searchDeals = {this.searchDeals}/>
        <DealList 
          deals={dealsToDispla} 
          onItemPress = {this.setCurrentDeal}/>
      </View>);
    }
    return(
      <View style = {styles.container}>
          <Text style = {styles.header}>Bakesale</Text>    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
  main:{
    marginTop: 30,
  },
});

export default App;
