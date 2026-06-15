import {Dispatch, SetStateAction, useEffect, useState} from "react";

// export function useLocalStorage<T>(key:string,initialvalue:T):[T,(value:T)=>void]{
export function useLocalStorage<T>(key:string,initialvalue:T):[T,Dispatch<SetStateAction<T>>]{
    const[storedValue,setStoredValue]=useState<T>(()=>{
        try{
            const item=localStorage.getItem(key);
            if(!item){
                return initialvalue;
            }
            else{
                return JSON.parse(item);
            }
        }
    catch(error){
            alert(`Error loading ${key} from local storage: ${error}`);
            console.warn(`Error loading ${key} from local storage: ${error}`);
            return initialvalue;
    }
    });
    useEffect(()=>{
        try{
            window.localStorage.setItem(key,JSON.stringify(storedValue));

        }catch(error){
            console.warn(`Error saving ${key} to local storage: ${error}`);
        }
    },[key,storedValue]);
    return [storedValue,setStoredValue];
}