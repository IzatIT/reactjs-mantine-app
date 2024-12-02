import {InfoBlock, InfoBlockFilter, InfoBlockForm} from 'src/entities/info_block';
import { getFormType } from 'src/types';


export const getInfoBlockFilterForm: getFormType<InfoBlockFilter, InfoBlockFilter> = (params?: InfoBlockFilter) => {
    const initialValues: InfoBlockFilter = {
        title: params?.title,
        type: params?.type,
        content: params?.content,
    }
    return {
        initialValues
    }
}

export const getInfoBlockForm: getFormType<InfoBlockForm, InfoBlock> = (values, t) => {
    const initialValues: InfoBlockForm = {
        id: values?.id,
        type: values?.type || "",
        titleKg: values?.titleKg || "",
        titleRu: values?.titleRu || "",
        contentKg: values?.contentKg || "",
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
        }
    }
}