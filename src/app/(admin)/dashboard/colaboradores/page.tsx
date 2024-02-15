"use client";
import Header from "@/components/Header";
import { User } from "@/components/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
  Progress,
  Box,
} from "@chakra-ui/react";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
const Colaborades = () => {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEmployee();
  }, [query]);

  const searchData = () => {
    if (query) {
      // Funçao que busca o  usuario dentro do array de user  o some retorna apenas se um valor for verdadeiro  exemplo se buscar pelo primeiro nome  vai listar todos os user com o nome procurado
      const filterUser = employees?.filter((employee: User) => {
        const searchWords = query.toLowerCase().split(" ");
        return searchWords.some((word) =>
          employee.name.toLowerCase().includes(word)
        );
      });
      setEmployees(filterUser);
      return;
    }
  };
  const getEmployee = async () => {
    const res = await fetch(`${baseURL}/employees`, {
      method: "GET",
    });
    if(res.status === 200){
      const data = await res.json();
      setEmployees(data);
      setLoading(false)
      return;
    }
    
  };

  const deletEmployee = async (id: String, name: String) => {

    const delt = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja deletar o colaborador ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#333",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#d55",
    });
    if (delt.isConfirmed) {
      try {
        const res = await fetch(`${baseURL}/employee-delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        await Swal.fire(
          "Usuário deletado com sucesso!",
          "Clica no botão para continuar!",
          "success"
        );
        getEmployee();
        return;
      } catch (error) {
        console.log(error);

        await Swal.fire(
          "Erro ao deletar o usuário!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };

  if(loading){
    return(
      <section className="w-full h-screen flex items-center justify-center">
        <Spinner/>
      </section>
    )
   }
  return (
    <section className="w-full h-full  flex items-center flex-col px-4 gap-4">
      <Header
        search={searchData}
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        placeholder={"Buscar por nome.."}
      />

      {employees.length > 0 ? (
        <>
         <TableContainer width={"100%"}>
       
       <Table variant="simple" fontSize={14}>
         <TableCaption>Colaboradores</TableCaption>
         <Thead background={"#14b7a1"}>
           <Tr>
             <Th color={"white"}>Image</Th>
             <Th color={"white"}>Nome</Th>
             <Th color={"white"}>Email</Th>
             <Th color={"white"}>Telefone</Th>
             <Th color={"white"}>Profissão</Th>
             <Th color={"white"}>Revistas</Th>
             <Th color={"white"}>Artigos</Th>
             <Th color={"white"}>Ações</Th>
           </Tr>
         </Thead>
         <Tbody>
           {employees?.map((employee:any, index) => (
          
                 <Tr>
                 
                   <Td>
                     <img
                       src={employee.avatar}
                       alt={employee.name}
                       className="w-14 h-10 object-contain"
                     />
                   </Td>
                   <Td >
                     {employee.name}
                     </Td>
                   <Td>
                     {employee?.email}
                     </Td>
                   <Td>
                     {employee.phone}
                   </Td>
                   <Td>
                   {employee.profession}
                   </Td>
                   <Td>
                     {employee?.magazines?.length}
                   </Td>

                   <Td>
                    0
                   </Td>
                   <Td>
                   <div className="w-full h-full ">
                     <Link href={`/dashboard/colaboradores/${employee.id}`}>
                       <button className="text-[#005183]">Editar</button>
                     </Link>
                   </div>
                   <button
                     className="text-red-500"
                     onClick={() =>deletEmployee(employee.id, employee.name)}
                   >
                     Deletar
                   </button>
                   </Td>
                   
                   
                  
                 </Tr>
           
           ))}
         </Tbody>
       </Table>
        </TableContainer>
         
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/colaboradores/adicionar_colaborador"}>
              {" "}
              <button className="px-4 py-2 bg-[#14b7a1] rounded-md text-white">
                Adicionar Colaborador
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center ">
          <p className="text-2xl text-gray-400">Nenhum colaborador cadastrado !</p>
        </div>
      )}
    </section>
  );
};

export default Colaborades;
