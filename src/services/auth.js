import { AsyncStorage } from 'react-native'

export const TOKEN_APP = "@spaceTravelApp:token"
export const USER_AUTH = "@spaceTravelApp:user"

export const isAuthenticated = async () => await AsyncStorage.getItem(TOKEN_APP) !== null
export const getToken = async () => await AsyncStorage.getItem(TOKEN_APP)

export const login = async token => {
   await AsyncStorage.setItem(TOKEN_APP, token)
}

export const setUser = async user => {
    await AsyncStorage.setItem(USER_AUTH, JSON.stringify(user))
}

export const logout = async () => {
  await AsyncStorage.clear()
}