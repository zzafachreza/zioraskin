import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';
import MyCarouser from '../../components/MyCarouser';


export default function Home({ navigation }) {


  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    });


  }




  return (






    <ImageBackground
      source={require('../../assets/back.png')}
      style={{
        flex: 1,
        backgroundColor: colors.white
      }}>
      <View style={{
        padding: 10,
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('AAAtur')} style={{
          height: 30,
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          width: 40,
        }}>
          <Image source={require('../../assets/menu.png')} style={{
            width: 18,
            height: 18,
          }} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('../../assets/logo.png')} style={{
          width: 150,
          height: 100,
          resizeMode: 'contain'
        }} />
      </View>

      <View style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        borderTopRightRadius: windowWidth / 6,
        borderTopLeftRadius: windowWidth / 6,
        paddingHorizontal: 10,


      }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Produk')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/AS.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>Stok{'\n'}Barang</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cetak')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A0.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>Print{'\n'}No. Batch</Text>
          </TouchableOpacity>


        </View>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Terima')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A1.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>Penerimaan{'\n'}Barang</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Cek')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A2.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>Pengecekan{'\n'}Barang</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Order')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A3.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>List{'\n'}Pemesanan</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Packing')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A4.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>List{'\n'}Pengecekan</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/scan.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>Scan{'\n'}Packing</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('PackingKirim')} style={{
            width: windowWidth / 3,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colors.zavalabs,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/A6.png')} style={{
              width: 60,
              height: 60,
              resizeMode: 'contain'
            }} />
            <Text style={{
              top: 10,
              fontSize: 11,
              fontFamily: fonts.secondary[600],
              marginBottom: 10,
              textAlign: 'center'
            }}>List{'\n'}Pengiriman</Text>
          </TouchableOpacity>
        </View>



      </View>
      <View style={{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
      }}>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: 15
        }}>Ziora © {moment().format('Y')}</Text>
      </View>
    </ImageBackground>




  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});