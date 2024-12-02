"use client"
import { AdminAppShell,  } from "src/features"
import { useEffect, useState } from "react"
import {getCurrentUser, Profile} from "src/entities/auth";
import {useTranslation} from "react-i18next";
import {ContentInfo} from "src/shared/ui/content-info";

export const ProfileInfoWidget = () => {
    const {t} = useTranslation()
    const [data, setData] = useState<Profile>()

    const fetchMyData = async () => {
        const res = await getCurrentUser()
        setData(res)
    }

    const content = [
        {
            label: t("table.login"),
            value: <code>{data?.login}</code>
        },
        {
            label: t("table.fullName"),
            value: `${data?.surname} ${data?.name} ${data?.patronymic}`,
        },
        {
            label: t("table.inn"),
            value: data?.inn
        },
        {
            label: t("table.role"),
            value: data?.role === "ROLE_ADMIN" ? "Администратор" : "Неизвестно"
        },
    ]

    useEffect(() => {
        fetchMyData()
    }, [])
    return (
        <AdminAppShell>
            {content && <ContentInfo data={content} />}
        </AdminAppShell>
    )
}
