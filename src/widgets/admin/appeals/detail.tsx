"use client"
import {
    APPEAL_STATUS, APPEAL_TYPE,
    Appeals,
    AppealsForm,
    getAppeal, updateAppeal
} from "src/entities/appeals"
import { AdminAppShell } from "src/features"
import {Box, Flex, Text} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import {useForm} from "@mantine/form";
import {useTranslation} from "react-i18next";
import {Link, useParams} from "react-router-dom";
import {AppButton, AppSelect} from "src/shared/ui/forms";
import {ContentInfo} from "src/shared/ui/content-info";
import {AppModal} from "src/shared/ui/modal";
import {Content} from "src/shared/helpers/content";

export const AppealsDetailWidget = () => {
    const {t, i18n} = useTranslation()
    const locale = i18n.language
    const { id } = useParams<{ id: string }>()
    const [opened, { toggle, close }] = useDisclosure()
    const [data, setData] = useState<Appeals>()

    const fetchAppeals = async () => {
        if(id){
            const res = await getAppeal(id)
            setData(res)

        }
    }
    const form = useForm<AppealsForm>({
        initialValues: {
            id: id ? parseInt(id) : undefined,
            name: data?.name || "",
            phoneNumber: data?.phoneNumber || "",
            status: data?.status || APPEAL_STATUS.UNREAD,
            type: data?.type || APPEAL_TYPE.MAIN_PAGE,
            email: data?.email || "",
        }
    })

    useEffect(() => {
        fetchAppeals()
    }, [id])

    const handleClickEdit = () => {
        toggle()
    }

    const appealStatusSelectDto = [
        {
            label: t(`table.${APPEAL_STATUS.UNREAD}`),
            value: APPEAL_STATUS.UNREAD,
        },
        {
            label:t(`table.${APPEAL_STATUS.PENDING}`),
            value: APPEAL_STATUS.PENDING,
        },
        {
            label: t(`table.${APPEAL_STATUS.READ}`),
            value: APPEAL_STATUS.READ,
        },
        {
            label: t(`table.${APPEAL_STATUS.CLOSED}`),
            value: APPEAL_STATUS.CLOSED,
        },
    ]
    console.log(form.values)
    const handleSubmit = async () => {
        const res = await updateAppeal(form.values)
        if(res?.status === 200) {
            close()
        }
    }


    const content = [
        { label: t("table.id"), value: data?.id },
        { label: t("table.name"), value: data?.name },
        { label: t("table.phone"), value: data?.phoneNumber },
        { label: t("table.email"), value: data?.email },
        { label: t("table.status"), value: t(`table.${data?.status}`) },
        { label: t("table.product"), value: data?.product?.id ? (
                <Link to={`/${locale}/admin/products/${data?.product?.id}`}>
                    <Text c="white">
                        {Content.GetTitleByLanguage(data?.product, locale)}
                    </Text>
                    перейти на товар
                </Link>
            ) : null }
    ]
    return (
        <>
            <AdminAppShell pageTitle={t("table.titles.detail-appeal")}>
                <Flex justify="end">
                    <AppButton onClick={handleClickEdit} variant="sorting">
                        {t("button.change_status")}
                    </AppButton>
                </Flex>
                {content && <ContentInfo data={content} />}
            </AdminAppShell>
            <AppModal opened={opened} toggle={toggle} closeOnClickOutside>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Box mb={16}>
                        <AppSelect
                            data={appealStatusSelectDto}
                            {...form.getInputProps("status")}
                        />
                    </Box>
                    <AppButton type="submit" variant="filter">
                        {t("button.save")}
                    </AppButton>
                </form>
            </AppModal>
        </>
    )
}
