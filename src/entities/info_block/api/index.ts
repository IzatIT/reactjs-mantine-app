import { createApi } from "src/constants";
import { AxiosResponse } from "axios";
import {InfoBlock, InfoBlockForm, InfoBlockSearchRequest} from "../model";
import {deleteAttachment} from "src/entities/attachments";
import {api} from "src/shared/config/api";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import {Notify} from "src/shared/helpers/notification";

export class InfoBlockPath {
    static get = (id: string | number) => createApi(`info-block/get?id=${id}`);
    static search = createApi(`info-block/search`);

    static delete = (id: number) => createApi(`info-block/delete?id=${id}`);
    static create = createApi(`info-block/add`);
    static update = (id: number) => createApi(`info-block/update?id=${id}`);

}
export const getInfoBlock = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(InfoBlockPath.get(id))
        return res.data as InfoBlock
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchInfoBlock = async (body: InfoBlockSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(InfoBlockPath.search, { ...body })
        return res.data as SearchResponse<InfoBlock>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deleteInfoBlock = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(InfoBlockPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};


const appendBasicData = (formData: FormData, data: InfoBlockForm) => {
    const {titleKg, titleRu, contentKg, contentRu, type} = data;
    const request = new Blob([JSON.stringify({titleKg, titleRu, contentKg, contentRu,type})], {type: "application/json",});
    formData.append("request", request);
};

export const createInfoBlock = async (data: InfoBlockForm) => {

    const formData = new FormData();
    appendBasicData(formData, data);

    data?.photoAttachments?.toCreate?.length &&
    data.photoAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`photoAttachments`, el)
    })
    data?.videoAttachments?.toCreate?.length &&
    data.videoAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`videoAttachments`, el)
    })
    data?.fileAttachments?.toCreate?.length &&
    data.fileAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`fileAttachments`, el)
    })
    try {
        const res = await api.post(InfoBlockPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<InfoBlock>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updateInfoBlock = async (data: InfoBlockForm, notifyOnError = true) => {
    if (!data.id) return;

    const formData = new FormData();
    appendBasicData(formData, data);

    data?.photoAttachments?.toCreate?.length &&
    data.photoAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`photoAttachments`, el)
    })
    data?.videoAttachments?.toCreate?.length &&
    data.videoAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`videoAttachments`, el)
    })
    data?.fileAttachments?.toCreate?.length &&
    data.fileAttachments?.toCreate?.forEach((el, index) => {
        formData.append(`fileAttachments`, el)
    })
    data.photoAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })
    data.fileAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })
    data.videoAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })
    try {
        const res = await api.put(InfoBlockPath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<InfoBlock>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

