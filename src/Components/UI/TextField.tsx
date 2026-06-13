import React from "react"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label:string
    error?:string
}
export const TextField=React.forwardRef<HTMLInputElement,TextFieldProps>(
    (
        {
            label,
            error,
            className='',
            ...props
        },ref
    )=>{
        return(
            <div className={`flex flex-col gap-1 w-full ${className}`}>
               <label className="text-sm font-medium text-gray-700">{label}</label>
                <input ref={ref} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" {...props}/>
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)