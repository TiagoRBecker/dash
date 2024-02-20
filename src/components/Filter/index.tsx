import { Select,Input } from "@chakra-ui/react";

const Filter = () => {
  return (
    <div className="w-full full flex items-center justify-around gap-2">
        <div className="w-[140px] flex flex-col items-center justify-center">
            <label className="text-left w-full">Mostrar</label>
        <Select placeholder="Mostrar">
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
        </Select>
        </div>
        <div className="flex flex-col">
            <label htmlFor="">Autor</label>
            <Input placeholder="Autores"/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="">Nome</label>
            <Input placeholder="Nomes"/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="">Editora</label>
            <Input placeholder="Editora"/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="">Volume</label>
            <Input placeholder="Volumes"/>
        </div>
        <div className="flex flex-col">
            <label htmlFor="">Categoria</label>
            <Input placeholder="Categorias"/>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
            <label htmlFor="">Filtrar</label>
        <button className="px-4 py-2 bg-[#14b7a1] flex items-center justify-center rounded-md text-white">Filtrar</button>
        </div>
       
     
    </div>
  );
};

export default Filter;
