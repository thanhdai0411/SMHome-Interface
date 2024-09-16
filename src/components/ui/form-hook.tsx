import React from 'react';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './form';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from './input';

interface FormHookProps<T extends FieldValues, B> {
    control: Control<T, B>;
    name: Path<T>;
    placeholder?: string;
    descriptionField?: string;
    label: string;
    inputType?: React.HTMLInputTypeAttribute;
}
function FormHook<T extends FieldValues, B>({
    control,
    name,
    placeholder,
    descriptionField,
    label,
    inputType = 'text',
}: FormHookProps<T, B>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={inputType}
                            placeholder={placeholder || ''}
                            {...field}
                        />
                    </FormControl>

                    {descriptionField && (
                        <FormDescription>{descriptionField}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FormHook;
