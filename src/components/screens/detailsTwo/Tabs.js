import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux'

import Overview from './Overview'
import Seasons from './Seasons'
import Videos from './Videos'
import Cast from './Cast'
import Streams from './Streams'


const overviewRoute = () => (
    <View style={styles.scene} >
        <Overview />
    </View>
);

const castRoute = () => (
    <View style={styles.scene} ><Cast /></View>
);
const seasonsRoute = () => (
    <View style={styles.scene} ><Seasons /></View>
);
const videosRoute = () => (
    <View style={styles.scene} ><Videos /></View>
);
const streamsRoute = () => (
    <View style={styles.scene} ><Streams /></View>
);

const initialLayout = { width: Dimensions.get('window').width };

function TabViewExample(props) {
    const forMovie = [
        { key: 'first', title: 'Overview' },
        { key: 'second', title: 'Casts' },
        { key: 'third', title: 'Trailers' },
        //  { key: 'fourth', title: 'Available Streams' },
    ];

    const forTV = [
        { key: 'first', title: 'Overview' },
        { key: 'second', title: 'Casts' },
        { key: 'third', title: 'Seasons' },
        { key: 'fourth', title: 'Trailers' },
        { key: 'fifth', title: 'Available Streams' },
    ]
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(props.user.details_data.detailsData.media_type === "movie" ? forMovie : forTV);

    let movieRoute = {
        first: overviewRoute,
        second: castRoute,
        third: videosRoute,
        // fourth: streamsRoute,
    }

    let tvRoute = {
        first: overviewRoute,
        second: castRoute,
        third: seasonsRoute,
        fourth: videosRoute,
        fifth: streamsRoute,
    }

    const renderScene = SceneMap(props.user.details_data.detailsData.media_type === "movie" ? movieRoute : tvRoute);

    const renderTabBar = props => (
        <TabBar
            {...props}
            tabStyle={{ alignSelf: 'baseline', width: 130, padding: 0 }}
            scrollEnabled={true}
            indicatorStyle={{ backgroundColor: '#E33F05' }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: 40, justifyContent: 'center', }}
        />
    );
    return (
        <TabView
            lazy={true}
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
});

const mapStateToProps = (state) => ({
    user: state.user
})
export default connect(mapStateToProps)(TabViewExample)
