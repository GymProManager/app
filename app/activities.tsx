import React, { useEffect, useState } from "react";
import { View,StyleSheet, Text, Image, TouchableOpacity, TextInput} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import DayOfMothList from "@/components/DateSlider/DateSlide"
import { useFetchAPI } from "@/hooks/useFetchAPI";
import ButtonSideBar from "@/components/ButtonSideBar";

export default function Activities() {
    const [currentDate, setCurrentDate] = useState(new Date())

    const [search, setSearch] = useState("");
    const { data, loading, error } = useFetchAPI('/actividades', {});
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

        const validationSource = data.filter((item:any) => item.actividades);
        const filteredClasess = validationSource.filter((item:any) => {
            return item.actividades.toLowerCase().includes(text.toLowerCase());
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
        
    return (
    <View style={ styles.container}>
        <View className="flex flex-row justify-between mr-4 mt-2"> 
            <View className="flex flex-row items-center p-4"> 
                <TouchableOpacity onPress={() =>router.canGoBack() ? router.back(): router.navigate("/home")}>
                    <MaterialIcons name="arrow-back" size={32} color="white" />
                </TouchableOpacity>            
                <Text className="ml-4 text-white font-bold text-3xl">ACTIVIDADES</Text>
            </View>
            <ButtonSideBar className="p-4 bg-[#518893] border-[#243c5a] border-2 rounded-tl-lg rounded-br-lg">
                <Image
                    source={require('@/assets/images/buttonSideBar.png')}
                />
            </ButtonSideBar>              
        </View>
        <View className="flex flex-row justify-center mt-8">
                <View className="relative flex flex-row items-center h-[5rem] w-[90%]">
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
        <View className="flex flex-row items-center p-4"> 
            <ThemedText type="subtitle">Seleccione una fecha</ThemedText>
        </View>
        <View className="flex flex-row items-center p-4"> 
            <DayOfMothList date={currentDate}/>
        </View>
        <View className="flex flex-row items-center p-4"> 
            <ThemedText type="subtitle">Actividades</ThemedText>
        </View>        
        { !loading && searchedClasess && searchedClasess.length ==0 && search.trim() != '' &&
            <View className="flex flex-row w-full flex-wrap p-4 justify-center" >
                <ThemedText className="text-white mr-4" type="title">No hay actividades con este criterio</ThemedText>
            </View>
        }
        <View className="flex flex-row w-full flex-wrap p-4" >
            {
            searchedClasess && searchedClasess.map((item: any, index: number) => {
                return (
                    <View className="flex flex-col w-full border-[#ffffff] p-4" style={ styles.borderFine}  key={index.toString()}> 
                        <View className="flex flex-row w-full"> 
                            <ThemedText className="text-white mr-4">{item.time}</ThemedText>
                        </View>
                        <View  className="flex flex-row w-full"> 
                            <ThemedText className="ml-4">{item.actividades}</ThemedText>
                        </View>                            
                    </View>    
                )
            })
            }
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
    },
    borderFine: {
        borderTopWidth: 1
    }
})