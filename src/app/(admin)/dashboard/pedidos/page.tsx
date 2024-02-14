import Header from "@/components/Header";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";

const OrderAlls = () => {
  const date = new Date();
  return (
    <section className="w-full h-full pb-10 ">
      <Header />
      <TableContainer width={"100%"}>
        <Table variant="simple" py={20}>
          <TableCaption>Ultimos pedidos adicionados</TableCaption>
          <Thead background={"#14b7a1"}>
            <Tr>
              <Th color={"white"}>Data</Th>
              <Th color={"white"}>Nome</Th>
              <Th color={"white"}>Email</Th>
              <Th color={"white"}>Telefone</Th>
              <Th color={"white"}>Status</Th>
              <Th color={"white"}>Açoes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{date.toLocaleDateString("pt-br")}</Td>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
              <Td>
                <Link href={`/dashboard/pedidos/1`}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>{date.toLocaleDateString("pt-br")}</Td>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
              <Td>
                <Link href={`/dashboard/pedidos/1`}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>{date.toLocaleDateString("pt-br")}</Td>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
              <Td>
                <Link href={`/dashboard/pedidos/1`}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                </Link>
              </Td>
            </Tr>
            <Tr>
              <Td>{date.toLocaleDateString("pt-br")}</Td>
              <Td>Leoardo Paiva</Td>
              <Td>leoanardo@gmail.com</Td>
              <Td>51 999-999-999</Td>
              <Td>Enviado</Td>
              <Td>
                <Link href={`/dashboard/pedidos/1`}>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default OrderAlls;
