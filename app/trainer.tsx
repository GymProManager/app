import React, { useEffect, useState } from "react";
import { View,StyleSheet, Text, Image, TouchableOpacity, TextInput} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import RadioFilter from "@/components/FilterTrainer/FilterTrainer";
import ButtonSideBar from "@/components/ButtonSideBar"
import { useFetchAPI } from "@/hooks/useFetchAPI";
import { ThemedText } from "@/components/ThemedText";

export default function Trainer() {
    const [filter, setFilter] = useState("list");

    const [search, setSearch] = useState("");
    const { data, loading, error } = useFetchAPI('/entrenamiento', {});
    const [searchedClasess, setSearchedClasses] = useState<any[]>();
        
    const fakeDelay = (ms:number) => new Promise((res) => setTimeout(res, ms))
    let timeout: any;

    const debounce = (callback:any, alwaysCall:any, ms:number) => {
        return (...args: any) => {
           alwaysCall(...args);
           clearTimeout(timeout);
           timeout = setTimeout(() => {
            callback(...args);
           }, ms)
        }
    };

    const setSearchTextAlways = (text:string) => {
        setSearch(text);
    }
    const searchClass = async(text: string) => {
        await fakeDelay(1000);

        const validationSource = data.filter((item:any) => item.nombre);
        const filteredClasess = validationSource.filter((item:any) => {
            return item.nombre.toLowerCase().includes(text.toLowerCase());
        });
        setSearchedClasses(filteredClasess);
    }
    const debounceSearchClass = debounce(searchClass, setSearchTextAlways, 1000);

    useEffect(() => {
        setSearchedClasses(data)
    },[data])

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    },[])
        
    const onChangeFilter = (value:any) => {
        if (value == 'myTrainer'){
            setSearchedClasses([])
        } else {
            setSearch("");
            setSearchedClasses(data)
        }
    }

    return (
    <View style={ styles.container}>
         <View className="flex flex-row items-center p-4"> 
            <TouchableOpacity onPress={() =>router.canGoBack() ? router.back(): router.navigate("/home")}>
                <MaterialIcons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>            
            <Text className="ml-4 text-white font-bold text-3xl">LISTADO DE ENTRENAMIENTOS</Text>
        </View>
        <View className="flex flex-row justify-center w-full px-16">
            <RadioFilter onChange = {onChangeFilter} defaultValue={filter}/>
        </View>
        <View className="flex flex-row justify-center items-center gap-4 mt-8">
            <View className="w-80" >
                <View className="relative flex flex-row items-center h-[5rem]">
                    <TextInput
                    keyboardType="default"
                    placeholder="Buscar"
                    placeholderTextColor={"#fff"}
                    value={search}
                    onChangeText= {debounceSearchClass}
                    className="pl-12 py-4 rounded-bl-3xl rounded-tr-3xl bg-[#B0A462] border-2 border-solid border-[#FEF4C9]"
                    style={{
                        fontSize: 20,
                        width: "100%",
                    }}
                    />
                    <View className="absolute left-3">
                        <MaterialIcons name="search" size={32} color="white" />
                    </View>                
                </View>

            </View>
            <ButtonSideBar className="p-4 bg-[#518893] border-[#243c5a] border-2 rounded-tl-lg rounded-br-lg">
                <Image
                    className="h-[2rem] w-[2rem] p-4" 
                    source={require('@/assets/images/buttonSideBar.png')}
                />
            </ButtonSideBar>            
        </View>
        <View className="flex flex-row w-full" >
            {
                searchedClasess && searchedClasess.length ==0 &&
                <View className="flex flex-row w-full justify-center mt-4" >
                    <ThemedText type="subtitle" >No hay entrenamientos </ThemedText>
                </View>
            }
                <View className="flex flex-row w-full flex-wrap" >
                    {
                    searchedClasess && searchedClasess.map((item: any, index: number) => {
                        return (
                            <View className="flex flex-col items-left w-[48%] px-2 py-4"  key={index.toString()}> 
                                <Image
                                    className="rounded-lg"
                                    style={{ height: 150, width: '100%'}}
                                    source={{
                                        uri: item.imagen,
                                        }}
                                        resizeMode="cover"
                                />
                                <View className="flex flex-col w-full">
                                    <ThemedText type="subtitle" className="w-full">{item.nombre}</ThemedText>
                                    <ThemedText type="small" className="w-full">Tags: {item.etiquetas}</ThemedText>
                                </View>    
                            </View>    
                        )
                    })
                    }
                </View>
            </View>          
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1D1D1B',
        height: '100%',
        color: '#ffffff'
    },
    back: {
        height: 35,
        width: 40
    }
})