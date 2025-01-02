'use client';

import { PaginationState } from '@tanstack/react-table';

import deleteUserAction from '@/actions/deleteUser';
import getUserAction from '@/actions/getUser';
import { SMHomePermission } from '@/constants/roles';
import usePermission from '@/hooks/usePermission';
import { ErrorClerk } from '@/types/error';
import { UserMapping } from '@/types/user';
import { handleErrorClerk } from '@/utils/handleError';
import { User } from '@clerk/backend';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    ChangeEvent,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { DataTable } from '../ui/data-table';
import DialogConfirm from '../ui/dialog-confirm';
import { columns } from './columns';
import DialogAddRole from './dialog-add-role';
import DialogAddUser from './dialog-add-user';
interface DataTableProps {
    data: UserMapping[];
    totalCount: number;
}

export function DataTableUser({ data, totalCount }: DataTableProps) {

    const canAccessUpdate = usePermission({
        permissions: [SMHomePermission.Admin],
    });

    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, serUserData] = useState<UserMapping | null>(null);
    const [dialogRole, setDialogRole] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [dialogDelete, setDialogDelete] = useState<boolean>(false);

    const handleSearch = useDebouncedCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            setTextSearch(text);
        },
        300,
    );

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pagination.pageIndex + 1));
        params.set('limit', String(pagination.pageSize));

        if (textSearch) {
            params.set('search', String(textSearch));
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }, [
        pagination.pageIndex,
        pagination.pageSize,
        textSearch,
        pathname,
        replace,
        searchParams,
    ]);

    const handleAddRole = (userData: UserMapping) => {
        setDialogRole(true);
        serUserData(userData);
    };

    const handleViewProfile = async (userId: string) => {
        if (isPending) return;

        startTransition(() => {
            getUserAction(userId)
                .then((res: User | ErrorClerk) => {
                    const isError = handleErrorClerk(res as ErrorClerk);
                    if (!isError) {
                    }
                })
                .catch((e) => {
                    toast.error('Cố lỗi xảy ra. Vui lòng thử lại sau');
                });
        });
    };
    const handleDeleteUser = (userId: string) => {
        setUserId(userId);
        setDialogDelete(true);
    };

    // handle confirm delete
    const handleConfirmDelete = () => {
        if (isPending) return;

        startTransition(() => {
            deleteUserAction(String(userId))
                .then((res: ErrorClerk) => {
                    const isError = handleErrorClerk(res as ErrorClerk);
                    if (!isError) {
                        toast.success('Xóa người dùng thành công');
                        setDialogDelete(false);
                    }
                })
                .catch((e) => {
                    toast.error('Cố lỗi xảy ra. Vui lòng thử lại sau');
                    setDialogDelete(false);
                });
        });
    };

    const columsDf = useMemo(
        () =>
            columns({
                handleViewProfile,
                handleAddRole,
                handleDeleteUser,
                canAccessUpdate,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <>
            <DataTable
                columns={columsDf}
                data={data}
                pagination={pagination}
                setPagination={setPagination}
                onChangeSearch={handleSearch}
                placeholderSearch="Tìm kiếm người dùng ..."
                totalCount={totalCount}
                elmAfterSearch={canAccessUpdate ? <DialogAddUser /> : undefined}
            />
            {dialogRole && userData && (
                <DialogAddRole
                    setOpen={setDialogRole}
                    open={dialogRole}
                    userData={userData}
                />
            )}

            {dialogDelete && userId && (
                <DialogConfirm
                    open={dialogDelete}
                    setOpen={setDialogDelete}
                    handleConfirm={handleConfirmDelete}
                    nameButton="Xóa người dùng"
                    title="Xóa người dùng"
                    disableConfirm={isPending}
                />
            )}
        </>
    );
}
