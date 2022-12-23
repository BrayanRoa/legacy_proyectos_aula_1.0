export interface FilesInterface {
    mv(uploadPath: any, arg1: (err: any) => void): unknown;
    name:         string;
    data:         Data;
    size:         number;
    encoding:     string;
    tempFilePath: string;
    truncated:    boolean;
    mimetype:     string;
    md5:          string;
}

interface Data {
    type: string;
    data: any[];
}