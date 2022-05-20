import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const StarVote = () => {
    const [defaultRating, setdefaultRating] = useState(3)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])


    const CustomRating = () => {
        return (
            <View style={Styles.containerStar}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <Pressable
                                activeOpacity={0.7}
                                key={item}
                                onPress={() => { setdefaultRating(item) }}
                            >
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={

                                        // item <= defaultRating ? { uri: starFill } : { uri: starUnFill }
                                        item <= defaultRating ?
                                            require('../../../resources/imgs/star_filled.png') :
                                            require('../../../resources/imgs/star_corner.png')

                                    }
                                />
                            </Pressable>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <View style={Styles.container}>
            <Text>Đánh giá của bạn</Text>
            <CustomRating />
            {/* <Text>
                {defaultRating + ' / ' + maxRating.length}
            </Text> */}
        </View >
    );
}

const Styles = StyleSheet.create({
    container: {
        paddingLeft: 17,
        paddingBottom: 10
    },
    containerStar: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {

    },
})
export default StarVote;