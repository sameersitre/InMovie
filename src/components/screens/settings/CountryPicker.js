import React, { Component } from 'react'
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux'
import { Picker } from '@react-native-community/picker';
import countries from '../../../utils/countries'
import { setUserRegion } from '../../../containers/actions/userActions'

export class CountryPicker extends Component {
    state = {
        language: 'java',
    };

    render() {
        return (
            <Picker
                itemStyle={{ backgroundColor: 'black' }}
                mode='dropdown'
                selectedValue={this.state.language}
                style={{
                    height: 50, width: 150,
                    color: this.props.theme.colors.primary
                }}
                onValueChange={(itemValue, itemIndex) => (
                    this.setState({ language: itemValue }),
                    this.props.setUserRegion(itemValue))

                }>
                {
                    countries.map((item, i) => (
                        <Picker.Item
                            key={item.id}
                            label={`${item.english_name} (${item.iso_3166_1})`}
                            value={item.iso_3166_1} />
                    ))
                }
            </Picker>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { setUserRegion })(withTheme(CountryPicker))
