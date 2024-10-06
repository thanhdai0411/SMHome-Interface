import createUserAction from '@/actions/createUser';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
    emailInValid,
    maxDigitText,
    minDigitText,
    passwordNotMatch,
    required,
} from '@/constants/valid-text';
import { ErrorClerk } from '@/types/error';
import { handleErrorClerk } from '@/utils/handleError';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonIcon } from '@radix-ui/react-icons';
import { useState, useTransition } from 'react';
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
    DialogTrigger,
} from '../ui/dialog';
import FormHook from '../ui/form-hook';

const formSchema = z
    .object({
        firstName: z.string().trim().optional(),
        lastName: z.string().trim().optional(),
        username: z
            .string()
            .trim()
            .min(5, {
                message: minDigitText(5),
            })
            .max(20, {
                message: maxDigitText(20),
            })
            .optional()
            .or(z.literal('')),

        email: z
            .string({
                required_error: required,
            })
            .trim()
            .email({
                message: emailInValid,
            }),

        password: z.string().min(8, {
            message: minDigitText(8),
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: passwordNotMatch,
        path: ['confirmPassword'],
    });

export type FormCreateUserType = z.infer<typeof formSchema>;

function DialogAddUser() {
    const [isPending, startTransition] = useTransition();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const form = useForm<FormCreateUserType>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const handleComplete = async (values: FormCreateUserType) => {
        if (isPending) return;

        startTransition(() => {
            createUserAction(values)
                .then((res: ErrorClerk) => {
                    const isError = handleErrorClerk(res);
                    if (!isError) {
                        toast.success('Tạo người dùng thành công');
                    }
                    setOpenDialog(false);
                })
                .catch((e) => {
                    toast.error('Cố lỗi xảy ra. Vui lòng thử lại sau');
                    setOpenDialog(false);
                });
        });
    };

    return (
        <div>
            <Dialog onOpenChange={setOpenDialog} open={openDialog}>
                <DialogTrigger asChild>
                    <Button disabled={isPending}>
                        <PersonIcon className="mr-2 h-4 w-4" />
                        Thêm người dùng
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm người dùng</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <div className="flex flex-col gap-3">
                                <div className="grid gap-3 grid-cols-2 grid-rows-1">
                                    <FormHook
                                        control={form.control}
                                        name="firstName"
                                        label="First Name"
                                        placeholder="Nhập First Name..."
                                    />
                                    <FormHook
                                        control={form.control}
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Nhập Last Name..."
                                    />
                                </div>
                                <FormHook
                                    control={form.control}
                                    name="email"
                                    label="Email"
                                    placeholder="Nhập Email..."
                                    descriptionField="Dùng để đăng nhập vào hệ thống"
                                />
                                <FormHook
                                    control={form.control}
                                    name="username"
                                    label="Tên người dùng"
                                    placeholder="Nhập tên người dùng..."
                                    descriptionField="Tên người dùng có thể dùng để đăng nhập vào hệ thống thay email"
                                />
                                <FormHook
                                    control={form.control}
                                    name="password"
                                    label="Mật khẩu"
                                    inputType="password"
                                    placeholder="Mật khẩu..."
                                />
                                <FormHook
                                    control={form.control}
                                    name="confirmPassword"
                                    label="Nhập lại mật khẩu"
                                    inputType="password"
                                    placeholder="Nhập lại mật khẩu..."
                                />
                            </div>
                        </Form>
                    </div>
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
                            Thêm mới
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DialogAddUser;
