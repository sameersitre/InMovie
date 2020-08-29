import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { withTheme } from 'react-native-paper';

const GradientHeader = (props) => {
    let setGradient = props.theme.dark ?
        ['black', '#00000999', '#00000000'] :
        ['#00000888', '#00000444', '#00000000']
    return (
        <LinearGradient
            colors={setGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: 60 }}
        />
    )
}

export default withTheme(GradientHeader) 
