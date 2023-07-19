"use client";

import Image from "next/image";

interface AvatarProps {
  profileImgUrl: string | null | undefined
}

const Avatar:React.FC<AvatarProps> = ({
  profileImgUrl
}) => {
  return (
    <>
        <div>
            <Image 
                src={profileImgUrl || "/images/placeholder.jpg"}
                alt="avatar"
                width={30}
                height={30}
                className="rounded-full"
            />
        </div>
    </>
  )
}

export default Avatar