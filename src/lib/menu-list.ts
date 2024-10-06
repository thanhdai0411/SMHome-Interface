import { Disc, LayoutGrid, LucideIcon, Settings, Users } from 'lucide-react';

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export const getHomeRoute = '/dashboard';

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: '/dashboard',
                    label: 'Tổng quan',
                    active: pathname.includes('/dashboard'),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: '',
            menus: [
                {
                    href: '/users',
                    label: 'Người dùng',
                    active: pathname.includes('/users'),
                    icon: Users,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: '',
            menus: [
                {
                    href: '/configs/node',
                    label: 'Cấu hình Node',
                    active: pathname === '/configs/node',
                    icon: Disc,
                    submenus: [],
                },
            ],
        },
    ];
}
