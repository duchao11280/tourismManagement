import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
const RoomCard = (props) => {
    return (
        // truyền vào item là room and image
        < Card >
            <Card.Title >{props.item.roomName}</Card.Title>
            <Card.Divider />
            {props.item.images.length > 0 ?
                <Card.Image
                    style={Styles.image}
                    source={{
                        uri: props.item.images[0].imageURL
                    }} /> :
                <Card.Image source={require('../../../resources/imgs/HotelDefault.png')} />
            }
            <Text style={Styles.description}>
                {props.item.description}
            </Text>
            <Button
                icon={<Icon name='code' color='#ffffff' />}
                buttonStyle={Styles.button}
                title='Xem chi tiết'
                onPress={props.action} />
        </Card >

    )
}
const Styles = StyleSheet.create({
    image:{


    },
    description: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    },
    button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0
    }
})
export default RoomCard
