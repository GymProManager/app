// App.js

import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet,
    GestureResponderEvent
} from 'react-native';

interface Props {
    label: string  | null;
    selected:boolean;
    onSelect: (event: GestureResponderEvent) => void;
 }
 
 interface PropsGroupRadio {
    children: string | JSX.Element | JSX.Element[] | React.ReactNode,
    onSelect?: (event: GestureResponderEvent) => any;
 }

 const GroupRadio = ({ children, onSelect }: PropsGroupRadio) => (
    <View className="flex flex-row items-center" style= {styles.groupRadio}> 
        {children}
    </View>
);

const checkSelect= (value: boolean):any => (
    (value) ? styles.select:  styles.unselect
);



const CustomRadioButton = ({ label, selected, onSelect }: Props) => (
    <TouchableOpacity
        style={[styles.radioButton, checkSelect(selected) ]}
        onPress={onSelect}
    >
        <Text style={[styles.radioButtonText, { color:'#FFF' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    select: {
        backgroundColor: '#B0A462',
        borderWidth: 2,
        borderColor: '#FEF4C9',
        borderStyle: 'solid',
        borderRadius: 24,
        transformOrigin: 'backgroundColor'
    },    
    unselect: {
        borderColor: 'transparent',
        borderWidth: 0,
        transformOrigin: 'backgroundColor',
        transitionDuration: '3000ms'
    },
    groupRadio: {
        backgroundColor: '#CC7751',
        gap: 16,
        flexDirection: 'row',
        borderRadius: 36,
        borderWidth: 4,
        borderColor: '#DFAA8C',
        borderStyle: 'solid',
        paddingLeft: 8,
        paddingRight: 8
    },
    option: {
        backgroundColor: '#B0A462',
        borderWidth: 2,
        borderColor: '#FEF4C9',
        borderStyle: 'solid',
        borderRadius: 24
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        gap: 16,
        flexDirection: 'row'
    },
    radioButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#007BFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 170
    },
    radioButtonText: {
        fontSize: 14
    },
});

const RadioFilter = ({onChange, defaultValue}: {onChange: any, defaultValue: string}) => {
    const [selectedValue, setSelectedValue] = useState< string  | null>(defaultValue);

    const onChangeFilter = (value: any) => {
        setSelectedValue(value);
        onChange(value);
    }

    return (
        <GroupRadio >
            <CustomRadioButton
                label="Listado"
                selected={selectedValue === 'list'}
                onSelect={() => onChangeFilter('list')}
            />
            <CustomRadioButton
                label="Mis entrenamientos"
                selected={selectedValue === 'myTrainer'}
                onSelect={() => onChangeFilter('myTrainer')}
            />
        </GroupRadio>
    );
};

export default RadioFilter;