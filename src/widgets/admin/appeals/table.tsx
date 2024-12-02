'use client'
import {deleteCategory,} from "src/entities/categories";
import {HeadCell,} from "src/entities/app-table";
import {Appeals, AppealsPath, deleteAppeal} from "src/entities/appeals";
import {
    AdminAppShell, AppealsFilterFeature, AppTableFeature, DataDeleteFeature,
    DataSortingFeature
} from "src/features";
import { AppActions } from "src/shared/ui/choose-actions";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconEye,  IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const AppealsTableWidget = () => {
    const [openedFilter, { toggle: filterToggle }] = useDisclosure();
    const [openedSorting, { toggle: sortingToggle, close: closeSorting }] = useDisclosure();
    const [deleteOpened, { toggle: deleteToggle }] = useDisclosure()
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const router = useNavigate()
    const {t} = useTranslation()

    const handleDelete = () => {
        if (selectedId) {
            deleteAppeal(selectedId)
            deleteToggle()
        }
    }

    const actions = (data: Appeals) => {
        return [
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

    const headCells: HeadCell<Appeals>[] = [
        {
            label: t("table.id"),
            render: (n) => n.id,
        },
        {
            label: t("table.name"),
            render: (n) => n.name,
        },
        {
            label: t("table.phone"),
            render: (n) => n.phoneNumber,
        },
        {
            label: t("table.status"),
            render: (n) => t(`table.${n.status}`),
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
                withCreateButton={false}
                filterToggle={filterToggle}
                sortingToggle={sortingToggle}
                withButtons
                pageTitle={t("table.titles.appeals")}>
                <AppTableFeature<Appeals>
                    withPagination
                    headCells={headCells}
                    doubleClickAction={(row) => router(`${row.id}`)}
                    searchApi={AppealsPath.search}
                />
            </AdminAppShell>
            <AppealsFilterFeature
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
