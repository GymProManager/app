import { useMemo, useState } from "react";
import { View , Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";

const DayOfMothList = ({date}) => {
    const [days, setDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(date);
    
    const generatedDays = useMemo(() => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const daysInMonth = new Date(year, month,0).getDate();
        const daysArr=[];

        for (let i=day-3; i<=day; i++ ){
            const date = new Date(year, month, i);
            daysArr.push({
                date,
                day: date.toLocaleString('es-es',{ weekday: 'short'}),
                month: date.toLocaleString('es-es',{ month: 'short'}),
                fullDate: date?.toLocaleDateString()
            })
        }        
        for (let i=day+1; i<daysInMonth; i++ ){
            const date = new Date(year, month, i);
            daysArr.push({
                date,
                day: date.toLocaleString('es-es',{ weekday: 'short'}),
                month: date.toLocaleString('es-es',{ month: 'short'}),
                fullDate: date?.toLocaleDateString()
            })
        }
        const dateNext = new Date(year, month,daysInMonth +1 );
        const yearNext = dateNext.getFullYear();
        const monthNext = dateNext.getMonth();
        const daysInNextMonth = new Date(yearNext, monthNext,0 ).getDate();

        for (let i=1; i<=daysInNextMonth; i++ ){
            const date = new Date(yearNext, monthNext, i);
            daysArr.push({
                date,
                day: date.toLocaleString('es-es',{ weekday: 'short'}),
                month: date.toLocaleString('es-es',{ month: 'short'}),
                fullDate: date?.toLocaleDateString()
            })
        }        
        setDays(daysArr);

    },[selectedDate])

    const DateItemView = ({day,month, date}) => {
        const isSelected = date?.toDateString() === selectedDate?.toDateString();

        return <TouchableOpacity onPress={()=> setSelectedDate(date)} style={[styles.dayItem,isSelected && styles.selectdDayItem]}>
            <Text className="text-white" style={{ textTransform: 'capitalize'}}>{day}</Text>
            <Text className="text-white" style={styles.dateText}>{date?.getDate()}</Text>
            <Text className="text-white capitalize" style={{ textTransform: 'capitalize'}}>{month}</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.contain}>
            <FlatList data={days} 
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({item}) => <DateItemView {...item} />}
                showsHorizontalScrollIndicator={false}
                
            />
        </View>
    );
}

export default DayOfMothList;

const styles= StyleSheet.create({
    contain: {
        flex: 1,
        paddingHorizontal: 10
    },
    dayItem: {
        alignItems: 'center',
        padding:0,
        width: 60,
        height: 75,
        gap:4,
        backgroundColor: '#518893',
        marginHorizontal: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderColor: "#6CB0B4",
        borderWidth: 2
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold'
    } ,
    selectedDate: {
        color: 'white'
    }   ,
    selectdDayItem: {
        backgroundColor: '#CC7751',
        borderColor: "#DFAA8C",
        borderWidth: 2        
    }
})