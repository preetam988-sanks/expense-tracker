interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label:string;
    options?:{value:string,label:string}[];
    error?:string;

}
export function Select({
    label,
    options,
    error,
    className,
    ...props
}:SelectProps){
    return(
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            <label className='text-sm font-medium text-gray-700'>{label}</label>
            <select className={`px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 transition-shadow cursor-pointer
            ${error && 'border-red-500 focus:ring-red-500'}`}>
        {options.map((option)=>(
        <option key={option.value} value={option.value}>{option.label}</option>
        ))}

            </select>
        </div>
    )
}
