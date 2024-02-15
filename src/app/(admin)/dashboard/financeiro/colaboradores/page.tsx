"use client";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import {
  Progress,
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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EmployeeFinance = () => {
  useEffect(() => {
    getEmployee();
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const getEmployee = async () => {
    const res = await fetch(`${baseURL}/employees`, {
      method: "GET",
    });
    if (res.status === 200) {
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
      return;
    }
  };
  const searchData = () => {};
 

  if (loading) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center px-4 ">
        <Spinner />
      </section>
    );
  }
  return (
    <section className="w-full h-full flex  flex-col items-center px-4 gap-4">
      <Header search={searchData} />
      <div className="w-full">
        <TableContainer width={"100%"}>
          <Table variant="simple">
            <TableCaption>Colaboradores á pagar</TableCaption>
            <Thead background={"#14b7a1"}>
              <Tr>
                <Th color={"white"}>Foto</Th>
                <Th color={"white"}>Nome</Th>
                <Th color={"white"}>Profissão</Th>

                <Th color={"white"}>Revistas Parceiras</Th>

                <Th color={"white"}>Pago</Th>
                <Th color={"white"}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees?.map((employee: any, index) => (
                <Tr>
                  <Td>
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="w-14 h-10 object-contain"
                    />
                  </Td>
                  <Td>{employee.name}</Td>
                  <Td>{employee.profession}</Td>

                  <Td>{employee?.magazines?.length}</Td>

                  <Td>0</Td>
                  <Td>
                    <div className="w-full h-full ">
                      <Link href={`/dashboard/financeiro/colaboradores/${employee.id}`}>
                        <button className="text-[#005183]">Pagar</button>
                      </Link>
                    </div>
                   
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default EmployeeFinance;
