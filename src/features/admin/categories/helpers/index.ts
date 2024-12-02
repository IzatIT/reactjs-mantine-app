import {Categories, CategoriesFilter, CategoriesForm} from 'src/entities/categories';
import { getFormType } from 'src/types';


export const getCategoriesFilterForm: getFormType<CategoriesFilter, CategoriesFilter> = (params?: CategoriesFilter) => {
    const initialValues: CategoriesFilter = {
        title: params?.title ?? "",
        parentId: params?.parentId,
        content: params?.content ?? "",
    }
    return {
        initialValues
    }
}

export const getCategoriesForm: getFormType<CategoriesForm, Categories> = (values, t) => {
    const initialValues: CategoriesForm = {
        id: values?.id,
        characteristics: values?.characteristics || [],
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        contentKg: values?.contentKg || "",
        contentRu: values?.contentRu || "",
        parentId: values?.parentId?.id
    }

    return {
        initialValues,
        validate: {

        }
    }
}