'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '../ui/data-table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTableUser<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    return <DataTable columns={columns} data={data} />;
}
