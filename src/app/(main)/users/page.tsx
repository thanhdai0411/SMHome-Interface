import createUser from '@/actions/createUser';
import { ContentLayout } from '@/components/layouts/content-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from '@/components/user/columns';
import { DataTableUser } from '@/components/user/data-table';
import { clerkClient } from '@/configs/clerk';
import { UserMapping } from '@/types/user';
import { User } from '@clerk/backend';

interface SearchParams {
    page?: string;
    limit?: string;
    search?: string;
}

interface UsersPageProps {
    searchParams: SearchParams;
}

async function getData(searchParams: SearchParams): Promise<{
    data: UserMapping[];
    totalCount: number;
}> {
    const limit = Number(searchParams.limit || 100);
    const page = Number(searchParams.page || 1);

    const { data, totalCount } = await clerkClient?.users?.getUserList({
        limit: limit,
        offset: (page - 1) * limit,
        query: searchParams?.search,
    });

    const resRules = await Promise.all(
        data.map(async (v) => {
            try {
                const resR =
                    await clerkClient?.users?.getOrganizationMembershipList({
                        userId: v.id,
                        limit: 100,
                    });

                return {
                    ...v,
                    roles: resR?.data || undefined,
                };
            } catch (e) {
                return {
                    ...v,
                };
            }
        }),
    );

    return JSON.parse(JSON.stringify({ data: resRules, totalCount }));
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const { data, totalCount } = await getData(searchParams);
    return (
        <ContentLayout title="Danh sách người dùng">
            <DataTableUser data={data} totalCount={totalCount} />
        </ContentLayout>
    );
}
