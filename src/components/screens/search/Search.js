import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, StatusBar, SafeAreaView, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '../../commonComponents/Card'
import { searchResultData } from '../../../containers/actions/userActions';
import { ActivityIndicator, Colors, TextInput } from 'react-native-paper';
import Reactotron from 'reactotron-react-native'
import axios from 'axios'
import { main_url, TMDB_API_KEY } from '../../../utils/Config';
class Search extends Component {
    static propTypes = {
        prop: PropTypes
    }
    state = {
        searchText: '',
        include_adult: this.props.user.switch_adult,
        searchResult: []
    }

    _getData = (searchText) => {
        let data = { searchText: searchText, include_adult: this.props.user.switch_adult }
        axios.post(`${main_url}/search`, data)
            .then(res => {
                this.setState({ searchResult: res.data.results })
             })
            .catch(function (error) {
                console.log(error);
            })
    }

    search = (searchText) => {
        if (this.state.searchText.length > 1)
            this._getData(searchText)
        else null
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    label='Search'
                    label='Search'
                    //  keyboardType='email-address'
                    mode='outlined'
                    autoCapitalize='none'
                    // label='Email'
                    style={{ width: '95%', height: 40, margin: 5, borderColor: '#DC34B8', }}
                    // placeholder="Search"
                    value={this.state.searchText}
                    rounded={true}
                    onChangeText={searchText => { this.setState({ searchText }); this.search(searchText) }}
                    onSubmitEditing={Keyboard.dismiss}
                />

                <FlatList
                    contentContainerStyle={{ paddingBottom: 70, }}
                    numColumns={3}
                    data={this.state.searchResult && this.state.searchResult}
                    keyExtractor={item => item.id}
                    ref={ref => {
                        this.flatList_Ref = ref;  // <------ ADD Ref for the Flatlist 
                    }}
                    renderItem={({ item }) =>
                        <Card
                            currentRoute="dashboard"
                            navigator={this.props.navigation}
                            parentData={item}
                        />
                    }
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { searchResultData })(Search);