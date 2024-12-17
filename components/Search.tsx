import { TextInput, TextInputProps,StyleSheet } from "react-native";
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
  };

export function Search({
  lightColor,
  darkColor,
  ...rest
}: ThemedInputProps)
{
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <TextInput {...rest} style={styles.inputText} />
    );
};

const styles = StyleSheet.create({
    inputText: {
        width: '100%',
        backgroundColor: "#fef4c9",
        color: "#000000",
        borderColor: "#ffffff",
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginBottom: 16
    }
});

