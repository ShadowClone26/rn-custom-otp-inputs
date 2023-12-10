import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewProps,
  ViewStyle,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextStyle,
  TextInputProps,
} from "react-native";

const windowDimensions = Dimensions.get("window");

type OtpInputProps = {
  numberOfInputs?: number;
  containerProps?: ViewProps;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputProps?: TextInputProps;
};

const OtpInputs = ({
  containerProps = {},
  numberOfInputs = 4,
  containerStyle = {},
  inputStyle = {},
  inputProps = {},
}: OtpInputProps) => {
  const [inputsRef, setInputsRef] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [inputSetters, setInputSetters] = useState({});

  const onKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
    inputValue: string,
    setInputValue: () => {}
  ) => {
    const { key } = e.nativeEvent;
    if (!inputValue && index == 0 && key == "Backspace") {
      return;
    }
    if (!!inputValue && key == "Backspace") {
      setInputValue("");
    } else if (!inputValue && key == "Backspace") {
      setInputValue("");
      inputsRef?.[`input${index - 1}Ref`]?.current?.focus();
    } else if (!inputValue && key !== "Backspace" && Number(key) != NaN) {
      setInputValue(key);
      try {
        index != numberOfInputs - 1 &&
          inputsRef?.[`input${index + 1}Ref`]?.current?.focus();
      } catch (error) {
        console.log("🚀 ~ file: index.tsx:58 ~ error:", error);
      }
    } else if (
      !!inputValue &&
      key !== "Backspace" &&
      Number(key) != NaN &&
      index != numberOfInputs - 1
    ) {
      inputsRef?.[`input${index + 1}Ref`]?.current?.focus();
      (inputSetters?.[`input${index + 1}Ref`])(key);
      index != numberOfInputs - 2 &&
        inputsRef?.[`input${index + 2}Ref`]?.current?.focus();
    }
  };

  const renderInputs = (item, index) => {
    const inputRef = useRef();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      if (!!inputRef?.current) {
        setInputsRef((pre) => ({
          ...pre,
          [`input${index}Ref`]: inputRef,
        }));
        setInputValues((pre) => ({
          ...pre,
          [`input${index}Ref`]: inputValue,
        }));
        setInputSetters((pre) => ({
          ...pre,
          [`input${index}Ref`]: setInputValue,
        }));
      }
    }, [inputRef, inputValue, index, setInputValue]);

    return (
      <TextInput
        ref={inputRef}
        key={index + "Aditya"}
        style={[styles.inputStyle, inputStyle]}
        maxLength={1}
        onKeyPress={(e) => onKeyPress(e, index, inputValue, setInputValue)}
        keyboardType="numeric"
        value={inputValue}
        {...inputProps}
      />
    );
  };

  return (
    <View {...containerProps} style={[styles.containerStyle, containerStyle]}>
      {new Array(numberOfInputs).fill("-By_AdityaThummar")?.map(renderInputs)}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // backgroundColor: "red",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputStyle: {
    // backgroundColor: "green",
    margin: windowDimensions?.width * 0.01,
    height: windowDimensions.height * 0.05,
    width: windowDimensions.height * 0.05,
    borderWidth: 2,
    borderRadius: 7,
    textAlign: "center",
  },
});

export { OtpInputs, OtpInputProps };
