import { LoginRequest } from 'src/entities/auth';
import { UseFormInput } from '@mantine/form';

type Args = {
    minTitle: string;
    requiredTitle: string;
}

type getFormType = (body: Args) => UseFormInput<LoginRequest, (values: LoginRequest) => LoginRequest>

export const getLoginForm: getFormType = ({
    minTitle,
    requiredTitle,
}) => {
    const validate = {
        login: (value: string) => !value && requiredTitle,
        password: (value: string) => !value && requiredTitle
    }

    const initialValues: LoginRequest = {
        login: "",
        password: "",
    }
    return {
        initialValues, validate: validate
    }
}