// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    color: 'white',
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10,
    padding: 5,
  },
  picker: {
    height: 50,
    width: 200,
    color: 'black',
    borderColor: 'white',
    borderWidth: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  tabelasContainer: {
    justifyContent: 'space-around',
    padding: 50,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
});

export default styles;
