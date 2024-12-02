import { MIME_TYPES } from "@mantine/dropzone";

type MimeType = (typeof MIME_TYPES)[keyof typeof MIME_TYPES];

export type Attachment = {
    id: number;
    name: string;
    type: MimeType;
};
