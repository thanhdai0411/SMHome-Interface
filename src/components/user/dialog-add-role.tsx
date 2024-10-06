import addPermissionUser from '@/actions/addPermissionUser';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { roles } from '@/constants/roles';
import { ErrorClerk } from '@/types/error';
import { UserMapping } from '@/types/user';
import { handleErrorClerk } from '@/utils/handleError';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import LoadingSpinner from '../ui/loading-spiner';
const formSchema = z.object({
    role: z.enum(roles.map((v) => String(v.key)) as any, {
        required_error: 'Vui lòng chọn quyền hạn để thêm mới',
    }),
});
export type FormCreateRole = z.infer<typeof formSchema>;

interface DialogAddRoleProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    userData: UserMapping;
}

function DialogAddRole({ open, setOpen, userData }: DialogAddRoleProps) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const handleComplete = async (values: FormCreateRole) => {
        const userId = userData.id;
        if (isPending || !userId) return;

        startTransition(() => {
            addPermissionUser(values.role, userId)
                .then((res: ErrorClerk) => {
                    const isError = handleErrorClerk(res);
                    if (!isError) {
                        toast.success('Thêm quyền hạn thành công');
                    }
                    setOpen(false);
                })
                .catch((e) => {
                    toast.error('Cố lỗi xảy ra. Vui lòng thử lại sau');
                    setOpen(false);
                });
        });
    };

    useEffect(() => {
        const roles = userData?.roles?.[0];
        if (roles) {
            form.setValue('role', roles.role);
        }
    }, [userData, form]);

    const isHaveRole = useMemo(() => {
        return !!userData?.roles?.[0];
    }, [userData]);

    return (
        <div>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isHaveRole
                                ? 'Cập nhật quyền hạn'
                                : 'Thêm quyền hạn'}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        {isHaveRole
                                            ? 'Chọn quyền hạn muốn thay đổi'
                                            : 'Chọn quyền hạn muốn thêm'}
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col"
                                        >
                                            {roles.map((v, index) => (
                                                <FormItem
                                                    key={index}
                                                    className="flex items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={v.key}
                                                        />
                                                    </FormControl>
                                                    <div className="flex-1">
                                                        <FormLabel className="font-normal cursor-pointer">
                                                            {v.name}
                                                            <FormDescription>
                                                                {v.desc}
                                                            </FormDescription>
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Đóng
                            </Button>
                        </DialogClose>

                        <Button
                            onClick={form.handleSubmit(handleComplete)}
                            disabled={isPending}
                        >
                            {isHaveRole ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DialogAddRole;
