"use client";
import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useState } from "react";
const Teste = () => {
  const [selectEm, setSelectEm] = useState("");
  const [employeesID, setEmployeesID] = useState<any>([]);
  const employees = [
    {
      id: 1,
      name: "Tiago",
    },
    {
      id: 2,
      name: "Tiago Becker",
    },
    {
      id: 3,
      name: "Ramon",
    },
  ];
  const addEmployees =()=>{
    const filteredEmployee = employees.find((employee: any) => employee.id === Number(selectEm));
    if (filteredEmployee) {
        const checkIDArray =  employeesID.some((emp:any)=> emp.id === filteredEmployee.id)
        if(!checkIDArray){
            setEmployeesID((prev:any) => [...prev, filteredEmployee]);
        }
     
    }
  }
  const handleRemoveEmployee = (id:any) => {
    setEmployeesID((prev:any) => {
        const pos = prev.findIndex((item:any) => item.id === Number(id));
        const newArrayEmployee = prev.filter((value:any, index:any) => index !== pos);
  
 
        
  
        return newArrayEmployee;
      });
  };
  return (
    <div>
      <div className="w-full  flex  gap-2 items-center justify-between">
        <p>Colaboradores</p>
        <select
          className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
          value={selectEm}
          onChange={(e) => setSelectEm(e.target.value)}
        >
          <option value="">Selecionar</option>
          {employees.map((employee: any, index: any) => (
            <>
              <option key={index} value={employee.id}>
                {employee.name}
              </option>
            </>
          ))}
        </select>
        <button
          className="w-[50px]  bg-green-700 h-7 flex items-center justify-center"
          onClick={addEmployees}
        >
          V
        </button>
      </div>

      <HStack spacing={4}>
        {employeesID?.map((size: any, index: any) => (
          <Tag
            size={"sm"}
            key={index}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
          >
            <TagLabel>{size.name} </TagLabel>
            <TagCloseButton onClick={() => handleRemoveEmployee(size.id)} />
          </Tag>
        ))}
      </HStack>
    </div>
  );
};

export default Teste;
