/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React, { PureComponent } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Card from './Card';
import apiCall from '../../services/apiCall'
class MediaList extends PureComponent {
    state = {
        dataList: null,
        loading: true,
        footerLoading: false,
        page: 1,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return {
                id: nextProps.id,
                searchText: nextProps.searchText,
                media_type: nextProps.media_type,
                adult: nextProps.adult,
                region: nextProps.user.user_region,
                apiURL: nextProps.apiURL,
                routeTo: nextProps.routeTo
            }
        }
    }

    componentDidMount() {
        let { id, media_type, adult, region, page, searchText } = this.state
        let data = { id, media_type, adult, region, page, searchText }
        this._getData(data, null);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.media_type !== this.state.media_type) {
            this.setState({ media_type: prevProps.media_type })
            this.flatList_Ref.scrollToIndex({ animated: true, index: 0 });
            let { id, media_type, adult, region, page, searchText } = this.state
            let data = { id, media_type, adult, region, page, searchText }
            this._getData(data, null);
        }
    }

    _getData = async (data, prevData) => {
        this.setState({ footerLoading: true });
        let dataList = await apiCall(this.state.apiURL, data)
        this.setState({
            dataList: prevData ? prevData.concat(dataList.results) : dataList.results,
            footerLoading: false
        })
        this.setState({ loading: false });
    };

    addNewList = () => {
        let newPage = this.state.page + 1;
        this.setState({ page: newPage });
        let { id, media_type, adult, region, page, searchText } = this.state

        let data = { page: newPage, id, media_type, adult, region, searchText }
        let prevData = this.state.dataList;
        this._getData(data, prevData);
    };

    render() {
        const { dataList, loading, footerLoading } = this.state
        _renderFooter = () => {
            if (!footerLoading)
                return <View style={{ height: 90 }} />
            else return (
                <ActivityIndicator
                    style={{ flex: 1, alignSelf: 'center', height: 90 }}
                    size="small" color="#E33F05"
                />
            );
        };

        if (loading)
            return (
                <ActivityIndicator
                    style={{ flex: 1, alignSelf: 'center' }}
                    size="large" color="#E33F05"
                />
            );
        else
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                     <FlatList
                        contentContainerStyle={{ paddingBottom: 100, marginTop: 70 }}
                        numColumns={3}
                        data={dataList}
                        extraData={this.state}
                        keyExtractor={(item, index) => item.id}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => this.addNewList()}
                        ListFooterComponent={_renderFooter}
                        ref={ref => {
                            this.flatList_Ref = ref; // <------ ADD Ref for the Flatlist
                        }}
                        renderItem={({ item }) => (
                            <Card
                                navigator={this.props.navigator}
                                parentData={{
                                    ...item,
                                    media_type: item.media_type ? item.media_type : 'movie'
                                }}
                            />
                        )}
                    />
                </View>
            );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps, {})(MediaList);
