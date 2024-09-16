export interface ErrorClerk {
    clerkError: boolean;
    clerkTraceId: string;
    status: number;
    errors: {
        code: string;
        longMessage: string;
        message: string;
        meta: { [key: string]: string };
    }[]
}
