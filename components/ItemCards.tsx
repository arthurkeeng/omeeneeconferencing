'use client'
import Image from "next/image"

interface ItemCardProps {
    color : string , 
    handleClick() : void , 
    icon : string, 
    title : string , 
    description : string

}
const ItemCards = ( {color, handleClick , icon , title , description } : ItemCardProps) => {
  return (
    
<div className={`${color} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] 
min-h-[260px] rounded-[14px] cursor-pointer
`}
onClick={handleClick}
>
    <div className="flex-center glassmorphism size-10 rounded-[10px">
        <Image 
        src = {icon}
        // src = "/icons/add-meeting.svg" 
        alt = {title}
        width={20}
        height={20}
        />

    </div>
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
    </div>
</div>
  )
}

export default ItemCards
