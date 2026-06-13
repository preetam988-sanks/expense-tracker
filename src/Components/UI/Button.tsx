interface  ButtonProps{
    onClick:()=>void
    type:"button"|"submit"|"reset"
    disabled:boolean
    variant?:'primary'|'secondary'|'danger'
}

// import React from "react";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     variant?: 'primary' | 'secondary' | 'danger',
//     // onClick?: () => void
// }

export function Button ({


                            variant = 'primary',
                                                  children,
                                                  className = '',
                                                  ...props

                                              }: ButtonProps)  {
    const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-color cursor-pointer '
    const variantStyles = {
        primary: 'bg-blue-300 text-white hover:bg-blue-700 focus:ring-blue-80',
        secondary: 'bg-green-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-red-800',
    };


    return (
        <button className={`${variantStyles[variant]} ${baseStyles} ${className}`} {...props}>
            {children}
        </button>
    )
}
