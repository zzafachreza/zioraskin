import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { useState } from 'react'
import axios from 'axios';
import { MYAPP, apiURL } from '../../utils/localStorage';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/id'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import DatePicker from 'react-native-datepicker'
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';

export default function Cetak({ navigation, route }) {

    const [barang, setBarang] = useState([]);

    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        fid_barcode: '',
        jumlah: '',
    })

    const __getBarang = () => {
        axios.post(apiURL + 'barang_pilih').then(res => {
            console.log(res.data);
            setKirim({
                ...kirim,
                fid_barcode: res.data[0].value
            })
            setBarang(res.data);
        })
    }

    useEffect(() => {
        __getBarang();
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 20,
        }}>
            <ScrollView style={{
                flex: 1,
            }}>

                <DatePicker
                    style={{ width: '100%' }}
                    date={kirim.tanggal}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            backgroundColor: colors.zavalabs,
                            borderRadius: 5,
                            borderWidth: 0
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setKirim({
                        ...kirim,
                        tanggal: date
                    })}
                />
                <MyGap jarak={20} />
                <MyPicker label="Barang" onValueChange={x => {
                    setKirim({
                        ...kirim,
                        fid_barcode: x
                    })
                }} iconname="cube" data={barang} />
                <MyGap jarak={20} />
                <MyInput label="Jumlah Print" iconname="keypad" keyboardType='number-pad' value={kirim.jumlah} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        jumlah: x
                    })
                }} />
            </ScrollView>
            <MyButton onPress={async () => {

                const send = {
                    fid_barcode: kirim.fid_barcode.split("#")[0],
                    nama_barang: kirim.fid_barcode.split("#")[1],
                    jumlah: kirim.jumlah,
                    tanggal: kirim.tanggal,
                    kode: moment(kirim.tanggal).format('YYMMDD') + kirim.fid_barcode.toString().substring(11, 13)

                }

                console.log(send);

                axios.post(apiURL + 'cetak_add', send).then(res => {
                    const thecode = moment(kirim.tanggal).format('YYMMDD') + kirim.fid_barcode.toString().substring(11, 13);










                })


                // print
                const thecode = moment(kirim.tanggal).format('YYMMDD') + kirim.fid_barcode.toString().substring(11, 13);

                let arr = [];

                for (let i = 0; i < kirim.jumlah; i++) {
                    let code = '';
                    if ((i + 1).toString().length == 1) {
                        code = '00' + (i + 1);
                    } else if ((i + 1).toString().length == 2) {
                        code = '0' + (i + 1);
                    } else if ((i + 1).toString().length == 3) {
                        code = (i + 1);
                    }

                    arr.push(`<div style="width:377.95275591px;height:566.92913386px;border:0px solid black;margin-bottom:100px;margin-top:100px">
                    <center>
                      <img src="https://admin.zioraskin.com/upload/230525024121logo.png" width="200" >
                    </center>
                    <center>
                    <img src="https://chart.googleapis.com/chart?chs=250x250&amp;cht=qr&amp;chl=${thecode + code}&amp;choe=UTF-8" >
                       <p> <strong>${thecode + code}</strong></p>
                      <p> ${kirim.fid_barcode.split("#")[1]} </p>
                       <i> ${moment().format('dddd, DD MM YYYY')} </i>
                    </center>
                  </div>`);
                }







                let options = {
                    html: arr.join(""),
                    fileName: thecode,
                    directory: 'Download',
                    height: 566.92913386, width: 377.95275591,
                };

                let file = await RNHTMLtoPDF.convert(options)
                // console.log(file.filePath);
                // alert(file.filePath);

                await Share.open({
                    title: MYAPP,
                    message: "Print No Batch",
                    url: 'file:///' + file.filePath,
                    subject: "Report",
                })
                    .then((res) => {
                        console.log(res);
                        Alert.alert(MYAPP, 'Berhasil di download !')

                    })
                    .catch((err) => {
                        err && console.log(err);
                    });



            }} Icons="print" title="Print No. Batch" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})