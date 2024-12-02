import {Products} from "src/entities/products";

export const APPEAL_STATUS = {
    UNREAD: "UNREAD",
    READ: "READ",
    PENDING: "PENDING",
    CLOSED: "CLOSED",
}

export const APPEAL_TYPE = {
    MAIN_PAGE: "MAIN_PAGE",
}

export type AppealsForm = {
    id?: number,
    type: string,
    name: string,
    phoneNumber: string,
    email: string,
    status: string,
    productId?: number
}

export type Appeals = {
    id: number,
    type: string,
    name: string,
    phoneNumber: string,
    email: string,
    createdAt: Date,
    status: string,
    product?: Products
}

export type AppealsFilter = {
    title?: string;
};

export type AppealsSearchRequest = {
    filter?: AppealsFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};