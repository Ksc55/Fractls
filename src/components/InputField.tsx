
interface StyledInputProps {
    placeholder?: string;
    suffix?: string;
    type?: string;
    value?: string | number;
    onChange: (e: any) => void;
    name: string;
}

const StyledInput: React.FC<StyledInputProps> = (
    { placeholder, suffix , type= 'text', value, onChange, name}) => {
    return (
        <div className="relative w-full">
            <input
                type={type}
                placeholder={placeholder}
                className="bg-white border border-stone-800 p-4 rounded-full text-center placeholder-gray-500 h-10 w-full"
                value={value}
                onChange={(onChange)}
                name={name}
            />
            {suffix && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          {suffix}
        </span>
            )}
        </div>
    );
};

export default StyledInput;
