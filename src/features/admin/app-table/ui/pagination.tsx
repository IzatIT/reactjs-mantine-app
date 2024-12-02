"use client"
import { useEffect } from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {AppPagination} from "src/shared/ui/pagination";

type Props = {
    totalPages?: number;
    variant?: "client-part" | "admin-part";
}
const limitsPerPage = ["10", "20"]

export const PaginationFeature = ({ totalPages, variant }: Props) => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const router = useNavigate()
    const {pathname} = useLocation()

    const handleChangePagination = (values: Pagination) => {
        const oldParams = Object.fromEntries(searchParams);
        const updatedParams = {
            ...oldParams,
            page: `${values.page || page || 1}`,
            limit: `${values.limit || limit ||  10}`,
        };

        const urlParams = new URLSearchParams(updatedParams).toString();
        router(`${pathname}?${urlParams}`);
    };

    useEffect(() => {
        handleChangePagination({ total: totalPages })
    }, [totalPages])

    return (
        <AppPagination
            variant={variant}
            data={limitsPerPage}
            pagination={{
                limit: limit || "10",
                page: parseInt(`${page || 1}`),
                total: totalPages || 1
            }}
            onChange={handleChangePagination}
        />
    )
}
