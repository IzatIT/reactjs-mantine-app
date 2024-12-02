import { createApi } from "src/constants";
import {ChangePasswordRequest, LoginRequest, Profile} from "src/entities/auth";
import {api} from "src/shared/config/api";
import {Notify} from "src/shared/helpers/notification";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import Cookies from "js-cookie";

export class AuthPath {
    static login = createApi("auth/login");
    static refreshToken = createApi("auth/refresh/token");
    static logout = createApi("auth/logout");
    static getMe = createApi("accounts/me");
    static changePassword = createApi(`accounts/change-password`);
}

export const login = async (body: LoginRequest, notifyOnError = true) => {
    try {
        const response = await api.post<Profile>(AuthPath.login, {...body});
        const { authenticationToken, refreshToken, ...userProfile } = response.data;
        Notify.ShowSuccess(`${userProfile.fullName}`)
        Cookies.set('access_token', authenticationToken);
        Cookies.set('refresh_token', refreshToken);
        Cookies.set('profile', JSON.stringify(userProfile));
        return response.data;
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const logout = async (notifyOnError = true) => {
    try {
        const refreshToken = Cookies.get('refresh_token');
        const profile = Cookies.get('profile')
        const login = JSON.parse(profile || "{}")?.login
        await api.post(AuthPath.logout, {login, refreshToken});
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('profile');
        Notify.ShowSuccess('Вы успешно вышли из системы');
    } catch (error) {
        handleAxiosError(error, notifyOnError); // Обрабатываем ошибку
    }
};

export const getCurrentUser = async (notifyOnError = true) => {
    try {
        const response = await api.get(AuthPath.getMe);
        return response.data as Profile;
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};


export const changePassword = async (data: ChangePasswordRequest) => {
    try{
        const response = await api.put(AuthPath.changePassword, data);
        return response;
    }catch(error){
        handleAxiosError(error, true);
    }
}

