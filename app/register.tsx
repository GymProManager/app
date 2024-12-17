import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View,StyleSheet, Image, useWindowDimensions, Text,ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/Button";
import { useFetchWP } from "@/hooks/useFetchWP";

export default function Register() {
    const colors = ['#CC7751', '#518893','#B0A462'];
    const [planes, setPlanes] = useState<any>([]);

    const {width} = useWindowDimensions();
    const { data, loading, error } = useFetchWP('https://gympromanager.com/wp-json/api/v2/suscription/products', {});

    let i:number = 0;
    useEffect(() => {
        const  months = data.filter((item:any) => item.tipo === 'subscription' && item.subscripcion.periodo === 'month')
                            .sort((a:any, b:any) => a.precio - b.precio);
        const  years = data.filter((item:any) => item.tipo === 'subscription' && item.subscripcion.periodo === 'year')
        .sort((a:any, b:any) => a.precio - b.precio);

        setPlanes([...months,...years]);
    }, [data]);

    const handleSubmit = async () => {
        router.navigate("https://gympromanager.com");
    }
    const backGroundPlan = (index:number) => {
        const current = i;
        if (i > 1){
            i = 0;
        } else { i++; }
        return colors[current];
    }

     return (
        <View style={ styles.container}>
            { loading && 
            <View className="flex flex-row justify-center items-center h-full">
                <ThemedText className="text-white text-3xl">
                    <ActivityIndicator size="large" color="#B0A462" />...Cargandos planes
                </ThemedText>
            </View>
            }
            { !loading &&
            <View className="relative flex flex-col items-center rounded-xl pt-8" style={styles.container}> 
                <View className="relative flex flex-col items-center" >
                    <View className="absolute left-0 top-0"> 
                        <Image
                            style={styles.polygonContainer}
                            source={require('@/assets/images/polygon-01.png')}
                        />
                    </View>            
                    <View className="flex flex-row mb-4 leading-3">
                        <ThemedText className="text-white pr-2" type="title">La</ThemedText>
                        <ThemedText className="pr-2" style={styles.colorRed} type="title">aplicación</ThemedText>
                        <ThemedText className="text-white" type="title">que se</ThemedText>
                    </View> 
                    <View className="flex flex-row mb-4">
                        <ThemedText className="mr-2" style={styles.colorBlue} type="title">ADAPTA</ThemedText>
                        <ThemedText className="mr-2" style={styles.colorWhite} type="title">a</ThemedText>
                        <ThemedText className="mr-2" style={styles.colorYellow} type="title">TI</ThemedText>
                    </View>
                    <View className="w-full" >
                        {
                        planes && planes.map((item: any, index: number) => {
                            return (
                            <View className="flex flex-col items-center mb-4" style={[ styles.card, item.color,{width: width-30,  backgroundColor: backGroundPlan(index)}]} key={index.toString()} >
                                <ThemedText className="mb-4 font-bold" >{item.nombre}</ThemedText>
                                <ThemedText  style={ styles.sizePrice } >{item.precio} €/{item.subscripcion.periodo}</ThemedText>
                            </View>
                            )
                        })
                        }
                    </View>
                    <View className="absolute right-0 bottom-0"> 
                        <Image
                            style={styles.polygonContainer}
                            source={require('@/assets/images/polygon-02.png')}
                        />
                    </View> 
                </View>
                <View className="flex flex-row justify-center mt-8" >            
                        <Button title="Suscribirse" onPress={handleSubmit} />                         
                </View>                       
            </View>
            }
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
    },
    card: {
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 4,
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
        fontSize: 12,
        lineHeight: 32
    },
    box: {
        height: 680
    },    
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    imageContainer: {
        height: 250,
        backgroundPosition: 'right'
    },    
    polygonContainer: {
        height: 45,
        width: 42
    },
    colorBackground: {
        backgroundColor: '#1D1D1B',
    },
    colorWhite :{
        color: '#FFFFFF'
    },    
    colorYellow :{
        color: '#B0A462'
    },
    colorRed :{
        color: '#DFAA8C'
    },
    colorBlue :{
        color: '#6CB0B4'
    }    ,
    defaultText: {
        fontFamily: 'Copperplate'
    },
    boxRed :{
        backgroundColor: '#DFAA8C',
    },
    boxBlue :{
        backgroundColor: '#6CB0B4'
    },        
    boxYellow :{
        backgroundColor: '#B0A462'
    },
    sizePrice: {
        fontSize: 24,
        lineHeight: 24
    }    
});
