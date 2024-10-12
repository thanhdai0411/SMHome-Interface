'use client';

import { UserMapping } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DataTableColumnHeader } from '../ui/data-table-columnHeader';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import Chip from '../ui/chip';

type Props = {
    handleViewProfile: (userId: string) => void;
    handleAddRole: (userData: UserMapping) => void;
    handleDeleteUser: (userId: string) => void;
    canAccessUpdate: boolean;
};

export const columns = ({
    handleViewProfile,
    handleAddRole,
    handleDeleteUser,
    canAccessUpdate,
}: Props): ColumnDef<UserMapping>[] => {
    const defineCol: ColumnDef<UserMapping>[] = [
        // {
        //     id: 'select',
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && 'indeterminate')
        //             }
        //             onCheckedChange={(value) =>
        //                 table.toggleAllPageRowsSelected(!!value)
        //             }
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: 'Người dùng',
            header: 'Người dùng',
            cell: ({ row }) => {
                const user = row.original;
                const names = [user?.firstName, user?.lastName].filter(
                    (v) => v,
                );
                return (
                    <div className="flex gap-2 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage
                                    src={user.imageUrl}
                                    className="w-10 h-10 rounded-full"
                                />
                                <AvatarFallback>ND</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-left font-medium">
                                {names.length > 0
                                    ? names.join(' ')
                                    : 'Người dùng'}
                            </div>
                            <div className="text-left text-xs">
                                {user.username}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
            cell: ({ row }) => {
                const user = row.original;
                const emailList = user.emailAddresses
                    .map((v) => v.emailAddress)
                    .join(', ');
                return <div className="text-left font-medium">{emailList}</div>;
            },
        },

        {
            id: 'roles',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Quyền hạn"
                    className="text-center"
                />
            ),

            cell: ({ row }) => {
                const user = row.original;
                const roles =
                    user?.roles
                        ?.map((v) =>
                            capitalizeFirstLetter(v.role.split(':')[1]),
                        )
                        .join(', ') || undefined;
                return (
                    <div className="text-center font-medium">
                        {!roles ? '-' : <Chip name={roles} />}
                    </div>
                );
            },
        },

        {
            accessorKey: 'createdAt',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tham gia" />
            ),
            cell: ({ row }) => {
                const user = row.original;
                const createdAtFormat = moment(user.createdAt).format(
                    'HH:mm DD/MM/YYYY',
                );
                return (
                    <div className="text-left font-medium">
                        {createdAtFormat}
                    </div>
                );
            },
        },

        {
            id: 'actions',

            cell: ({ row }) => {
                const user = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => handleAddRole(user)}
                            >
                                Quyền hạn
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Xóa người dùng
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (!canAccessUpdate) {
        defineCol.pop();
    }

    return defineCol;
};
