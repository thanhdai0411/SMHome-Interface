import { Dispatch, SetStateAction } from 'react';
import { Button } from './button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './dialog';

interface DialogConfirmProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleConfirm: () => void;
    disableConfirm?: boolean;
    nameButton?: string;
    nameButtonClose?: string;
    title?: string;
    desc?: string;
}
function DialogConfirm({
    open,
    setOpen,
    handleConfirm,
    disableConfirm,
    nameButton = 'Xóa thông tin',
    title = 'Xóa thông tin',
    desc = 'Bạn chắc muốn xóa thông tin này. Khi xóa sẽ không thể khôi phục',
    nameButtonClose = 'Đóng',
}: DialogConfirmProps) {
    return (
        <div>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div>{desc}</div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                {nameButtonClose}
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={handleConfirm}
                            disabled={disableConfirm}
                        >
                            {nameButton}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DialogConfirm;
