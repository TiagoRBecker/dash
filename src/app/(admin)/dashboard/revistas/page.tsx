"use client";

import Link from "next/link";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { baseURL } from "@/components/utils/api";
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
  Text,
 
} from "@chakra-ui/react";
import Filter from "@/components/Filter";

const Magazines = () => {
  const [loading, setLoading] = useState(true);
  const [magazines, setMagazine] = useState([]);
  useEffect(() => {
    getMagazines();
  }, []);


  const getMagazines = async () => {
    const magazines = await fetch(`${baseURL}/magazines`, {
      method: "GET",
    });
    const response = await magazines.json();
    setMagazine(response);
    setLoading(false);
    return;
  };
  const handlFilter = async (filterValues?:any)=>{
    
    const {authorValue,nameValue,companyValue,volumeValue,categoryValue,selectvalue} = filterValues
     
    const magazines = await fetch(`${baseURL}/magazines?author=${authorValue}&name=${nameValue}&company=${companyValue}&volume=${volumeValue}&category=${categoryValue}&take=${selectvalue}`, {
      method: "GET",
    
      
    });
    const response = await magazines.json()
     setMagazine(response)
    
    return
  }
  const deletMagazine = async (id: any, name: any) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Deseja deletar a Revista ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#00FF00",
    });

    if (del.isConfirmed) {
      try {
        const deletArticle = await fetch(`${baseURL}/delet-magazine`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name }),
        });

        await Swal.fire(
          `Revista ${name} deletado com sucesso!!`,
          "Clica no botão para continuar!",
          "success"
        );
        await getMagazines();
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar o Revista!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };
  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4 overflow-y-auto">
      <div className="pl-[8%] w-full h-[100px] flex items-center justify-around">
      <Filter onSubmitFilter={handlFilter} />
      </div>
     

      {magazines && magazines.length > 0 ? (
        <>
          <TableContainer width={"99%"}>
            <Table variant="simple">
              <TableCaption>Revistas Cadastradas</TableCaption>
              <Thead background={"#14b7a1"}>
                <Tr>
                  <Th color={"white"}>Image</Th>
                  <Th color={"white"}>Autor</Th>
                  <Th color={"white"}>Nome</Th>
                  <Th color={"white"}>Nome Capa</Th>
                  <Th color={"white"}>Editora</Th>
                  <Th color={"white"}>Volume</Th>
                  <Th color={"white"}>Categorias</Th>
                  <Th color={"white"}>Artigos</Th>
                  <Th color={"white"}>Preço</Th>
                  <Th color={"white"}>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {magazines?.map((book: any, index) => (
                  <Tr>
                    <Td>
                      <img
                        src={book.cover}
                        alt={book.company}
                        className="w-14 h-10 object-contain"
                      />
                    </Td>
                    <Td>{book.author}</Td>
                    <Td>{book.name}</Td>
                    <Td>
                    <Text
                        maxW="100px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      > 
                      {book?.capa_name}
                        </Text>
                     </Td>
                    <Td>{book?.company}</Td>
                    <Td>{book.volume}</Td>
                    <Td>{book?.Category?.name}</Td>
                    <Td>{book?.article?.length}</Td>
                    <Td>
                      {Number(book?.price / 100).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                    <Td>
                      <div className="w-full h-full ">
                        <Link href={`/dashboard/revistas/${book.id}`}>
                          <button className="text-[#005183]">Editar</button>
                        </Link>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          deletMagazine(book.id, book?.name);
                        }}
                      >
                        Deletar
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <div className="w-full flex items-center justify-center mt-4">
            <Link href={`/dashboard/revistas/cadastrar`}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Nova Revista
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">Nenhuma revista cadastrada!</p>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/revistas/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Nova Revista
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Magazines;
