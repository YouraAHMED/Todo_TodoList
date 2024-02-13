import React, {} from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function TodoFirstItem (props) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("DetailTodo", {parentId: props.item.id})}>
         <View style={styles.content}>
            <Text
                style={[
                styles.text_item
                ]}
            >
                {props.item.title}
            </Text>
            <TouchableOpacity onPress={() => props.deleteTodoList(props.item.id)}>
                <Image
                source={require('../../assets/trash-can-outline.png')}
                style={{ height: 24, width: 24 }}
                />
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
     
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row'
  },
  text_item: {
    marginLeft: 10,
    width: 150
  }
})