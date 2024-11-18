import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem } from './form';
import { Label } from './label';
import { Switch } from './switch';

interface SwitchHookProps<T extends FieldValues, B> {
    control: Control<T, B>;
    name: Path<T>;
    label? : string
}

function SwitchHook<T extends FieldValues, B>({
    control,
    name,
    label
}: SwitchHookProps<T, B>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="airplane-mode"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="airplane-mode">{label ? label : "Kích hoạt"}</Label>
                    </div>
                </FormItem>
            )}
        />
    );
}

export default SwitchHook;
