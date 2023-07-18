"use client";

interface MenuProps {
    onClick: () => void
    label: string
}

const MenuItem:React.FC<MenuProps> = ({
    onClick,
    label
}) => {
  return (
    <>
     <div onClick={onClick} className="
        px-4
        py-3
        hover:bg-neutral-100transition
        font-semibold
     "
     >
        {label}
     </div>
    </>
  )
}

export default MenuItem