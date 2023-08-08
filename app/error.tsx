"use client";

import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";

interface ErrorProps {
  error: Error
}

const Error:React.FC<ErrorProps> = ({
  error
}) => {

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <EmptyState 
        title="Uh Oh"
        subtitle="Something went wrong!"
      />
    </div>
  )
}

export default Error