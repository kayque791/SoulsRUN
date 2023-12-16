// edit.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';

const EditScreen = ({ route, navigation }) => {
  const { index, jogo, historicoJogo, setHistoricoJogo, onSaveChanges } = route.params;

  // Inicializa novoNome e novoValor com valores padrão
  const [novoNome, setNovoNome] = useState(route.params.historicoJogo[index]?.nome || '');
  const [novoValor, setNovoValor] = useState(route.params.historicoJogo[index]?.valor?.toString() || '');

  const salvarEdicao = () => {
    try {
      const novoResultado = {
        nome: novoNome,
        valor: parseFloat(novoValor),
        jogo: jogo,
        checked: false,
      };

      const novoHistorico = [...historicoJogo];
      novoHistorico[index] = novoResultado;

      setHistoricoJogo(novoHistorico);
      onSaveChanges(); // Chama a função para atualizar a tabela na tela anterior

      // Restante do seu código para salvar no AsyncStorage, se necessário
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }

    // Navega de volta para a tela anterior após salvar as alterações
    navigation.goBack();
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.texto}>Novo Nick do player</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNovoNome(text)}
        value={novoNome}
      />

      <Text style={styles.texto}>Novo Tempo da SpeedRun</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNovoValor(text)}
        keyboardType="numeric"
        value={novoValor}
      />

      <TouchableOpacity style={styles.button} onPress={salvarEdicao}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditScreen;
