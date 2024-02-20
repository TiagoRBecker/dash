import { useState } from "react";
import { Select, Input } from "@chakra-ui/react";

const Filter = ({
  onSubmitFilter,
}: any) => {
    const [selectvalue, setSelectValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [volumeValue, setVolumeValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const handleFilterSubmit = () => {
    // Aqui você poderia chamar a função de retorno de chamada
    onSubmitFilter({
      selectvalue,
      authorValue,
      nameValue,
      companyValue,
      volumeValue,
      categoryValue,
    });
    
  };

  return (
    <div className="w-full full flex items-center justify-around gap-2">
      <div className="w-[140px] flex flex-col items-center justify-center">
        <label className="text-left w-full">Mostrar</label>
        <Select
          placeholder="Mostrar"
          value={selectvalue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="8">8</option>
          <option value="15">15</option>
          <option value="45">45</option>
        </Select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Autor</label>
        <Input
          placeholder="Autores"
          value={authorValue}
          onChange={(e) => setAuthorValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Nome</label>
        <Input
          placeholder="Nomes"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Editora</label>
        <Input
          placeholder="Editora"
          value={companyValue}
          onChange={(e) => setCompanyValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Volume</label>
        <Input
          placeholder="Volumes"
          value={volumeValue}
          onChange={(e) => setVolumeValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Categoria</label>
        <Input
          placeholder="Categorias"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <label htmlFor="">Filtrar</label>
        <button
          className="px-4 py-2 bg-[#14b7a1] flex items-center justify-center rounded-md text-white"
          onClick={handleFilterSubmit}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filter;
