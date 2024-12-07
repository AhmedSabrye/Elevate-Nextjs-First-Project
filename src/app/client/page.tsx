'use client';

import { useSession } from "next-auth/react";

export default function Page() {
  const {data,status} = useSession({
    required: true,
    
  });
  
  console.log("session", data,status);
  return <h1 className="text-9xl">i'm Client</h1>;
}
