import { Alert, StyleSheet, Text, View, Image, FlatList, Modal, ActivityIndicator, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';

export default function Laporan({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();



    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [filter, setFilter] = useState({
        key: 'nama_produk',
    })

    const [show, setShow] = useState('');


    const getTransaction = () => {
        setLoading(true);

        setTimeout(() => {
            axios.post(apiURL + 'tracking', kirim).then(res => {
                console.log(res.data);
                setShow(res.data)
            })
            setLoading(false);
        }, 1200)

    }

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        resi: ''
    })
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,

        }}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput value={kirim.resi} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        resi: x
                    })
                }} label="Masukan Nomor Resi" iconname="search" />
                <MyGap jarak={10} />
                {!loading && <MyButton onPress={() => getTransaction()} title="Tracking" />}


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    marginVertical: 10,
                    textAlign: 'center'
                }}>{show}</Text>

            </ScrollView>
            {loading &&
                <View style={{
                    flex: 1,
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            }

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})