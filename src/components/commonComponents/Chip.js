import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ActivityIndicator, Colors, Text, shadow } from 'react-native-paper';

export class Chip extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <View

                style={{
                    flex: 1, flexDirection: 'row', alignItems: 'center', height: 22, margin: 3,
                    backgroundColor: '#454545', alignSelf: 'baseline', flexWrap:'wrap', paddingHorizontal: 10, borderRadius: 11,

                    zIndex: 5, shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black', shadowOpacity: 1, elevation: 5,
                }}>
                <Text style={{ fontSize: 12, color: '#FFFFFF', flexWrap:'nowrap' }}>{this.props.label}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Chip)
