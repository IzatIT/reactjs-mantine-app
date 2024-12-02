import { AttachmentUpdateRequest } from "src/types";
import { Attachment } from "src/entities/attachments";

export type PartnersForm = {
    id?: number;
    titleKg: string,
    titleRu: string,
    photoAttachments: AttachmentUpdateRequest
}

export type Partners = {
    id: number;
    titleKg: string,
    titleRu: string,
    logo: Attachment
}

export type PartnersFilter = {
    title?: string;
};

export type PartnersSearchRequest = {
    filter?: PartnersFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};
