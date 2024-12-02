"use client"
import {AdminAppShell} from "src/features"
import {PartnersFormFeature} from "src/features";
import {useTranslation} from "react-i18next";

export const PartnersCreateWidget = () => {
    const {t} = useTranslation()

    return (
        <AdminAppShell pageTitle={t("table.titles.create-partners")}>
            <PartnersFormFeature />
        </AdminAppShell>
    )
}
