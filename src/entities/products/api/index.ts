import { createApi } from "src/constants";
import { AxiosResponse } from "axios";
import {Products, ProductsForm, ProductsSearchRequest} from "../model";
import {deleteAttachment} from "src/entities/attachments";
import {api} from "src/shared/config/api";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import {Notify} from "src/shared/helpers/notification";

export class ProductsPath {
    static get = (id: string | number) => createApi(`product/get?productId=${id}`);
    static create = createApi(`product/add`);

    static search = createApi(`product/search`);

    static delete = (id: number) => createApi(`product/delete?productId=${id}`);
    static update = (id: number) => createApi(`product/update?id=${id}`);

}
export const getProduct = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(ProductsPath.get(id))
        return res.data as Products
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchProducts = async (body: ProductsSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(ProductsPath.search, { ...body })
        return res.data as SearchResponse<Products>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deleteProduct = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(ProductsPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

const appendBasicData = (formData: FormData, data: ProductsForm) => {
    const { titleKg, titleRu, contentKg, contentRu, characteristics, categoryId } = data;

    const uniqueCharacteristics = Array.from(new Set(characteristics?.map(el => el.label.id)))
        .map(id => {
            const characteristic = characteristics.find(el => el.label.id === id);
            return {
                characteristicId: id,
                valueKg: characteristic?.valueKg,
                valueRu: characteristic?.valueRu,
            };
        });

    const requestBody = {
        titleKg,
        titleRu,
        contentKg,
        contentRu,
        categoryId,
        characteristics: uniqueCharacteristics
    };

    const request = new Blob([JSON.stringify(requestBody)], { type: "application/json" });
    formData.append("request", request);
};
export const createProduct = async (data: ProductsForm) => {
    const formData = new FormData();
    appendBasicData(formData, data);

    data?.photoAttachments?.toCreate?.length &&
        data.photoAttachments?.toCreate?.forEach((el, ) => {
            formData.append(`photoAttachments`, el)
        })
    data?.videoAttachments?.toCreate?.length &&
        data.videoAttachments?.toCreate?.forEach((el, ) => {
            formData.append(`videoAttachments`, el)
        })
    data?.fileAttachments?.toCreate?.length &&
        data.fileAttachments?.toCreate?.forEach((el, ) => {
            formData.append(`fileAttachments`, el)
    })

    try {
        const res = await api.post(ProductsPath.create, formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<Products>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updateProduct = async (data: ProductsForm, notifyOnError = true) => {
    if (!data.id) return;

    const formData = new FormData();
    appendBasicData(formData, data);

    data.photoAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })
    data.fileAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })
    data.videoAttachments?.toDelete?.forEach(async(id) => {
        await deleteAttachment(id)
    })

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
        const res = await api.put(ProductsPath.update(data.id), formData);
        Notify.ShowSuccess();
        return res as AxiosResponse<Products>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

