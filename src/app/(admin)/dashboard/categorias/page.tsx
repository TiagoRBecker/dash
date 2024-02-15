"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { Categories } from "@/components/types";
import { baseURL } from "@/components/utils/api";
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const Config = () => {
  useEffect(() => {
    getCategories();
  }, []);
  const [categories, setCategorie] = useState<any>([]);
  const [subCat, setSubCat] = useState("");
  const [ loading ,setLoading] = useState(true)
  const searchData = () => {};
  const getCategories = async () => {
    const get = await fetch(`${baseURL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (get.status === 200) {
      const response = await get.json();

      setCategorie(response);
      setLoading(false)
    }
    return;
  };

  const deletCat = async (id: string, name: String) => {
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja deletar está a categoria ${name} `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#333",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#d55",
    });
    if (del.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
        const deletCat = await fetch(`${baseURL}/delet-category`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (deletCat.status === 200) {
          await Swal.fire(
            "Categoria deletada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );
          await getCategories();
          return;
        }
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar a categoria!",
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
    <section className="w-full h-full flex   flex-col items-center px-4 gap-4">
      <Header search={searchData} />
      {categories.length === 0 ? (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-400">Nenhum categoria cadastrada!</p>
          <div className="w-full flex items-center justify-center">
            <Link href={"/dashboard/categorias/adicionar_categoria"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adiconar Nova Categoria
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full">
        
          <TableContainer width={"100%"}>
       
       <Table variant="simple">
         <TableCaption>Categorias Cadastradas</TableCaption>
         <Thead background={"#14b7a1"}>
           <Tr>
             <Th color={"white"}>Categorias</Th>
             <Th color={"white"}>Revistas</Th>
             <Th color={"white"}>Artigos</Th>
             <Th color={"white"}>Ações</Th>
           </Tr>
         </Thead>
         <Tbody>
           {categories?.map((cat:any, index:any) => (
          
                 <Tr>
                 
                 
                   <Td>
                     {cat.name}
                     </Td>
                   <Td>
                     {cat.magazine.length}
                     </Td>
                   <Td>
                     {cat.article.length}
                   </Td>
                  
                  
                   
                   <Td>
                   <div className="w-full h-full ">
                     <Link href={`/dashboard/categorias/${cat.id}`}>
                       <button className="text-[#005183]">Editar</button>
                     </Link>
                   </div>
                   <button
                     className="text-red-500"
                     onClick={() => {
                       deletCat(cat.id, cat?.name);
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
            <Link href={"/dashboard/categorias/adicionar_categoria"}>
              <button className="px-4 py-2 bg-[#14b7a1]  rounded-md text-white">
                Adicionar Categoria
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Config;
