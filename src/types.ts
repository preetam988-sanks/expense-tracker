export type Category="Food"|"Transport"|"Entertainment"|"Shopping"|"Other"

export interface Expense{
    id:string,
    amount:number,
    category:Category,
    date:string
    description:string
}

export const Categories:Category[]=["Food","Transport","Entertainment","Shopping","Other"]