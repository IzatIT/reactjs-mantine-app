import { Attachment } from "src/entities/attachments";
import { Flex } from "@mantine/core";
import { AttachmentItem, ExpectedType } from "./modules";
import { FilePreviewItem } from "./modules/file-item";

type Props = {
    fileType: ExpectedType
    files?: File[];
    attachments?: Attachment[] | string[]
    aspectRatio?: number;
    handleSaveCroped?: (args: HandleSaveCropedArgs) => void;
    handleDeleteFile?: (args: HandleDeleteFileArgs) => void;
    handleReOrder?: (args: HandleReOrderArgs) => void;
}

export const FilesPreview = ({
    aspectRatio,
    handleDeleteFile,
    handleSaveCroped,
    handleReOrder,
    files,
    fileType,
    attachments
}: Props) => {

    return (
        <Flex gap={10} wrap="wrap">
            {files?.map((el, index) => (
                <FilePreviewItem
                    fileType={fileType}
                    handleReOrder={handleReOrder}
                    index={index}
                    aspectRatio={aspectRatio}
                    handleDeleteFile={handleDeleteFile ? () => handleDeleteFile({ index, group: "file" }) : undefined}
                    handleSaveCroped={handleSaveCroped ? (file: File) =>
                        handleSaveCroped({ file, index, group: "file" }) : undefined}
                    file={el} key={index} />
            ))}

            {attachments?.map((el, index) => (
                <AttachmentItem
                    fileType={fileType}
                    handleReOrder={handleReOrder}
                    index={index}
                    aspectRatio={aspectRatio}
                    handleDeleteFile={handleDeleteFile &&  typeof el !== "string" ? () => handleDeleteFile({ group: "attachment", index: index, id: el.id }) : undefined}
                    handleSaveCroped={handleSaveCroped &&  typeof el !== "string" ? (file: File) =>
                        handleSaveCroped({ file, index, group: "attachment", id:  el.id }) : undefined}
                    file={el} key={index} />
            ))}
        </Flex>
    )
}
