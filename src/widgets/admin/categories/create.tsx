"use client"
import {AdminAppShell, CategoriesFormFeature} from "src/features"
import {useTranslation} from "react-i18next";

export const CategoriesCreateWidget = () => {
    const {t} = useTranslation()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-categories")}>
            <CategoriesFormFeature />
        </AdminAppShell>
    )
}
