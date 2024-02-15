"use client";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EmployeeId = ({ params }: { params: { id: string } }) => {
  const slug = params.id;
  const [employee, setEmployee] = useState<any>({});
  const[loading,setLoading] = useState(true)
  useEffect(() => {
    getUserId();
  }, []);
  const getUserId = async () => {
    const get = await fetch(`${baseURL}/employee/${slug}`, {
      method: "GET",
    });
    if (get.status == 200) {
      const data = await get.json();
      setEmployee(data);
      setLoading(false)
    }
  };
  const date = new Date();
  if(loading){
    return(
        <section className="w-full h-screen flex items-center justify-center">
            <Spinner/>
        </section>
    )
  }
  return (
    <section className="w-full h-full flex items-center justify-center mt-16 px-4">
      <div className="w-full h-full flex-col-reverse md:flex md:flex-row justify-center">
        <div className="w-full md:w-[70%]">
          <div className="border-b-[1px] border-gray-400 flex gap-4">
            <Table variant="simple" py={20}>
              <TableCaption>Revistas Associadas ao colaborador</TableCaption>
              <Thead background={"#14b7a1"}>
                <Tr>
                  <Th color={"white"}></Th>
                  <Th color={"white"}>Nome</Th>
                  <Th color={"white"}>Volume</Th>
                  <Th color={"white"}>Editora</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {employee.magazines?.map((magazine: any, index: any) => (
                  <Tr>
                    <Td><img src={magazine.cover} alt={magazine.name} className="w-10 h-10 object-fill" /></Td>
                    <Td>{magazine.name}</Td>
                    <Td>{magazine.volume}</Td>
                    <Td>{magazine.company}</Td>
                   
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <form className="w-full py-4 ">
            <div className="w-full flex  gap-4">
           
              <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="">Pagar</label>
                <input
                  type="text"
                  className="w-full py-3 border-[1px] border-gray-400 rounded-md pl-2 outline-none"
                  placeholder="insira o valor a ser pago"
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center pt-4">
              <button className="w-40 bg-[#14b7a1] text-white rounded-md py-2">
                Pagar
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-[30%] flex flex-col gap-3 px-4">
          <h1 className="text-center">Dados Colaborador</h1>
          <div className="flex flex-col gap-2">
            <div className="w-full flex items-center justify-center">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-10 h-10 rounded-full object-fill"
              />
            </div>
            <h1>Nome: {employee?.name}</h1>
            <p>E-mail: {employee.email}</p>
            <p>Telefone: {employee.phone}</p>
            <p>Profissão: {employee.profession}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeId;
