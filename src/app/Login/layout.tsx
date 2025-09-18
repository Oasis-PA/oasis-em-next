'use client'

import "@/styles/index.css";

import type { ReactNode } from "react";

import Provider from "@/lib/provider";



export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
   

       <>
        <Provider>{children}</Provider>
       </> 
    
  );
}