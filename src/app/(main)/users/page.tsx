import { ContentLayout } from '@/components/layouts/content-layout';
import { columns, UserData } from '@/components/user/columns';
import { DataTableUser } from '@/components/user/data-table';
import { clerkClient } from '@/configs/clerk';

async function getData(): Promise<UserData[]> {
    // Fetch data from your API here.
    const userList = await clerkClient.users.getUserList({
        limit: 1,
        offset: 1,
    });

    return [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: '728ed53f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: '728ed54f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
    ];
}
export default async function UsersPage() {
    const data = await getData();

    return (
        <ContentLayout title="Users">
            <DataTableUser columns={columns} data={data} />
        </ContentLayout>
    );
}
