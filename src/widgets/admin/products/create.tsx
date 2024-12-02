"use client"
import { AdminAppShell, ProductsFormFeature } from "src/features"
import {useTranslation} from "react-i18next";

export const ProductsCreateWidget = () => {
    const {t} = useTranslation()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-products")}>
            <ProductsFormFeature />
        </AdminAppShell>
    )
}
