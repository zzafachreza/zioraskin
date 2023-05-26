import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';


export default function CekDetail({ navigation, route }) {

    const [data, setData] = useState({});
    const isFocused = useIsFocused();

    const getDetail = () => {
        axios.post(apiURL + 'cek_detail', {
            id: route.params.id
        }).then(res => {
            setLoading(false);
            console.log('detail', res.data[0]);
            setData(res.data[0]);
        });
    };

    useEffect(() => {
        if (isFocused) {
            getDetail()
        }
    }, [isFocused]);

    const MYlistdata = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 2,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                padding: 10,
                borderRadius: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14
                }}>{value}</Text>
            </View>

        )
    }


    const [loading, setLoading] = useState(true);


    return (
        <SafeAreaView style={{
            // padding: 10,
            backgroundColor: colors.zavalabs,
            flex: 1,
        }}>
            {!loading && <View style={{
                flex: 1,
            }}>

                <ScrollView showsVerticalScrollIndicator={false} style={{
                    padding: 10,
                }}>

                    <View style={{
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Kode Produksi" value={data.kode} />
                        <MYlistdata label="Tanggal" value={moment(data.tanggal_terima).format('dddd, DD MMM YYYY') + ' Pukul ' + data.jam_terima} />
                    </View>

                    <View style={{
                        marginTop: 20,
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Barcode" value={data.barcode} />
                        <MYlistdata label="SKU" value={data.sku} />
                        <MYlistdata label="Nama Barang" value={data.nama_barang} />
                        <MYlistdata label="Rak" value={data.rak} />

                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>

                            <View style={{
                                flex: 1,
                                marginHorizontal: 2,
                                backgroundColor: colors.black,
                                padding: 10,
                                borderRadius: 5,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: 12
                                }}>Qty Datang</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    color: colors.white,
                                    fontSize: 15
                                }}>{data.qty_datang} Pcs</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                marginHorizontal: 2,
                                backgroundColor: colors.success,
                                padding: 10,
                                borderRadius: 5,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: 12
                                }}>Qty Lolos</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    color: colors.white,
                                    fontSize: 15
                                }}>{data.qty_terima} Pcs</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                marginHorizontal: 2,
                                backgroundColor: colors.danger,
                                padding: 10,
                                borderRadius: 5,
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: 12
                                }}>Qty Reject</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    color: colors.white,
                                    fontSize: 15
                                }}>{data.qty_tolak} Pcs</Text>
                            </View>
                        </View>


                    </View>




                </ScrollView>



            </View>}


            {!loading && <View style={{

                flexDirection: 'row',
                padding: 10,

            }}>

                <View style={{
                    flex: 1,

                }}>
                    <MyButton onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    setLoading(true);
                                    axios.post(apiURL + 'cek_hapus', {
                                        id: data.id
                                    }).then(res => {
                                        setTimeout(() => {
                                            if (res.data.status == 200) {
                                                setLoading(false);
                                                showMessage({
                                                    message: res.data.message,
                                                    type: 'success'
                                                })
                                                navigation.goBack();
                                            }
                                        }, 1000);
                                    })
                                }
                            }
                        ])
                    }} title="Hapus" warna={colors.secondary} Icons="trash-outline" />
                </View>

            </View>}

            {loading && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})