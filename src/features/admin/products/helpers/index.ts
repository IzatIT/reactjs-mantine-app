import {Products, ProductsFilter, ProductsForm} from 'src/entities/products';
import { getFormType } from 'src/types';


export const getProductsFilterForm: getFormType<ProductsFilter, ProductsFilter> = (params?: ProductsFilter) => {
    const initialValues: ProductsFilter = {
        title: params?.title,
        categoryId: undefined,
        content: params?.title || "",
    }
    return {
        initialValues
    }
}

export const getProductsForm: getFormType<ProductsForm, Products> = (values, t) => {
    const initialValues: ProductsForm = {
        id: values?.id,
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        contentKg: values?.contentKg || "",
        characteristics: values?.characteristics?.map(el => ({
            label: el.label,
            valueKg: el.valueKg || "",
            valueRu: el.valueRu || "",
        })) || [],
        categoryId: values?.category?.id || undefined,
        contentRu: values?.contentRu || "",
        fileAttachments: {
            attachments: values?.fileAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        photoAttachments: {
            attachments: values?.photoAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
        videoAttachments: {
            attachments: values?.videoAttachments,
            toUpdate: [],
            toDelete: [],
            toCreate: [],
        },
    }

    return {
        initialValues,
        validate: {
            titleKg: (value) => !value && t && t("form.error.required"),
            titleRu: (value) => !value && t && t("form.error.required"),
            categoryId: (value) => !value && t && t("form.error.required"),
        }
    }
}