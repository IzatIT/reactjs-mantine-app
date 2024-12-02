import { AttachmentUpdateRequest } from "src/types";
import { Attachment } from "src/entities/attachments";

export type InfoBlockForm = {
    id?: number;
    titleKg: string;
    titleRu: string;
    contentKg: string;
    contentRu: string;
    type: string;
    fileAttachments: AttachmentUpdateRequest;
    photoAttachments: AttachmentUpdateRequest;
    videoAttachments: AttachmentUpdateRequest;
}

export type InfoBlock = {
    id: number;
    type: string;
    titleKg: string;
    titleRu: string;
    contentRu: string;
    contentKg: string;
    fileAttachments?: Attachment[];
    photoAttachments?: Attachment[];
    videoAttachments?: Attachment[];
}

export type InfoBlockFilter = {
    title?: string;
    type?: string;
    content?: string;
};

export type InfoBlockSearchRequest = {
    filter?: InfoBlockFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};
