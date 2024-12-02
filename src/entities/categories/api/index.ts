import { createApi } from "src/constants";
import { AxiosResponse } from "axios";
import {Categories, CategoriesForm, CategoriesSearchRequest} from "../model";
import {handleAxiosError} from "src/shared/config/api/handle-error";
import {api} from "src/shared/config/api";
import {Notify} from "src/shared/helpers/notification";

export class CategoriesPath {
    static get = (id: string | number) => createApi(`category/get?categoryId=${id}`);
    static create = createApi(`category/add`);

    static search = createApi(`category/search`);
    static delete = (id: number) => createApi(`category/delete?categoryId=${id}`);
    static update = (id: number) => createApi(`category/update?categoryId=${id}`);

}
export const getCategory = async (id: number | string, notifyOnError = true) => {
    try {
        const res = await api.get(CategoriesPath.get(id))
        return res.data as Categories
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}

export const searchCategories = async (body: CategoriesSearchRequest, notifyOnError = true) => {
    try {
        const res = await api.post(CategoriesPath.search, { ...body })
        return res.data as SearchResponse<Categories>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}


export const deleteCategory = async (id: number, notifyOnError = true) => {
    try {
        await api.delete(CategoriesPath.delete(id));
        Notify.ShowSuccess();
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};


export const createCategory = async (data: CategoriesForm) => {

    try {
        const res = await api.post(CategoriesPath.create, {...data});
        Notify.ShowSuccess();
        return res as AxiosResponse<Categories>
    } catch (error) {
        Notify.ShowError();
    }
};

export const updateCategory = async (data: CategoriesForm, notifyOnError = true) => {
    if (!data.id) return;
    try {
        const res = await api.put(CategoriesPath.update(data.id), {...data});
        Notify.ShowSuccess();
        return res as AxiosResponse<Categories>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
};

