import { createApi } from "src/constants";
import { AxiosResponse } from "axios";
import {Partners, PartnersForm, PartnersSearchRequest} from "../model";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import {api} from "src/shared/config/api";
import {Notify} from "src/shared/helpers/notification";

export class PartnersPath {
    static get = (id: string | number) => createApi(`partners/get?partnersId=${id}`);
    static getAll = createApi(`partners/getAll`);
    static search = createApi(`partners/search`);

    static delete = (id: number) => createApi(`partners/delete?partnersId=${id}`);
    static create = createApi(`partners/add`);
    static update = (id: number) => createApi(`partners/update?partnersId=${id}`);

}
export const getPartner = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(PartnersPath.get(id))
        return res.data as Partners
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const getAllPartners = async (notifyOnError = true) => {
    try {
        const res = await api.get(PartnersPath.getAll)
        return res.data as Partners[]
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const searchPartners = async (body: PartnersSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(PartnersPath.search, { ...body })
        return res.data as SearchResponse<Partners>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deletePartner = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(PartnersPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};



export const createPartner = async (data: PartnersForm) => {

    const formData = new FormData();
    const {titleKg, titleRu} = data;
    const request = new Blob([JSON.stringify({titleKg, titleRu})], {type: "application/json",});
    formData.append("request", request);

    data?.photoAttachments?.toCreate?.length &&
         formData.append(`logo`, data?.photoAttachments?.toCreate?.[0])

    try {
        const res = await api.post(PartnersPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<Partners>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updatePartner = async (data: PartnersForm, notifyOnError = true) => {
    if (!data.id) return;

    try {
        const res = await api.put(PartnersPath.update(data.id), {...data});
        Notify.ShowSuccess();
        return res as AxiosResponse<Partners>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

