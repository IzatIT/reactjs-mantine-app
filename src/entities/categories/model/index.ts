import {LocaleTitle} from "src/types";

export type CategoriesForm = {
    id?: number;
    titleKg: string;
    titleRu: string;
    contentKg?: string;
    contentRu?: string;
    characteristics: LocaleTitle[]
    parentId?: number;
}

export type Categories = {
    id: number;
    titleKg: string;
    titleRu: string;
    contentKg?: string;
    contentRu?: string;
    characteristics: LocaleTitle[]
    children?: Categories[];
    parentId?: Categories;
}

export type CategoriesFilter = {
    title?: string;
    content?: string;
    parentId?: number;
};

export type CategoriesSearchRequest = {
    filter?: CategoriesFilter;
    pageRequest?: {
        limit?: number;
        page?: number;
    };
    sorting?: {
        sortBy?: "ID" | "PUBLISHED_AT";
        sortDirection?: "ASC" | "DESC";
    };
};