import { Attachment } from "src/entities/attachments";
import { UseFormInput } from "@mantine/form";

export type getFormType<T, Response> = (values?: Response, t?: (str: string) => string) =>
    UseFormInput<T, (values: T) => T>



export type AttachmentToUpdateRequest = {
    id: number;
    order: number;
}

export type AttachmentUpdateRequest = {
    attachments?: Attachment[];
    toUpdate?: AttachmentToUpdateRequest[];
    toDelete?: number[];
    toCreate?: File[];
    empty?: boolean
}

export type LocaleTitle = {
    id?: number;
    titleKg: string;
    titleRu: string;
}



export type RouteData = {
    path: string;
    element: React.ReactNode;
    isPublic: boolean;
}