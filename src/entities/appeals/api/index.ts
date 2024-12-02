import { createApi } from "src/constants";
import { AxiosResponse } from "axios";
import {Appeals, AppealsForm, AppealsSearchRequest} from "../model";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import {api} from "src/shared/config/api";
import {Notify} from "src/shared/helpers/notification";

export class AppealsPath {
    static get = (id: string | number) => createApi(`appeal/get?appealId=${id}`);
    static search = createApi(`appeal/search`);

    static delete = (id: number) => createApi(`appeal/delete?appealId=${id}`);
    static create = createApi(`appeal/add`);
    static update = (id: number) => createApi(`appeal/update?appealId=${id}`);

}
export const getAppeal = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(AppealsPath.get(id))
        return res.data as Appeals
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchAppeals = async (body: AppealsSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(AppealsPath.search, { ...body })
        return res.data as SearchResponse<Appeals>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deleteAppeal = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(AppealsPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

export const createAppeal = async (data: AppealsForm) => {

    try {
        const res = await api.post(AppealsPath.create, {...data});
        Notify.ShowSuccess();
        return res as AxiosResponse<Appeals>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updateAppeal = async (data: AppealsForm, notifyOnError = true) => {
    if (!data.id) return;

    try {
        const res = await api.put(AppealsPath.update(data.id), {...data});
        Notify.ShowSuccess();
        return res as AxiosResponse<Appeals>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

