interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label:string;
    options?:{value:string,label:string}[];
    error?:string;

}
export function Select({
    label,
    options=[],
    error,
    className,
    ...props
}:SelectProps){
    return(
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            <label className='text-sm font-medium text-white'>{label}</label>
            <select
                {...props} className={`px-3 py-2 border rounded-md bg-blue focus:outline-none focus:ring-2 transition-shadow cursor-pointer
            ${error && 'border-red-500 focus:ring-red-500'}`}>
        {options.map((option)=>(
        <option key={option.value} className="bg-white text-black" value={option.value}>{option.label}</option>
        ))}

            </select>

        </div>
    )
}
