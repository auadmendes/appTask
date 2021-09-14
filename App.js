import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  Text,
  View,  
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import firebase from './src/firebaseconection';
import { Container, AreaInput, TextoInput, Header, Button, Lista } from './src/styles';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import TaskList from './src/Components/Tasklist';



console.disableYellowBox = true;
export default function App() {

  //variáveis / Stados
  const [newtask, setNewtask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [txtNewtsk, setTxtNewTask] = useState(false);
  const inputText = useRef(null);
  const [key, setKey] = useState('');
  const [btnEdit, setBtnEdit] = useState('add-outline');
  const [txtInfo, setTxtInfo] = useState(false);
  

  //popular lista
  useEffect(() => {
    async function loadtasks() {

      await firebase.database().ref('tarefas').on('value', (snapshot) => {
        setTasks([]);

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          };
          setTasks(oldArray => [...oldArray, data]);
        })
      });
    }
    loadtasks();

  }, [])

  async function handleAdd() {
    if (newtask !== '') {

      if (key !== '') {
        await firebase.database().ref('tarefas').child(key).update({
          nome: newtask,
        });
        Keyboard.dismiss();
        setNewtask('');
        setKey('');
        setBtnEdit('add-outline');

        return;
      }
      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome: newtask
      });
      Keyboard.dismiss();
      setNewtask('');
      toast();
    }
  }

  async function handleEdit(data) {
    setBtnEdit('create-outline')
    setNewtask(data.nome);
    setKey(data.key);
    inputText.current.focus();


  }

  async function handleDelete(key) {
    await firebase.database().ref('tarefas').child(key).remove();
  }

  function message() {
    const timer = setTimeout(() => {
      setTxtNewTask(true);
      //Alert.alert('I am appearing...', 'After 5 seconds!');
    }, 5000);
    const timeOff = setTimeout(() => {
      setTxtNewTask(false);
      // alert('fim')
    }, 5000);
  }

  function cancelaEdicao() {
    setKey('');
    Keyboard.dismiss();
    setNewtask('');
    setBtnEdit('add-outline');
  }

   function novo(){
    const timer = setTimeout(() => {
      setTxtInfo(false);
      //alert('I am appearing...', 'After 5 seconds!');
    }, 50000);
    return;
   }

   function toast(){
    ToastAndroid.showWithGravity(
      "Nova tarefa adicionada",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
   }

  return (
    <View style={styles.Container}>
      <StatusBar style="light" />
      <View style={styles.Header}>
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          source={require('./src/images/topoTarefas.png')}
        />
      </View>

      <View style={styles.AreaInput}>
        <TextoInput
          placeholder="Próxima tarefa"
          onChangeText={(value) => setNewtask(value)}
          value={newtask}
          ref={inputText}
        />
        <TextInput
          onChangeText={() => { }}
        />
        <Button onPress={handleAdd}>
          <Ionicons name={btnEdit} size={30} color="#fff" />
        </Button>
      </View>
      {txtInfo == true &&
        <Text>Nova tarefa adicionada</Text>
      }
      {key !== '' &&
        <TouchableOpacity style={styles.btnCancel} onPress={cancelaEdicao}>
          <Ionicons name="close-circle-outline" size={30} color="#FFD602" />
          <Text style={styles.txtEdit}>Editando esta tarefa.</Text>
        </TouchableOpacity>
      }
      {tasks == '' &&      
      <ActivityIndicator size='small' color='#fff'/>
      }
      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#0594CE',
    flex: 1,
    width: '100%',
  },
  Header: {
    width: '100%',
    height: '30%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AreaInput: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  txtEdit: {
    color: '#FFD602',
    textAlign: 'center',
  },
  btnCancel: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
