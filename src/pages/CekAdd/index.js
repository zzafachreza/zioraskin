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
export default function CekAdd({ navigation, route }) {

    const options = {
        includeBase64: true,
        quality: 1,
    };

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
        fid_barcode: '',
        qty_terima: '',
        qty_tolak: '',
        rak: ''
    });
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        // setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'cek_add', kirim).then(res => {
            console.log(res.data)

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

                {/* <View style={{
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


                </View> */}





                <View style={{
                    padding: 10,
                    backgroundColor: colors.white,
                    marginVertical: 20,
                    borderRadius: 10,
                }}>

                    <MyInput label="Rak / Gondola" iconname="file-tray-stacked" placeholder="Masukan nama rak" value={kirim.rak} onChangeText={x => setKirim({ ...kirim, rak: x })} />

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        marginVertical: 10,
                    }}>Jumlah</Text>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{ flex: 1, paddingRight: 5 }}>
                            <MyInput label="Jumlah barang Reject" keyboardType='number-pad' iconname="close-circle" textColor={colors.danger} colorIcon={colors.danger} placeholder="Masukan jumlah reject" value={kirim.qty_tolak} onChangeText={x => setKirim({ ...kirim, qty_tolak: x })} />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 5 }}>
                            <MyInput label="Jumlah barang lolos" keyboardType='number-pad' textColor={colors.success} colorIcon={colors.success} iconname="checkbox" placeholder="Masukan jumlah lolos" value={kirim.qty_terima} onChangeText={x => setKirim({ ...kirim, qty_terima: x })} />
                        </View>

                    </View>


                </View>

                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton warna={colors.primary} onPress={sendServer} title="Simpan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})