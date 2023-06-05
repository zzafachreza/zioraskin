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
export default function TerimaAdd({ navigation, route }) {

    const options = {
        includeBase64: true,
        quality: 1,
    };

    const [show, setShow] = useState({
        kode: '',
        nama_barang: '',
        fid_barcode: ''
    });



    const getGallery = xyz => {
        launchImageLibrary(options, response => {
            // console.log('All Response = ', response);

            // console.log('Ukuran = ', response.fileSize);
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                if (response.fileSize <= 2000000) {
                    let source = { uri: response.uri };
                    switch (xyz) {
                        case 1:
                            setKirim({
                                ...kirim,
                                foto_user: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                        case 2:
                            setKirim({
                                ...kirim,
                                foto_profile: `data:${response.type};base64, ${response.base64}`,
                            });
                            break;
                    }
                } else {
                    showMessage({
                        message: 'Ukuran Foto Terlalu Besar Max 500 KB',
                        type: 'danger',
                    });
                }
            }
        });
    };


    const [kirim, setKirim] = useState({
        kode: '',
        qty_datang: ''
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'terima_add', kirim).then(res => {

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

                                    axios.post(apiURL + 'get_batch', {
                                        kode: result
                                    }).then(h => {
                                        console.log(h.data);
                                        setShow(h.data[0]);
                                        setKirim({
                                            ...kirim,
                                            kode: result,
                                            fid_barcode: h.data[0].fid_barcode
                                        })
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

                    <View style={{
                        marginVertical: 10,
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        borderBottomColor: colors.border
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ flex: 0.3 }}>Barcode</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>{show.fid_barcode}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ flex: 0.3 }}>Nama Barang</Text>
                            <Text style={{ flex: 0.1 }}>:</Text>
                            <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>{show.nama_barang}</Text>
                        </View>
                    </View>


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