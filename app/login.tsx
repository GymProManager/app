import Button from "@/components/ui/Button";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { View,Text,StyleSheet, Image, TextInput, Alert } from "react-native";
import Fetch from "@/lib/FetchData";

type FormData = {
    name: string
    email: string
    password: string
}
  
export default function Login() {
    const [formData, setFormData] = useState({
        email: 'yop@alexcd2000.com',
        password: 'ePfpoFZN123'
    });

    const handleSubmit = async () => {
            Fetch('https://gympromanager.com/wp-json/api/v2/suscription')
            .post('',formData)
            .then((user:any) => {
                const response:any = user;
                if (response.user_email) {
                    router.navigate("./home");
                    return;
                } 
                if (response.error) {
                    Alert.alert('Info', response.error);
                }                
                else {
                    Alert.alert('Error', "Error de red");
                }
            })
            .catch((error) => Alert.alert('Error', "Error de red"));
    }

    return (
        <View style={ styles.container}>
            <View className="flex flex-row justify-center"> 
                <Image
                    style={ styles.logo}
                    source={require('@/assets/images/logo.png')}
                />
            </View>
            <View className="flex flex-row justify-center">             
                <Text className="color-white text-4xl font-bold">ACCEDER</Text>
            </View>
            <View className="flex flex-row justify-center mt-8">             
                <View className="w-3/4 flex flex-col" >
                    <View className="flex flex-row" >
                        <TextInput
                            style={ styles.inputText}
                            placeholder="Correo electrónico"
                            onChangeText={(text) => setFormData({...formData, email: text })  }
                            value={formData.email}
                        />
                    </View>                  
                    <View className="flex flex-row">            
                        <TextInput
                            style={ styles.inputText}
                            placeholder="Contraseña"
                            onChangeText={(text) => setFormData({...formData, password: text })  }
                            secureTextEntry={true}
                            value={formData.password}
                        />                
                    </View>   
                    <View className="flex flex-row justify-center mt-8" >            
                        <Button title="Acceder" onPress={handleSubmit} />                         
                    </View>   
                </View>                                                
            </View>                                            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1D1B',
        height: '100%',
        color: '#ffffff'
    },
    logo: {
        height: 200,
        width: 300
    },
    inputText: {
        width: '100%',
        backgroundColor: "#fef4c9",
        color: "#000000",
        borderColor: "#ffffff",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginBottom: 16
    },
    submitButton: {
        backgroundColor: "#FEF4C9",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        width: '100%'        
    }
});
