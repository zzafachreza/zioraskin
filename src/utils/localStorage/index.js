import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};


export const apiURL = 'https://admin.zioraskin.com/api/';
export const MYAPP = 'ZIORA SKIN';
export const api_token = 'd4e729bcd8aab6f0a710e8ca3d31524cb5783dd1d63ddbf32fbed278c435605f';
export const webURL = apiURL.replace("api/", "");

