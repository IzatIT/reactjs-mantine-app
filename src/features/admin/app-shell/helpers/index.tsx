import { AdminPageList, Pages } from "src/entities/app-shell"
import {
     IconCirclesRelation,
    IconNews, IconSitemap,
    IconStack3Filled, IconUsersGroup
} from "@tabler/icons-react"
import { ReactNode } from "react"

type iconsObjType = {
    [key: string]: ReactNode
}

const icons: iconsObjType = {
    info_block: <IconNews />,
    categories: <IconSitemap />,
    appeals: <IconUsersGroup />,
    products: <IconStack3Filled />,
    partners: <IconCirclesRelation />,
}


export const getIcon = (page: string) => {
    const result = icons?.[page]
    if (result) {
        return result
    }
    return icons.default
}

const pages: Pages = {
    appeals: {
        id: 1,
        title: { titleKg: "Кайрылуулар", titleRu: "Заявки", titleEn: "Appeals" },
        icon: getIcon("appeals"),
        link: "admin/appeals",
    },
    products: {
        id: 2,
        title: { titleKg: "Товарлар", titleRu: "Товары", titleEn: "Products" },
        icon: getIcon("products"),
        link: "admin/products",
    },
    categories: {
        id: 3,
        title: { titleKg: "Категориялар", titleRu: "Категории", titleEn: "Categories" },
        icon: getIcon("categories"),
        link: "admin/categories",
    },
    info_block: {
        id: 3,
        title: { titleKg: "Маалымат блогу", titleRu: "Инфо блок", titleEn: "Info Block" },
        icon: getIcon("info_block"),
        link: "admin/info_block",
    },
    partners: {
        id: 3,
        title: { titleKg: "Партнерлор", titleRu: "Партнеры", titleEn: "Partners" },
        icon: getIcon("partners"),
        link: "admin/partners",
    }
}

const pageKeys = Object.keys(pages)

export const getAccessiblePages = (permissions?: string[]): AdminPageList[] => {
    const result: AdminPageList[] = [];
    if (permissions) {
        pageKeys.map((key) => {
            if (permissions.includes(key)) {
                result.push(pages[key])
            }
        }, {});
    } else {
        pageKeys?.map(key => {
            result.push(pages[key])
        })
    }
    return result
}