"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Avatar,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full  flex flex-col pb-10 gap-10 items-center px-4 ">
     
        <div className="w-full h-full flex items-center py-2  justify-end gap-5">
          <div className="flex items-center gap-3">
            <p className="cursor-pointer">
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            </p>
            <p className="cursor-pointer">
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
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </p>
          </div>
          <Avatar name={session?.user?.name as any} src={"/user.png"} />
      
        </div>
      
      <TableContainer width={"100%"}>
        <Table variant="simple">
          <TableCaption>Ultimos pedidos adicionados</TableCaption>
          <Thead background={"#14b7a1"}>
            <Tr>
              <Th color={"white"}>Nome</Th>
              <Th color={"white"}>Email</Th>
              <Th color={"white"}>Telefone</Th>
              <Th color={"white"}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <h1 className="w-full text-left text-lg text-gray-500">
        Dados na base cadastrados
      </h1>
      <div className="w-full    h-full grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-blue-300  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Colaboradores</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img
              src="/user-interface.png"
              alt="User"
              className="w-11 h-11 object-fill"
            />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-green-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Usúarios</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img src="/us.png" alt="User" className="w-11 h-11 object-fill" />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-blue-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Revistas</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img src="/book.png" alt="User" className="w-11 h-11 object-fill" />
          </div>
        </div>
        <div className="w-full px-4 py-10 flex flex-col md:flex-row md:flex md:items-center md:justify-center gap-4 bg-green-600  rounded-md text-white">
          <div className="w-full   flex flex-col items-center justify-center gap-2">
            <h1>Artigos</h1>
            <p className="w-8 h-8 rounded-full border-[1px] border-white flex items-center justify-center">
              1
            </p>
          </div>
          <div className="w-full items-center justify-center flex">
            <img
              src="/artigo.png"
              alt="User"
              className="w-11 h-11 object-fill"
            />
          </div>
        </div>
      </div>
      <h1 className="w-full text-left text-lg text-gray-500">
        Google Analitcs
      </h1>
      <StatGroup width={"100%"} display="flex" gap={5}>
        <Stat boxShadow={"base"} p={[3, 3]}>
          <StatLabel>Visitantes</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat boxShadow={"base"} p={[3, 3]}>
          <StatLabel>Clicks</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat boxShadow={"base"} p={[3, 3]}>
          <StatLabel>Dispositivos</StatLabel>
          <StatNumber>30</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            29.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </section>
  );
};

export default Dashboard;
