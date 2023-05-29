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
import ZavalabsScanner from 'react-native-zavalabs-scanner'
import 'moment/locale/id'




var MySound = new Sound(
    require('../../assets/error.mp3'),
    Sound.MAIN_BUNDLE,
).release();

export default function Scan({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();



    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [filter, setFilter] = useState({
        key: 'resi',
    })
    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'scan_hasil').then(res => {
            console.log(res.data);
            setData(res.data);
            setTemp(res.data);
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginVertical: 5,
                flexDirection: 'row',
                overflow: 'hidden'
            }}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',

                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{

                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                color: colors.black
                            }}>{item.resi}</Text>
                            <Text style={{

                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                color: colors.danger
                            }}>{item.nomor_order}</Text>
                            <Text style={{

                                fontFamily: fonts.secondary[400],
                                fontSize: 11,
                                color: colors.black
                            }}>{moment(item.tanggal_scan).format('dddd, DD MMM YYYY')} Pukul {item.jam_scan}</Text>
                        </View>


                    </View>


                </View>

                <TouchableOpacity onPress={() => {
                    Alert.alert(MYAPP, 'Apakah kamu akan hapus resi ini ?', [
                        { text: 'TIDAK' },
                        {
                            text: 'HAPUS',
                            onPress: () => {
                                axios.post(apiURL + 'scan_hapus', {
                                    id: item.id
                                }).then(res => {
                                    console.log(res.data);
                                    showMessage({
                                        type: 'success',
                                        message: res.data.message
                                    });
                                    getTransaction();
                                })
                            }
                        }
                    ]);
                }} style={{
                    flex: 1,
                    backgroundColor: colors.danger,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                }}>
                    <Icon color={colors.white} type='ionicon' name='trash' />
                </TouchableOpacity>


            </View >
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
            position: 'relative'
        }}>



            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',

                    borderRadius: 10,
                    marginBottom: 10,
                }}>
                    <View style={{
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        backgroundColor: colors.white,
                    }}>
                        <Icon type='ionicon' color={colors.border} size={20} name='search' />
                    </View>
                    <View style={{
                        flex: 1,
                        backgroundColor: colors.white,
                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                        <TextInput placeholder='Cari Resi . . .' style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 18,
                        }} onChangeText={x => {

                            if (x.length == 0) {
                                setData(tmp)
                            } else {
                                if (filter.key == 'resi') {
                                    const filtered = data.filter(i => i.resi.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                } else if (filter.key == 'nomor_order') {
                                    const filtered = data.filter(i => i.nomor_order.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                }

                            }



                        }} />
                    </View>
                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                    }} style={{
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Image source={require('../../assets/filter.png')} style={{
                            width: 30,
                            height: 30,
                        }} />
                    </TouchableOpacity>
                </View>
                <FlatList data={data} renderItem={__renderItem} />
            </View>



            <View style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    ZavalabsScanner.showBarcodeReader(result => {

                        if (result !== null) {
                            axios.post(apiURL + 'scan_add', {
                                resi: result
                            }).then(res => {
                                console.log(res.data);
                                if (res.data.status == 200) {
                                    showMessage({
                                        type: 'success',
                                        message: res.data.message
                                    });
                                    getTransaction();
                                } else if (res.data.status == 404) {
                                    MySound.play();
                                    showMessage({
                                        type: 'danger',
                                        message: res.data.message
                                    })
                                }
                            })
                        }

                    });
                }} style={{
                    width: 60,
                    height: 60,
                    elevation: 4,
                    backgroundColor: colors.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='barcode-outline' size={30} />
                </TouchableOpacity>
            </View>

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
                            <MyPicker label="Cari Berdasarkan :" value={filter.key} iconname='ribbon' onValueChange={x => {
                                setFilter({ ...filter, key: x })


                                setModalVisible(false);
                            }} data={[
                                { value: 'resi', label: 'Resi' },
                                { value: 'nomor_order', label: 'Nomor Order' },


                            ]} />
                            <MyGap jarak={10} />
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})