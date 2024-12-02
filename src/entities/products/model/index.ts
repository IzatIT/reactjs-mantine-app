import { AttachmentUpdateRequest } from "src/types";
import {Categories} from "src/entities/categories";
import { Attachment } from "src/entities/attachments";

export type ProductsForm = {
    id?: number;
    titleKg: string;
    titleRu: string;
    contentKg?: string;
    contentRu?: string;
    categoryId?: number;
    characteristics: {
        label: {
            id: number;
            titleKg: string;
            titleRu: string;
        };
        valueKg: string
        valueRu: string
    }[]
    fileAttachments: AttachmentUpdateRequest;
    photoAttachments: AttachmentUpdateRequest;
    videoAttachments: AttachmentUpdateRequest;
}

export type Products = {
    id: number;
    category: Categories;
    titleKg: string;
    titleRu: string;
    contentRu: string;
    contentKg: string;
    characteristics: {
        id: number;
        label: {
            id: number;
            titleRu: string;
            titleKg: string;
        };
        valueKg: string;
        valueRu: string;
    }[]
    fileAttachments?: Attachment[];
    photoAttachments?: Attachment[];
    videoAttachments?: Attachment[];
}

export type ProductsFilter = {
    title?: string;
    categoryId?: number;
    content?: string;
};

export type ProductsSearchRequest = {
    filter?: ProductsFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};
