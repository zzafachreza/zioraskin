import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  GetStarted,
  Account,
  AccountEdit,
  Pengguna,
  PenggunaAdd,
  PenggunaEdit,
  AAAtur,
  LupaPassword,
  PenggunaDetail,
  Produk,
  ProdukAdd,
  ProdukDetail,
  ProdukEdit,
  Transaksi,
  Laporan,
  Minimal,
  Success,
  Terima,
  TerimaAdd,
  TerimaDetail,
  TerimaEdit,
  Cek,
  CekAdd,
  CekDetail,
  Order,
  OrderAdd,
  OrderDetail,
  Packing,
  PackingDetail,
  Scan,
  PackingKirim,
} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AAAtur"
        component={AAAtur}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="LupaPassword"
        component={LupaPassword}
        options={{
          // headerShown: false,
          headerTitle: 'Lupa Password',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Pengguna"
        component={Pengguna}
        options={{
          headerShown: true,
          headerTitle: 'Kelola Pegawai',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />



      <Stack.Screen
        name="PenggunaAdd"
        component={PenggunaAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Pegawai',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="PenggunaDetail"
        component={PenggunaDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Pegawai',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />





      <Stack.Screen
        name="PenggunaEdit"
        component={PenggunaEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Pegawai',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />




      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />








      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerShown: true,
          title: 'Laporan Transaksi'
        }}
      />

      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Minimal"
        component={Minimal}
        options={{
          headerShown: true,
          headerTitle: 'Minimal Stok Produk',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      {/* PRODUK */}

      <Stack.Screen
        name="Produk"
        component={Produk}
        options={{
          headerShown: true,
          headerTitle: 'Data Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="ProdukAdd"
        component={ProdukAdd}
        options={{
          headerShown: true,
          headerTitle: 'Tambah Produk',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="ProdukDetail"
        component={ProdukDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Produk',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      <Stack.Screen
        name="ProdukEdit"
        component={ProdukEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Produk',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      {/* TERIMA */}

      <Stack.Screen
        name="Terima"
        component={Terima}
        options={{
          headerShown: true,
          headerTitle: 'Penerimaan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      <Stack.Screen
        name="TerimaAdd"
        component={TerimaAdd}
        options={{
          headerShown: true,
          headerTitle: 'Input Penerimaan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="TerimaDetail"
        component={TerimaDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Penerimaan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="TerimaEdit"
        component={TerimaEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Penerimaan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      {/* QC Cek */}
      <Stack.Screen
        name="Cek"
        component={Cek}
        options={{
          headerShown: true,
          headerTitle: 'Pengecekan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />
      <Stack.Screen
        name="CekAdd"
        component={CekAdd}
        options={{
          headerShown: true,
          headerTitle: 'Input Pengecekan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="CekDetail"
        component={CekDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Pengecekan Barang',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: true,
          headerTitle: 'Order Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="OrderAdd"
        component={OrderAdd}
        options={{
          headerShown: true,
          headerTitle: 'Order Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />


      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Order Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="Packing"
        component={Packing}
        options={{
          headerShown: true,
          headerTitle: 'Packing Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="PackingDetail"
        component={PackingDetail}
        options={{
          headerShown: true,
          headerTitle: 'Detail Packing Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerShown: true,
          headerTitle: 'Scan Resi Pesanan',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

      <Stack.Screen
        name="PackingKirim"
        component={PackingKirim}
        options={{
          headerShown: true,
          headerTitle: 'Pesanan Terkirim',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
        }}
      />

    </Stack.Navigator>
  );
}
