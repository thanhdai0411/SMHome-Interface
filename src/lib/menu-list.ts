import {
    LayoutGrid,
    LucideIcon,
    Settings,
    SquarePen,
    Users
} from 'lucide-react';

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
            groupLabel: 'Phòng',
            menus: [
                {
                    href: '',
                    label: 'Phòng',
                    active: pathname.includes('/posts'),
                    icon: SquarePen,
                    submenus: [
                        {
                            href: '/posts',
                            label: 'All Posts',
                            active: pathname === '/posts',
                        },
                        {
                            href: '/posts/new',
                            label: 'New Post',
                            active: pathname === '/posts/new',
                        },
                    ],
                },
            ],
        },
        {
            groupLabel: 'Cài đặt',
            menus: [
                {
                    href: '/users',
                    label: 'Người dùng',
                    active: pathname.includes('/users'),
                    icon: Users,
                    submenus: [],
                },
                {
                    href: '/configs',
                    label: 'Cấu hình',
                    active: pathname.includes('/configs'),
                    icon: Settings,
                    submenus: [
                        {
                            href: '/configs/node',
                            label: 'Cấu hình Node',
                            active: pathname === '/configs/node',
                        },
                    ],
                },
            ],
        },
    ];
}
