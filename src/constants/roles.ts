export const roles = [
    {
        name: 'Admin',
        key: 'org:admin',
        desc: 'Có toàn bộ quyền hạn trong hệ thống như điều khiển, giám sát, quản lý người dùng,...',
    },
    {
        name: 'Member',
        key: 'org:member',
        desc: 'Được phép điều khiển và giám sát',
    },
    {
        name: 'Viewer',
        key: 'org:viewer',
        desc: 'Chỉ được phép xem và giám sát',
    },
];

export enum SMHomeRole {
    Admin = 'org:admin',
    Member = 'org:member',
    Viewer = 'org:viewer',
}

export enum SMHomePermission {
    Admin = 'org:smhome:all',
    Control = 'org:smhome:control',
    Viewer = 'org:smhome:viewer',
    UserView = 'org:smhome:user_view',
}
