"use client";
// Next Module
import { useRouter, useSearchParams } from "next/navigation";
// React Module
import { useCallback } from "react";
// React Icon
import { IconType } from "react-icons";
// Query String
import qs from 'query-string'

interface CategoryBoxProps {
    label: string,
    selected?: boolean
    icon: IconType
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    label,
    selected,
    icon: Icon
}) => {
    
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        // Convert the params into Object
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        // Add Label
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // remove category if select it again
        if(params?.get('category') === label){
            delete updatedQuery.category;
        }

        // ../?category=Beach
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        // Navigate to combined params
        router.push(url);

    }, [params, label, router])

  return (
    <div onClick={handleClick} className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral' : 'text-neutral-500'}
        `}
    >
        <Icon size={26} />
        
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox