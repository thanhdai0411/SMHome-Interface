import { PersonIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Button } from 'react-day-picker';

function ConfigView() {
    return (
        <>
            <Button>
                <PersonIcon className="mr-2 h-4 w-4" />
                Thêm người dùng
            </Button>
        </>
    );
}

export default ConfigView;
