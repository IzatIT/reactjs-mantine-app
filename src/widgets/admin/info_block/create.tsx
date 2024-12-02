"use client"
import {AdminAppShell, InfoBlockFormFeature} from "src/features"
import {useTranslation} from "react-i18next";

export const InfoBlockCreateWidget = () => {
    const {t} = useTranslation()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-info_block")}>
            <InfoBlockFormFeature />
        </AdminAppShell>
    )
}
