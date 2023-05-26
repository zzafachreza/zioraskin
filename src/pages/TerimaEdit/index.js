import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
export default function TerimaEdit({ navigation, route }) {




    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'terima_edit', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
            paddingTop: 20,
        }}>
            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 5,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Kode Produksi / No. Batch</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyInput nolabel label="Kode Produksi / No. Batch" iconname="barcode-outline" placeholder="Masukan kode produksi / no. batch" value={kirim.kode} onChangeText={x => setKirim({ ...kirim, kode: x })} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            ZavalabsScanner.showBarcodeReader(result => {

                                if (result !== null) {
                                    setKirim({
                                        ...kirim,
                                        kode: result
                                    })
                                }

                            });
                        }} style={{
                            padding: 10,
                            width: 80,
                            marginLeft: 5,
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon type='ionicon' name='barcode-outline' color={colors.white} size={25} />
                        </TouchableOpacity>
                    </View>


                </View>

                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 5,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Barcode Barang</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyInput nolabel label="barcode barang" iconname="barcode-outline" placeholder="Masukan barcode" value={kirim.fid_barcode} onChangeText={x => setKirim({ ...kirim, fid_barcode: x })} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            ZavalabsScanner.showBarcodeReader(result => {

                                if (result !== null) {
                                    setKirim({
                                        ...kirim,
                                        fid_barcode: result
                                    })
                                }

                            });
                        }} style={{
                            padding: 10,
                            width: 80,
                            marginLeft: 5,
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: colors.primary,
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon type='ionicon' name='barcode-outline' color={colors.white} size={25} />
                        </TouchableOpacity>
                    </View>


                </View>





                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginBottom: 10,
                    }}>Jumlah</Text>
                    <MyInput label="Jumlah barang datang" keyboardType='number-pad' iconname="documents" placeholder="Masukan stok toko sekarang" value={kirim.qty_datang} onChangeText={x => setKirim({ ...kirim, qty_datang: x })} />


                </View>

                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})