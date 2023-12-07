import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import light from "../../theme/light";

export default function StackRoutesLayout(){
    
    return (
        <ThemeProvider theme={light}>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Inicio',
                    }}
                />
            </Stack>
        </ThemeProvider>
    )
}