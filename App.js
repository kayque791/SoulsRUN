import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Picker } from 'react-native';
import { CheckBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditScreen from './edit';
import styles from './styles';

const Stack = createStackNavigator();

const MyComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [valorPrimario, setValorPrimario] = useState('');
  const [jogo, setJogo] = useState('');
  const [historicoJogo2, setHistoricoJogo2] = useState([]);

  const carregarHistorico = async () => {
    try {
      const historicoAntigoJogo2 = await AsyncStorage.getItem('Jogo2');

      let novoHistoricoJogo2 = [];

      if (historicoAntigoJogo2) {
        novoHistoricoJogo2 = JSON.parse(historicoAntigoJogo2);
      }

      setHistoricoJogo2(novoHistoricoJogo2);
    } catch (error) {
      console.error('Erro ao carregar histórico do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const salvarHistorico = async (novoHistorico) => {
    try {
      await AsyncStorage.setItem('Jogo2', JSON.stringify(novoHistorico));
    } catch (error) {
      console.error('Erro ao salvar histórico no AsyncStorage:', error);
    }
  };

  const calcularFinanciamento = () => {
    try {
      const novoResultado = { nome, valor: parseFloat(valorPrimario) };

      setHistoricoJogo2([...historicoJogo2, novoResultado]);
      salvarHistorico([...historicoJogo2, novoResultado]);
    } catch (error) {
      console.error('Erro ao calcular e salvar no AsyncStorage:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <CheckBox
        value={item.checked}
        onValueChange={() => toggleCheckBox(index)}
      />
      <Text style={{ color: 'white' }}>{`Nome: ${item.nome}, Tempo: ${item.valor !== undefined ? item.valor.toFixed(2) : 'N/A'}`}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Edit', {
          index,
          jogo: 'jogo2',
          historicoJogo: historicoJogo2,
          setHistoricoJogo: setHistoricoJogo2,
          onSaveChanges: atualizarTabela,
        })}
      >
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  const editarItem = (index) => {
    // Implemente a lógica de edição aqui, por exemplo, abrir um modal de edição
    // Você pode passar o índice para identificar qual item está sendo editado
    console.log(`Editar item ${index} do jogo 2`);
  };

  const deleteSelectedItems = () => {
    let updatedHistorico = [...historicoJogo2];

    updatedHistorico = updatedHistorico.filter((item) => !item.checked);

    setHistoricoJogo2(updatedHistorico);
    salvarHistorico(updatedHistorico);
  };

  const toggleCheckBox = (index) => {
    const updatedHistorico = [...historicoJogo2];

    if (index >= 0 && index < updatedHistorico.length) {
      const isChecked = updatedHistorico[index].checked !== undefined ? updatedHistorico[index].checked : false;

      updatedHistorico[index].checked = !isChecked;
      setHistoricoJogo2(updatedHistorico);
    }
  };

  const renderLista = (historico) => (
    <View>
      <Text style={styles.texto}>tabela de sppedrun</Text>
      {historico.length > 0 ? (
        <FlatList
          data={historico.sort((a, b) => a.valor - b.valor)}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={{ color: 'white' }}>Ainda não há speedRun cadastrada</Text>
      )}
    </View>
  );

  const atualizarTabela = () => {
    carregarHistorico();
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.texto}>Nick do player</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNome(text)}
      />

      <Text style={styles.texto}>Tempo da SpeedRun</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValorPrimario(text)}
        keyboardType='numeric'
      />

      <Text style={styles.texto}>Escolha o jogo</Text>
      <Picker
        selectedValue={jogo}
        onValueChange={(itemValue) => setJogo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o jogo" value="" />
        <Picker.Item label="DARK SOULS" value="jogo2" />
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={calcularFinanciamento}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={deleteSelectedItems}
      >
        <Text style={styles.buttonText}>Apagar Itens Selecionados</Text>
      </TouchableOpacity>

      <View style={styles.tabelasContainer}>
        {renderLista(historicoJogo2)}
      </View>
    </View>
  );
}

export default MyComponent;
