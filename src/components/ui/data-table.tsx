'use client';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
    type OnChangeFn,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './button';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    sorting?: SortingState;
    onSortingChange?: OnChangeFn<SortingState>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    sorting: controlledSorting,
    onSortingChange: onControlledSortingChange,
}: DataTableProps<TData, TValue>) {
    const [internalSorting, setInternalSorting] = useState<SortingState>([]);
    const sorting = controlledSorting ?? internalSorting;
    const setSorting = onControlledSortingChange ?? setInternalSorting;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div className='flex items-center'>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Button
                                                        variant='ghost'
                                                        size='sm'
                                                        className='ml-2 h-8 w-8 p-0'
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        <ArrowUpDown className='h-4 w-4' />
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
