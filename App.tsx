/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component, CSSProperties } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WalletList, WalletListCard } from './components/List';
import { act } from 'react-test-renderer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const data = [
  { id: 1, color: 'red', text: 'Ciao1' },
  { id: 2, color: 'blue', text: 'Ciao 2' },
  { id: 3, color: 'green', text: 'CIao 3' },
  { id: 4, color: 'purple', text: 'CIao 3' },
  { id :5,color: 'brown', text: 'CIao 3' },
  { id: 6, color: 'yellow', text: 'CIao 3' },
  { id: 7, color: 'black', text: 'CIao 3' },
];
interface Props {}

const WalletCard = props => (
  <TouchableOpacity  activeOpacity={1} style={styles.card(props)} onPress={props.toggle}>
    <View>
      <Text>{data.text}</Text>
    </View>
  </TouchableOpacity>
);
export default class App extends Component<Props> {
  render() {
    return (
        <View style={styles.container}>
        <WalletList data={data} itemsHeight={250}>
          {({ data, active, toggle }) => (
            <WalletCard data={data} active={active} toggle={toggle} />
          )}
        </WalletList>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 128,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: ({ data, active }): object => {
    const styles: CSSProperties = {
      backgroundColor: data.color,
      flex: 1,
      borderRadius: 8,
    };

    return styles;
  },
});
