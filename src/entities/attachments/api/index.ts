import { createApi } from "src/constants";
import {Notify} from "src/shared/helpers/notification";
import {api} from "src/shared/config/api";
import {handleAxiosError} from "src/shared/config/api/handle-error";

export class AttachmentPath {
    static get = (id: number) => createApi(`attachment/download?attachmentId=${id}`);
    static delete = (id: number) => createApi(`attachment/delete?attachmentId=${id}`);

    static GetAttachmentUrl = (id?: number) => {
        if (id) {
            return this.get(id);
        };
        return "";
    };
};


export const deleteAttachment = async (id: number,notifyOnError=false) => {
    try{
        const res = await api.delete(AttachmentPath.delete(id));
        if(res.status === 200){
            Notify.ShowSuccess(res.status.toString())
        }
    }catch (error) {
        handleAxiosError(error, notifyOnError)
    }
}