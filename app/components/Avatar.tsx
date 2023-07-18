"use client";

import Image from "next/image";

const Avatar = () => {
  return (
    <>
        <div>
            <Image 
                src="/images/placeholder.jpg"
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