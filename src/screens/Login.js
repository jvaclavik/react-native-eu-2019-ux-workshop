import React from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Switch,
  I18nManager
} from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { en, pl, ar } from "../utils/translations";

import { Ionicons } from "@expo/vector-icons";
import { withTheme } from "../utils/theming";

import ScreensToggleIcon from "../components/ScreensToggleIcon";

i18n.defaultLocale = "en";
i18n.fallbacks = true;

i18n.translations = {
  en: en,
  pl: pl,
  ar: ar
};

const currentLocale = Localization.locale;
const isRTL = currentLocale.indexOf("ar") === 0;

I18nManager.allowRTL = isRTL;
I18nManager.forceRTL(isRTL);

class Login extends React.Component {
  state = {
    loginValue: "",
    passwordValue: "",
    rememberPasswordChecked: false
  };

  setEmail = loginValue => this.setState({ loginValue });

  setPassword = passwordValue => this.setState({ passwordValue });

  toggleSwitch = () =>
    this.setState(prevState => ({
      rememberPasswordChecked: !prevState.rememberPasswordChecked
    }));

  render() {
    const { onLoginScreenToggle, theme } = this.props;
    const dynamicStyles = styles(theme);
    return (
      <View style={dynamicStyles.container}>
        <ScreensToggleIcon
          color={theme.accentColor}
          onPress={onLoginScreenToggle}
          shouldClose
        />
        <StatusBar barStyle={"dark-content"} />
        <Text style={dynamicStyles.header}>{i18n.t("header")}</Text>
        <View style={dynamicStyles.inputGroup}>
          <View style={[dynamicStyles.row, dynamicStyles.inputRow]}>
            <Ionicons
              name="md-person"
              size={26}
              color={theme.primaryTextColor}
            />
            <TextInput
              style={dynamicStyles.input}
              onChangeText={this.setEmail}
              value={this.state.loginValue}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={i18n.t("email")}
              placeholderTextColor={theme.primaryTextColor}
            />
          </View>
          <View style={[dynamicStyles.row, dynamicStyles.inputRow]}>
            <Ionicons name="md-lock" size={26} color={theme.primaryTextColor} />
            <TextInput
              style={dynamicStyles.input}
              onChangeText={this.setPassword}
              value={this.state.passwordValue}
              returnKeyType="go"
              autoCapitalize="none"
              placeholder={i18n.t("password")}
              placeholderTextColor={theme.primaryTextColor}
              secureTextEntry
            />
          </View>
          <View style={dynamicStyles.row}>
            <Switch
              value={this.state.rememberPasswordChecked}
              onValueChange={this.toggleSwitch}
              trackColor={{
                false: theme.secondaryBackgroundColor,
                true: theme.accentColor
              }}
            />
            <Text style={dynamicStyles.toggleLabel}>
              {i18n.t("remember_me")}
            </Text>
          </View>
          <View style={dynamicStyles.row}>
            <Switch
              value={this.props.isDarkMode}
              onValueChange={this.props.onToggleDarkMode}
              trackColor={{
                false: theme.secondaryBackgroundColor,
                true: theme.accentColor
              }}
            />
            <Text style={dynamicStyles.toggleLabel}>{i18n.t("dark_mode")}</Text>
          </View>
        </View>
        <TouchableHighlight style={dynamicStyles.button}>
          <View style={dynamicStyles.row}>
            <Text style={dynamicStyles.buttonText}>Login</Text>
            <Ionicons
              name="md-arrow-forward"
              size={16}
              color={theme.secondaryBackgroundColor}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default withTheme(Login);

const styles = theme => ({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999999,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.backgroundColor,
    elevation: 18
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.primaryTextColor
  },
  inputGroup: {
    alignItems: "stretch",
    width: "100%",
    marginBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  inputRow: {
    borderBottomWidth: 2,
    borderBottomColor: theme.primaryTextColor,
    justifyContent: "space-between"
  },
  input: {
    height: 40,
    flex: 0.9,
    fontSize: 16,
    color: theme.primaryTextColor,
    paddingVertical: 10,
    textAlign: "left"
  },
  button: {
    backgroundColor: theme.accentColor,
    borderRadius: 25,
    padding: 5
  },
  buttonText: {
    color: theme.secondaryBackgroundColor,
    fontSize: 16,
    textTransform: "uppercase",
    marginRight: 10
  },
  toggleLabel: {
    marginLeft: 10,
    color: theme.primaryTextColor
  }
});
