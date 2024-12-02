import { getFormType } from 'src/types';
import {Partners, PartnersFilter, PartnersForm} from "src/entities/partners";


export const getPartnersFilterForm: getFormType<PartnersFilter, PartnersFilter> = (params?: PartnersFilter) => {
    const initialValues: PartnersFilter = {
        title: params?.title ?? "",
    }
    return {
        initialValues
    }
}

export const getPartnersForm: getFormType<PartnersForm, Partners> = (values, t) => {
    const initialValues: PartnersForm = {
        id: values?.id,
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        photoAttachments: {
            attachments: values?.logo ? [values?.logo] : [],
            toCreate: [],
            toDelete: [],
            toUpdate: []
        }
    }

    return {
        initialValues,
        validate: {
            titleKg: (n) => !n && t && t("form.error.required"),
            titleRu: (n) => !n && t && t("form.error.required"),
        }
    }
}