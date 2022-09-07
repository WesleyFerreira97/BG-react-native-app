import type { PostgrestResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type DbInsertReturn<T> = {
    dataResponse: PostgrestResponse<T> | undefined,
    setData: React.Dispatch<T>
};

export function useInsert<T>(
    table: string
): DbInsertReturn<T> {

    const [dataResponse, setDataResponse] = useState<PostgrestResponse<T>>();
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (!data) return;

        supaDb.from(table)
            .insert(data)
            .then((res) => {
                setDataResponse(res);
            });

    }, [data]);

    return { dataResponse, setData };
}

// export async function useFileUploadAlt(file: FileProps): Promise<ResponseUploadProps> {

//     const { data, error } = await supaDb
//         .storage
//         .from("photo")
//         .upload(`public/${file?.name}/${file?.data._parts[0][1].name}`, file?.data)

//     return { uploadFileData: data, uploadFileError: error }
// }
