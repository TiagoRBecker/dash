"use client";
import Link from "next/link";
import { menuLinks } from "../Mock";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookies } from "../utils/cookies";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import { signOut } from "next-auth/react";
const Dash = ({ onClose }: any) => {
  const [showMenu, setShowMenu] = useState(true);
  const router = useRouter();
 

  
  return (
    <div className="w-full h-full">
      <nav className="w-full h-full flex flex-col gap-2">
        <Accordion defaultIndex={[0]} allowMultiple border={0}>
          {menuLinks.map((links, index) => (
            <>
              <AccordionItem border={"none"} key={index} color={"white"} pb={4}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      display="flex"
                      gap="3"
                      flex="1"
                      textAlign="left"
                      color={"white"}
                    >
                      {links.icon} {links.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  {links.links.map((link, index) => (
                    <AccordionPanel
                      pb={4}
                      pl={14}
                      key={index}
                      color={"white"}
                      onClick={onClose}
                    >
                      <Link href={link.path}>{link.name}</Link>
                    </AccordionPanel>
                  ))}
                </h2>
              </AccordionItem>
              
            </>
          ))}
          <AccordionItem border={"none"} color={"white"} pb={4} >
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      display="flex"
                      gap="3"
                      flex="1"
                      textAlign="left"
                      color={"white"}
                      onClick={()=>{ signOut({callbackUrl:"/"})}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                        />
                      </svg>
                      Sair
                    </Box>
                   
                  </AccordionButton>
                </h2>
              </AccordionItem>
        </Accordion>
      </nav>
    </div>
  );
};

export default Dash;
