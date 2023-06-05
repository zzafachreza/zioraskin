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

export default function Produk({ navigation }) {
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
        axios.post(apiURL + 'barang').then(res => {
            console.log(res.data);
            setData(res.data);
            setTemp(res.data);
        })
    }

    const filterData = () => {



        setModalVisible(false);

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

                                fontFamily: fonts.secondary[600],
                                fontSize: 14,
                                color: colors.black
                            }}>{item.nama_barang}</Text>

                        </View>


                        <View style={{
                            backgroundColor: colors.success,
                            paddingHorizontal: 5,
                            borderRadius: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 15
                            }}>{item.qty_total} Pcs</Text>
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
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
                                    flex: 0.4,
                                }}>Barcode</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
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
                                    flex: 0.4,
                                }}>SKU</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.foourty
                                }}>{item.sku}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.4,
                                }}>Stok Lolos</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.foourty
                                }}>{item.qty_gudang}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.4,
                                }}>Stok Reject</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 12,
                                    color: colors.foourty,
                                    flex: 0.2,
                                }}>:</Text>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.foourty
                                }}>{item.qty_tolak}</Text>
                            </View>
                        </View>


                    </View>
                </View>

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
                        <TextInput placeholder='Cari Barang . . .' style={{
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
                                } else if (filter.key == 'sku') {
                                    const filtered = data.filter(i => i.sku.toLowerCase().indexOf(x.toLowerCase()) > -1);
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
                            <MyPicker label="Cari Berdasarkan Field" value={filter.key} iconname='ribbon' onValueChange={x => setFilter({ ...filter, key: x })} data={[
                                { value: 'nama_barang', label: 'Nama Barang' },
                                { value: 'barcode', label: 'Barcode' },
                                { value: 'sku', label: 'SKU' },


                            ]} />
                            <MyGap jarak={10} />
                        </View>
                        <View style={{
                            padding: 10,
                        }}>
                            <MyButton onPress={filterData} warna={colors.secondary} title="Filter Pencarian" Icons="filter" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})