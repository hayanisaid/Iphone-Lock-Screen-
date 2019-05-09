/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from "react-native";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const Colors = {
  sliver: "#e7eaf6",
  transparentWhite: "#f7f7f775",
  underlayColor: "#e7eaf687"
};

type Props = {};
type State = {
  inputs: Array<string>,
  hasError: boolean
};
const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
keys.reverse();
const ActionButtons = [
  {
    onPress: () => console.log("hey"),
    text: "emergency"
  },
  {
    onPress: () => console.log("hey"),
    text: "Cancel"
  }
];
export default class App extends Component<Props, State> {
  state: State = {
    inputs: [],
    haError: false,
    animatedValue: new Animated.Value(0)
  };
  initialState = {
    inputs: [],
    hasError: false,
    animatedValue: new Animated.Value(0)
  };
  _handleKeyPress = (index, key) => {
    console.log("pressed", index, key);
    let obj = {};
    obj[index] = key;
    let newArr = this.state.inputs;
    newArr.push(key);
    this.setState({ inputs: newArr });
    console.log("password", this.state.inputs);
    if (this.state.inputs.length >= 5) {
      this.setState({ hasError: true });
      this._animate();
    }
  };
  _animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: 100
        }),
        Animated.timing(this.state.animatedValue, {
          toValue: 0,
          duration: 100
        })
      ]),
      {
        iterations: 4
      }
    ).start();
  };
  _reset = () => {
    this.setState({ inputs: [], hasError: false });
  };
  render() {
    let { inputs, animatedValue, hasError } = this.state;
    return (
      <ImageBackground
        source={require("./images/background.jpeg")}
        style={{ width: screenWidth, height: screenHeight }}
        resizeMode="cover"
        blurRadius={4}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Enter Password or Touch ID</Text>
              {hasError ? (
                <Animated.View
                  style={[
                    styles.errorMessageContainer,
                    {
                      transform: [
                        {
                          translateX: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -6]
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <Text style={[styles.errorMessage]}>Incorrect Password ✋ </Text>
                </Animated.View>
              ) : null}

              <View style={styles.inputWrapper}>
                <TextInput secureTextEntry={true} editable={false} style={styles.textInput} value={inputs.join("")} />
                {/* {keys.map((input, i) => (
                  <Input style={inputs.includes(input) ? styles.filledInput : null} key={`${i}`} />
                ))} */}
              </View>
            </View>

            <View style={styles.keysWrapper}>
              {keys.map((item, index) => (
                <Key
                  key={`${index}`}
                  text={item}
                  style={[index === keys.length - 1 ? styles.lastChild : styles.keyWrapper]}
                  onPress={() => this._handleKeyPress(index, item)}
                />
              ))}
            </View>
            <View style={styles.actionButtonsWrapper}>
              {ActionButtons.map((button, btnIndex) => (
                <TouchableOpacity style={styles.actionBtn} onPress={() => this._reset()}>
                  <Text style={styles.btnText}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const Key = ({ text, onPress, ...otherProps }) => (
  <TouchableHighlight {...otherProps} onPress={onPress} underlayColor={Colors.underlayColor} activeOpacity={0.89}>
    <Text style={styles.keyText}>{text}</Text>
  </TouchableHighlight>
);
const Input = ({ style, ...otherProps }) => <View style={[styles.input, style]} {...otherProps} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight / 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  overlay: {
    flex: 1,
    backgroundColor: "#000000c7"
  },
  backgroundImage: {},
  header: {
    flex: 1.3,
    justifyContent: "center",
    alignItems: "center"
  },
  errorMessageContainer: {
    margin: 10
  },
  errorMessage: {
    color: "red"
  },

  title: {
    color: "#fff",
    fontWeight: "bold"
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1,
    margin: 5,
    borderColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 50
  },
  filledInput: {
    backgroundColor: "#fff"
  },
  lastChild: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignContent: "center",
    position: "relative",
    backgroundColor: "red",
    width: screenWidth / 4,
    height: screenHeight / 9,
    margin: 10,
    borderRadius: screenHeight / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  keysWrapper: {
    flex: 4,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center"
  },
  keyWrapper: {
    borderColor: Colors.transparentWhite,
    borderWidth: 1,
    width: screenWidth / 4,
    height: screenHeight / 9,
    margin: 10,
    borderRadius: screenHeight / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  keyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20
  },
  actionButtonsWrapper: {
    flex: 1,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
