import React, { useState } from 'react';
import { TouchableWithoutFeedback, Image, StyleSheet, View, Text } from 'react-native';
import { Input } from '@ui-kitten/components';
import { Color, FontFamily, FontSize, Moderate_Units } from '../GlobalStyles';

export const PasswordInput = ({
    placeholder,
    onChange,
    hasError,
    errorMessage,
}) => {
    const [value, setValue] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const onValueChange = (value) => {
        setValue(value);
        onChange(value);
      };

    const renderIcon = () => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            {secureTextEntry ?
                <Image
                    style={styles.openedEyeIcon}
                    contentFit="cover"
                    source={require("../assets/icons8-eye-60.png")}
                /> :
                <Image
                    style={styles.closedEyeIcon}
                    contentFit="cover"
                    source={require("../assets/icons8-closed-eye-50.png")}
                />
            }
        </TouchableWithoutFeedback>
    );

    const renderCaption = () => {
        return (
            <View style={styles.captionContainer}>
                {errorMessage && <Text style={styles.captionText}>
                    {errorMessage}
                </Text>}
            </View>
        );
    };

    return (
        <View style={styles.marginBottom}>
            <Input
                value={value}
                textStyle={{
                    fontFamily: FontFamily.subtitle,
                    fontSize: FontSize.fs_14,
                    color: Color.darkGrey,
                }}
                style={{
                    borderRadius: Moderate_Units.p_10,
                    borderColor: Color.lightGrey,
                    borderWidth: Moderate_Units.p_05,
                    backgroundColor: Color.colorWhite,
                    height: Moderate_Units.p_40,
                }}
                status='basic'
                placeholder={placeholder || 'Password'}
                secureTextEntry={secureTextEntry}
                onChangeText={nextValue => onValueChange(nextValue)}
                caption={hasError && renderCaption}
                accessoryRight={renderIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    openedEyeIcon: {
        width: Moderate_Units.p_20,
        height: Moderate_Units.p_20,
        zIndex: 0,
    },
    closedEyeIcon: {
        width: Moderate_Units.p_20,
        height: Moderate_Units.p_20,
        zIndex: 0,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionText: {
        fontSize: FontSize.fs_12,
        fontFamily: FontFamily.subtitle,
        color: Color.red,
    },
    marginBottom: {
      marginBottom: Moderate_Units.p_13,
    },
});