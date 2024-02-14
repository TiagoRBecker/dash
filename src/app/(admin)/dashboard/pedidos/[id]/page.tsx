"use client";
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

const OrderId = ({ params }: { params: { id: string } }) => {
  const date = new Date();
  const [valueStatus, setvalueStatus] = useState("");
  const [idMail, setIdMail] = useState("");
  const handlePutOrder = () => {
    if (valueStatus === "enviado" && idMail === "") {
      alert("Insira o numero do rastreamento para o cliente");
    }
    alert("Ordem de serviço atualizada com sucesso!");
  };
  return (
    <section className="w-full  py-10 px-4">
      <div className="w-full h-full flex-col-reverse md:flex-row justify-center">
        <div className="w-full md:w-[70%]">
          <h1 className="py-2">Produtos para entrega</h1>
          <div className="border-b-[1px] border-gray-400 flex gap-4">
            <Table variant="simple" py={20}>
              <TableCaption>Detalhes do pedido</TableCaption>
              <Thead background={"#14b7a1"}>
                <Tr>
                  <Th color={"white"}>Data</Th>
                  <Th color={"white"}>Produto</Th>
                  <Th color={"white"}>Volume</Th>
                  <Th color={"white"}>Qtd</Th>
                  <Th color={"white"}>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{date.toLocaleDateString("pt-br")}</Td>
                  <Td>Pro Skate</Td>
                  <Td>volume 1</Td>
                  <Td>1</Td>
                  <Td>Á enviar</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
          <form className="w-full py-4 ">
          <div className="w-full flex  gap-4">
            <div className="w-[50%] flex flex-col gap-2">
            Atualizar Status
            <select className="w-full py-3 border-[1px] border-gray-400 rounded-md pl-2 outline-none">
              <option value="">Enviado</option>
              <option value="">Entregue</option>
            </select>
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <label htmlFor="">Codigo de Rastreio</label>
              <input type="text" className="w-full py-3 border-[1px] border-gray-400 rounded-md pl-2 outline-none" placeholder="Insira o codigo dos correios"/>
            </div>
           

          </div>
          <div className="w-full flex items-center justify-center pt-4">
          <button
          onClick={handlePutOrder}
          className="w-40 bg-[#14b7a1] text-white rounded-md py-2"
        >
          Atualizar Ordem
        </button>
          </div>
        
        </form>
        </div>
        <div className="w-full md:w-[30%] flex flex-col gap-3 px-4">
          <h1 className="text-center">Detalhes Comprador</h1>
          <div className="flex flex-col gap-2">
            <h1>Leonardo Paiva</h1>
            <p>(51) 9999999</p>
            <p>Rua Flores da cunha 593</p>
            <p>Bairro Floresta</p>
            <p>Cidade Porto Alegre</p>
            <p>Cep: 999999999</p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default OrderId;
