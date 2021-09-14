import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';

export default function Tasklist({ data, deleteItem, editItem }) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.Button} onPress={ () => deleteItem(data.key) }>
                <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={()=> editItem(data)}>
            <View style={styles.vLista}>
                <Text style={styles.txtItem}>{data.nome}</Text>
            </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        marginTop: 5,
        height: 45,
    },
    Button: {
        marginLeft: 8,
        marginRight: 15,
    },
    txtItem: {
        fontSize: 19,
        color: '#fff',

    },
    vLista: {
        flex: 1,
    }
});
