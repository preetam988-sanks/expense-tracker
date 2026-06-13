import {useEffect, useState} from "react";

export function useLocalStorage<T>(key:string,initialvalue:T):[T,(value:T)=>void]{
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
            prompt(`Error loading ${key} from local storage: ${error}`);
            console.warn(`Error loading ${key} from local storage: ${error}`);
    }
    });
    useEffect(()=>{
        try{
            window.localStorage.setItem(key,JSON.stringify(storedValue));

        }catch(error){
            console.warn(`Error saving ${key} to local storage: ${error}`);
        }
    },[storedValue,setStoredValue]);
}