import {AppealsFilter} from 'src/entities/appeals';
import { getFormType } from 'src/types';


export const getAppealsFilterForm: getFormType<AppealsFilter, AppealsFilter> = (params?: AppealsFilter) => {
    const initialValues: AppealsFilter = {
        title: params?.title,
    }
    return {
        initialValues
    }
}
