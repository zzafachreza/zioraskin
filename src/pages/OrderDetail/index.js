import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
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
import { Modal } from 'react-native';



export default function OrderDetail({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    const [edit, setEdit] = useState({});

    const getDetail = () => {
        axios.post(apiURL + 'order_detail', {
            nomor_order: route.params.nomor_order
        }).then(res => {
            setLoading(false);
            console.log('detail', res.data);
            setData(res.data);
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

    const _myinput = useRef();
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
                        marginVertical: 10,
                        borderRadius: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }} >
                                <MYlistdata label="Marketplace" value={route.params.marketplace} />
                            </View>
                            <View style={{
                                flex: 1,
                            }} >
                                <MYlistdata label="Tanggal" value={moment(route.params.tanggal_order).format('dddd, DD MMM YYYY')} />
                            </View>

                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                            }} >
                                <MYlistdata label="No. Pesanan" value={route.params.nomor_order} />
                            </View>
                            <View style={{
                                flex: 1,
                            }} >
                                <MYlistdata label="Resi" value={route.params.resi} />
                            </View>

                        </View>


                    </View>
                    <View style={{
                        backgroundColor: colors.white,
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            marginBottom: 10,
                        }}>Detail Barang</Text>

                        {data.map(i => {
                            return (
                                <View style={{
                                    paddingVertical: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.zavalabs,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: 12,
                                        }}>{i.nama_barang}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[400],
                                            fontSize: 12,
                                        }}>{i.barcode}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        flex: 1,
                                    }}>
                                        <View style={{
                                            backgroundColor: colors.success,
                                            width: 70,
                                            height: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10

                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 15,
                                                color: colors.white
                                            }}>{i.qty_order} Pcs</Text>


                                        </View>

                                    </View>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}>

                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(true);
                                            setEdit(i);
                                            setTimeout(() => {
                                                _myinput.current.focus();
                                            }, 1000)

                                        }}>
                                            <Icon type='ionicon' name='create' color={colors.secondary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}


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
                        setLoading(true);
                        axios.post(apiURL + 'order_prepacking', {
                            nomor_order: route.params.nomor_order
                        }).then(res => {
                            console.log(res.data);
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

                    }} title="Siap Untuk di Cek" warna={colors.secondary} Icons="shield-checkmark-outline" />
                </View>

            </View>}

            {loading && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'center',
                    backgroundColor: '#000000BF'
                }}>
                    <View style={{
                        height: windowHeight / 3,
                        backgroundColor: colors.white,
                        // padding: 10
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            textAlign: 'center',
                            backgroundColor: colors.primary,
                            padding: 10,
                            color: colors.white,
                            marginBottom: 10,
                        }}>{MYAPP}</Text>
                        <View style={{
                            padding: 10,
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 20
                            }}>{edit.nama_barang}</Text>
                            <TextInput ref={_myinput} onSubmitEditing={x => {
                                console.log(edit);
                                axios.post(apiURL + 'order_update', edit).then(ee => {
                                    getDetail();
                                    setModalVisible(false)
                                })
                            }} onChangeText={x => setEdit({
                                ...edit,
                                qty_order: x
                            })} value={edit.qty_order} keyboardType='number-pad' style={{
                                backgroundColor: colors.zavalabs,
                                marginVertical: 10,
                                borderRadius: 10,
                                fontFamily: fonts.secondary[600],
                                fontSize: 20,
                                textAlign: 'center'
                            }} />
                            <MyGap jarak={10} />
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})