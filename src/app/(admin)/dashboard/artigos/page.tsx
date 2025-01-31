"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import { Paginationteste } from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import ArticleController from "@/hooks/article";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const ArticleHome = () => {
  const query = useSearchParams()
  const page = query.get("page") as string
  const [articles, setArticles] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [ totalPages , setTotalPages] = useState(0)
  
  useEffect(() => {
    ArticleController.getArticles(setArticles, setLoading,setTotalPages,page)
      .then((article) => article)
      .catch((error) => console.log(error));
  }, [page]);

  const handlFilter = async (filterValues?: any) => {
    const {
      authorValue,
      nameValue,
      companyValue,
      volumeValue,
      categoryValue,
      selectvalue,
    } = filterValues;

    const magazines = await fetch(
      `${baseURL}/articles?author=${authorValue}&name=${nameValue}&company=${companyValue}&volume=${volumeValue}&category=${categoryValue}&take=${selectvalue}`,
      {
        method: "GET",
      }
    );
    const response = await magazines.json();
    console.log(response)
    setArticles(response);

    return;
  };
  const deletArticle = async (id: any, name: any) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Deseja deletar o  Artigo ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#00FF00",
    });

    if (del.isConfirmed) {
      try {
        const deletArticle = await fetch(`${baseURL}/delet-article`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name }),
        });

        await Swal.fire(
          `Artigo ${name} deletado com sucesso!!`,
          "Clica no botão para continuar!",
          "success"
        );
        await ArticleController.getArticles(setLoading, setArticles,setTotalPages,page);
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar o artigo!",
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
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4 pb-10">
      <div className="pl-[8%] w-full h-[100px] flex items-center justify-around">
        <Filter onSubmitFilter={handlFilter} />
      </div>
      {articles.length === 0 ? (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">Nenhum artigo cadastrado!</p>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/artigos/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Novo Artigo
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="">
          <TableContainer width={"100%"}>
            <Table variant="simple">
              <TableCaption>Artigos Cadastrados</TableCaption>
              <Thead background={"#14b7a1"}>
                <Tr>
                  <Th color={"white"}>Image</Th>
                  <Th color={"white"}>Autor</Th>
                  <Th color={"white"}>Nome</Th>
                  <Th color={"white"}>Capa</Th>
                  <Th color={"white"}>Editora</Th>
                  <Th color={"white"}>Volume</Th>
                  <Th color={"white"}>Categorias</Th>
                  <Th color={"white"}>Preço</Th>
                  <Th color={"white"}>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {articles?.map((book: any, index: any) => (
                  <Tr>
                    <Td>
                      <img
                        src={book.cover}
                        alt={book.company}
                        className="w-14 h-10 object-contain"
                      />
                    </Td>
                    <Td>{book.author}</Td>
                    <Td>
                      <Text
                        maxW="180px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {book.name}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        maxW="70px"
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

                    <Td>
                      {Number(book?.price / 100).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Td>
                    <Td>
                      <div className="w-full h-full ">
                        <Link href={`/dashboard/artigos/${book.id}`}>
                          <button className="text-[#005183]">Editar</button>
                        </Link>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          deletArticle(book.id, book?.name);
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
          <div className="flex items-center justify-center">
          <Paginationteste totalPages={totalPages} pageParam="page"/>
          </div>
          
          <div className="w-full flex items-center justify-center mt-4">
            <Link href={"/dashboard/artigos/cadastrar"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Novo Artigo
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticleHome;
