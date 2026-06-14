import {useCallback, useState,useEffect} from "react";

interface FetchResult<T>{
    data:T;
    loading:boolean;
    error:string|null;
    refetch:()=>void;

}
export function useFetch<T>(url:string):FetchResult<T>{
    const[data,setData]=useState<T|null>(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState<string|null>(null);
    const fetchData=useCallback(async()=>{
     setLoading(true);
     setError(null);
     try{
         const response=await fetch(url);
         if(!response.ok){
             throw new Error(`Failed to fetch data ${response.statusText}`);
         }
         const result=await response.json();
         setData(result);
     }catch(err:any){
         setError(err.message);
     }finally{
         setLoading(false);
     }
    },[url]);
    useEffect(()=>{
        fetchData();
    },[fetchData]);

    return {data,loading,error,refetch:fetchData}
}//can we abort request