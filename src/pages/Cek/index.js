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
import 'moment/locale/id'

export default function Cek({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();



    const [data, setData] = useState([]);
    const [tmp, setTemp] = useState([]);
    const [filter, setFilter] = useState({
        key: 'nama_barang',
    })
    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'cek').then(res => {
            console.log(res.data);
            setData(res.data);
            setTemp(res.data);
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('CekDetail', item)} style={{
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
                            }}>{item.kode}</Text>
                            <Text style={{

                                fontFamily: fonts.secondary[400],
                                fontSize: 11,
                                color: colors.black
                            }}>{moment(item.tanggal_cek).format('dddd, DD MMM YYYY')} Pukul {item.jam_cek}</Text>
                        </View>


                    </View>

                    <View style={{
                        flex: 1
                    }}>
                        <View style={{
                            marginTop: 5,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.3,
                            }}>Nama</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.1,
                            }}>:</Text>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                color: colors.foourty
                            }}>{item.nama_barang}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.3,
                            }}>Barcode</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.1,
                            }}>:</Text>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                color: colors.foourty
                            }}>{item.barcode}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.3,
                            }}>Rak</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 12,
                                color: colors.foourty,
                                flex: 0.1,
                            }}>:</Text>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                                color: colors.foourty
                            }}>{item.rak}</Text>
                        </View>
                    </View>
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
                            }}>{item.qty_datang} Pcs</Text>
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
                            }}>{item.qty_terima} Pcs</Text>
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
                            }}>{item.qty_tolak} Pcs</Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    backgroundColor: colors.success,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='chevron-forward' />
                </View>

            </TouchableOpacity >
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
                        <TextInput placeholder='Cari Produk . . .' style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: 18,
                        }} onChangeText={x => {

                            if (x.length == 0) {
                                setData(tmp)
                            } else {
                                if (filter.key == 'nama_barang') {
                                    const filtered = data.filter(i => i.nama_barang.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                } else if (filter.key == 'barcode') {
                                    console.log('merek')
                                    const filtered = data.filter(i => i.barcode.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                    setData(filtered);
                                } else if (filter.key == 'kode') {
                                    const filtered = data.filter(i => i.kode.toLowerCase().indexOf(x.toLowerCase()) > -1);
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
                <TouchableOpacity onPress={() => navigation.navigate('CekAdd')} style={{
                    width: 60,
                    height: 60,
                    elevation: 4,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='add' size={30} />
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
                                { value: 'nama_barang', label: 'Nama Barang' },
                                { value: 'barcode', label: 'Barcode' },
                                { value: 'kode', label: 'Kode Produksi' },


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