import { SearchResponse } from "src/entities/app-table";
import {api} from "src/shared/config/api";
import {handleAxiosError} from "src/shared/config/api/handle-error";


type Args = {
    searchUrl: string;
    filter?: Object,
    pageRequest?: PageRequest
    sorting?: SortRequest
}
export const searchData = async <T>({
    searchUrl,
    sorting,
    filter,
    pageRequest
}: Args, notifyOnError = true) => {
    try {
        const response = await api.post<T>(searchUrl, {
            filter: filter,
            pageRequest: pageRequest,
            sorting: sorting
        })
        return response.data as SearchResponse<T>
    } catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}