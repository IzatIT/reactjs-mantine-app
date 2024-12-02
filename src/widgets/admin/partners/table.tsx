'use client'
import {deletePartner, Partners, PartnersPath,} from "src/entities/partners";
import {HeadCell,} from "src/entities/app-table";
import {
    AdminAppShell, AppTableFeature, DataDeleteFeature,
    DataSortingFeature, PartnersFilterFeature
} from "src/features";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {IconChevronDown, IconEye, IconPencil, IconTrash} from "@tabler/icons-react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Content} from "src/shared/helpers/content";
import {AppActions} from "src/shared/ui/choose-actions";

export const PartnersTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useNavigate()
    const {t, i18n} = useTranslation()
    const locale = i18n.language

    const handleDelete = () => {
        if (selectedId) {
            deletePartner(selectedId)
            deleteToggle()
        }
    }

    const actions = (data: Partners) => {
        return [
            {
                icon: <IconPencil />,
                title: t("button.edit"),
                onClick: () => router(`${data.id}/edit`),
            },
            {
                icon: <IconEye />,
                title: t("button.view"),
                onClick: () => router(`${data.id}`),
            },
            {
                icon: <IconTrash />,
                title: t("button.delete"),
                onClick: () => {
                    deleteToggle()
                    setSelectedId(data.id)
                },
            },
        ]
    };

    const headCells: HeadCell<Partners>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.title"),
            render: (n) => Content.GetTitleByLanguage(n, locale),
        },
        {
            label: t("button.actions"),
            render: (n) => (
                <AppActions
                    target={
                        <Flex gap={5}>
                            {t("button.actions")}
                            <IconChevronDown />
                        </Flex>}
                    actions={actions(n)} />
            ),
        },
    ];

    const sortByMethods = [
        { label: t("form.label.sortby.id"), value: "ID" },
        { label: t("form.label.sortby.publishedAt"), value: "PUBLISHED_AT" },
    ]

    return (
        <>
            <AdminAppShell
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                createRouterPath="create"
                pageTitle={t("table.titles.partners")}>
                <AppTableFeature<Partners>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router(`${row.id}`)}
                    searchApi={PartnersPath.search}
                />
            </AdminAppShell>
            <PartnersFilterFeature
                opened={openedFilter} toggle={filterToggle}
            />
            <DataSortingFeature
                sortByMethods={sortByMethods}
                opened={openedSorting}
                close={closeSorting}
            />
            <DataDeleteFeature
                onDelete={handleDelete}
                opened={deleteOpened}
                toggle={deleteToggle} />
        </>
    )
}
