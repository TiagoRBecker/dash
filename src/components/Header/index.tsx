"use client"

type User = {
  name:string,
  email:string,
  role:string,
  avatar:string
}
import { Avatar } from '@chakra-ui/react'
import { useSession } from "next-auth/react";
const Header = ({search,value,onChange,handleMenu}:any) => {
    const { data:session} = useSession()
   
  return (
    <div className="w-[92%] h-16 flex items-center justify-between px-6 py-2 bg-white ">
       
      <div className="w-full flex items-center gap-2">
        <input
        value={value}
        onChange={onChange}
          type="search"
          className="w-2/3 h-9 outline-none border-[1px] border-gray-300 rounded-md pl-4 px-4 "
          placeholder={"Filtar nome"}
        />
        <div className="bg-[#005183] w-12 h-9 rounded-md flex items-center justify-center" onClick={search}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6  text-white cursor-pointer "
          
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        </div>
        
      </div>
      <div className="w-[30%] h-full flex items-center justify-end gap-6">
        <div className='flex items-center gap-3'>
          <p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

          </p>
          <p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

          </p>
        </div>
      <Avatar name={session?.user?.name as any } src={ '/user.png'}  />
  
      </div>
     
    </div>
  );
};

export default Header;
