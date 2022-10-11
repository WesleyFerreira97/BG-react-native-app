import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaDb } from "../services/supadb";

type UseSelectProps = {
    select: string[];
    match: string;
}

export function useSelect<T>({ select, match }: UseSelectProps) {
    const [selectResponse, setSelectResponse] = useState<T | null>(null);
    const [selectResponseError, setSelectResponseError] = useState<PostgrestError>();

    const selectedColumns = select.join(',');

    useEffect(() => {
        async function useSelect() {
            const { data, error } = await supaDb
                .from('products')
                .select(selectedColumns)
                .match({ id: 'fff4b9a3-bdea-4689-8df2-a98bbbcfe2f5' })

            setSelectResponse(data as T);
            setSelectResponseError(error);
        }

        useSelect();
    }, []);

    return { selectResponse, selectResponseError };
}
