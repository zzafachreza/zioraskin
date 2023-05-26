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


export default function PenggunaDetail({ navigation, route }) {

    const [user, setUser] = useState({});
    const isFocused = useIsFocused();

    const getPengguna = () => {
        axios.post(apiURL + 'pengguna_detail', {
            id: route.params.id
        }).then(res => {
            setLoading(false);
            console.log(res.data[0]);
            setUser(res.data[0]);
        });
    };

    useEffect(() => {
        if (isFocused) {
            getPengguna()
        }
    }, [isFocused]);

    const MYlistdata = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 5,
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
            padding: 10,
            backgroundColor: colors.white,
            flex: 1,
        }}>
            {!loading && <View style={{
                flex: 1,
            }}>

                <View style={{
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 100,
                        height: 100,
                        borderRadius: 20,
                    }} source={{
                        uri: user.foto_user
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 15
                    }}>{user.username}</Text>
                </View>

                <MYlistdata label="Nama Pegawai" value={user.nama_lengkap} />
                <MYlistdata label="No. Handphone" value={user.telepon} />
                <MYlistdata label="Alamat Email" value={user.email} />
                <MYlistdata label="Level" value={user.level} />

            </View>}


            {!loading && <View style={{

                flexDirection: 'row'

            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5
                }}>
                    <MyButton onPress={() => navigation.navigate('PenggunaEdit', user)} title="Edit" Icons="create-outline" />
                </View>
                <View style={{
                    flex: 1,
                    paddingRight: 5
                }}>
                    <MyButton onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    setLoading(true);
                                    axios.post(apiURL + 'pengguna_hapus', {
                                        id: user.id
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