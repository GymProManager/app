
import { useFetchAPI } from '@/hooks/useFetchAPI';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { View, TextInput, GestureResponderEvent } from 'react-native';

interface Props {
    onChangeText: (event: GestureResponderEvent) => void;
 }
 
export default function SearchInput({ className}: {className:string}) {
    const [search, setSearch] = useState("");
    const { data, loading, error } = useFetchAPI('/clases', {});
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
        const filteredClasess = data.filter((item:any) => {
            return item.titulo.toLowerCase().includes(text.toLowerCase());
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
        <View className={`relative flex flex-row items-center ${className}`}>
            <TextInput
            keyboardType="default"
            placeholder="Buscar"
            placeholderTextColor={"#fff"}
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
    );
}
