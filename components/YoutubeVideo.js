import React from "react";
import { View, StyleSheet} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { moderateScale } from 'react-native-size-matters';

const YoutubeVideo = ({
    uri
}) => {
    return (
        <View>
            <YoutubeIframe
                height={moderateScale(200)}
                videoId={uri}
            />
        </View>
    );
}

const styles = StyleSheet.create({
});
export default YoutubeVideo;

