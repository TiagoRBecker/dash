"use client";
import Spinner from "@/components/Spinner";
import { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core/lib";
import "@react-pdf-viewer/core/lib/styles/index.css";
import CategoriesApi, { baseURL } from "@/components/utils/api";
import { optional } from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Magazine,  magazine } from "@/components/utils/validation";
import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

const EditMagazine = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,

    formState: { errors },
  } = useForm<Magazine>({
    mode: "all",
    resolver: zodResolver(magazine),
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<any>("");
  const [url, setUrl] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeesID, setEmployeesID] = useState<any>([]);
  const [errorPicture, setErrorPicture] = useState(false);
  const name  = getValues("name")  
  const id = watch("employeeId");
  const router = useRouter();
  const slug = params.id;
  useEffect(() => {
    getCategories()
    getByMagazine();
    getEmployee()
   
  }, []);
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = e.target.files as any;
    if (files) {
      // Se um arquivo foi fornecido, atualize a URL
      setAvatar(files[0]);
      setLoading(false);
    }

    return;
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as any;
    if (files) {
      // Se um arquivo foi fornecido, atualize a URL
      setUrl(files[0]);
      setLoading(false);
    }
  };
  const clear = () => {
    setUrl("");
  };
  const clearImage = () => {
    setAvatar("") as any;
  };
  

  const getByMagazine = async () => {
    const getArticle = await fetch(`${baseURL}/magazine/${slug}`, {
      method: "GET",
    });
    const response = await getArticle.json();
    Object.keys(response).forEach((key: any) => {
      setValue(key, response[key] as any);
    });
  
    setLoading(false)
    return
  };
  const getCategories = async ()=>{
    const getCat = await fetch(`${baseURL}/categories`,{
      method:"GET"
    })
    const response = await getCat.json()
    setCategories(response)
  }
 
  const getEmployee = async () => {
    const employee = await fetch(`${baseURL}/employees`, {
      method: "GET",
    });
    const response = await employee.json();
    setEmployees(response);
    return;
  };
  const addEmployees = () => {
    const filteredEmployee = employees.find(
      (employee: any) => employee.id === Number(id)
    ) as any;
    if (filteredEmployee) {
      const checkIDArray = employeesID.some(
        (emp: any) => emp.id === filteredEmployee.id
      );
      if (!checkIDArray) {
        setEmployeesID((prev: any) => [...prev, filteredEmployee]);
      }
    }
  };
  const handleRemoveEmployee = (id: any) => {
    setEmployeesID((prev: any) => {
      const pos = prev.findIndex((item: any) => item.id === Number(id));
      const newArrayEmployee = prev.filter(
        (value: any, index: any) => index !== pos
      );

      return newArrayEmployee;
    });
  };
  const onSubmit = handleSubmit(async (data: any) => {
    const formData = new FormData();
    formData.append("cover_file", avatar);
    formData.append("pdf_file", url);

    for (const key in data) {
      formData.append(key, data[key] as any);
    }
    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você adicionar editar a  Revista ${data?.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00FF00",
    });
    if (del.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!

        const updateArticle = await fetch(`${baseURL}/update-magazine/${slug}`, {
          method: "POST",

          body: formData,
        });

        if (updateArticle.status === 200) {
          await Swal.fire(
            "Revista atualizada com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );
          router.push("/dashboard/revistas")

          return;
        }
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao atualizar a revista!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  });
  //Loading pagina
  if(loading){
    return(
      <section className="w-full h-screen flex items-center justify-center">
      <Spinner/>
     </section>
    )

   
  }
 
  return (
    <section className="w-full h-full flex items-center justify-center  ">
      <form
        className="w-[80%] mx-auto   rounded-md  py-2 px-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        {" "}
        <h1 className="text-xl text-center text-gray-400 uppercase py-4">
          Editar Revista {name}
        </h1>
        <div className="flex">
          <div className="w-[65%] flex flex-col gap-3  px-4 py-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Autor Revista</label>
              <input
                {...register("author")}
                type="text"
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Autor"
              />
            </div>
            {errors.author && (
              <p className="text-red-400 text-sm">{errors.author.message}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Titulo Revista</label>
              <input
                {...register("name")}
                type="text"
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Título"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Volume Revista</label>
              <input
                {...register("volume")}
                type="text"
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Volume"
              />
            </div>
            {errors.volume && (
              <p className="text-red-400 text-sm">{errors.volume.message}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Editora Revista</label>
              <input
                {...register("company")}
                type="text"
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Editora"
              />
            </div>
            {errors.company && (
              <p className="text-red-400 text-sm">{errors.company.message}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Preço</label>
              <input
                {...register("price")}
                type="text"
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Preço"
              />
            </div>
            {errors.price && (
              <p className="text-red-400 text-sm">
                {errors.price.message as any}
              </p>
            )}

            <div className="w-full  flex  items-center justify-between gap-2">
              <p className="text-left w-full">Categorias Revista</p>
              <select
                className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                {...register("categoryId")}
              >
                <option value="">Selecionar</option>
                {categories.map((cat: any, index: any) => (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoryId && (
              <p className="text-red-400 text-sm">
                {errors.categoryId.message as any}
              </p>
            )}
            <div className="w-full  flex  gap-2 items-center justify-between">
              <p className="text-left w-full">
                Relacionar colaborador a Revista
              </p>
              <div className="flex w-full gap-2">
                <select
                  className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                  {...register("employeeId")}
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
                 type="button"
                  className="w-[50px]  bg-[#14b7a1] h-7 flex items-center justify-center text-white"
                  onClick={addEmployees}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-wrap">
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
                    <TagCloseButton
                      onClick={() => handleRemoveEmployee(size.id)}
                    />
                  </Tag>
                ))}
              </HStack>
            </div>
          </div>

          <div className="w-full md:w-[35%] h-full flex flex-col   gap-3 px-4 py-4">
            <div className="flex gap-3">
              <div className="w-full h-full">
                <div className="w-full  h-full flex flex-col gap-6 items-center justify-center">
                  <div className=" w-full h-52 bg-[#14b7a1] rounded-md flex items-center justify-center">
                    <input type="file" hidden id="file" onChange={upload} />
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        {avatar ? (
                          <div className="w-full h-full flex items-center justify-center relative">
                            <img
                              src={URL.createObjectURL(avatar)}
                              alt=""
                              className="w-full h-52 px-2 py-2 object-fill"
                            />
                            <button
                              onClick={clearImage}
                              className="absolute top-2 right-4"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className=" w-full h-44 bg-[#14b7a1] rounded-md flex items-center justify-center ">
                            <label
                              htmlFor="file"
                              className="   px-3 py-1  text-white rounded-md  text-sm  cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-12 h-12 text-white"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                />
                              </svg>
                            </label>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
                  <div className="mt4" style={{ height: "200px" }}>
                    {url ? (
                      <div className="w-full h-52 relative">
                        <Viewer fileUrl={URL.createObjectURL(url as any)} />
                        <button
                          onClick={clear}
                          className="absolute top-2 right-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className=" w-full h-52 bg-[#14b7a1] rounded-md flex items-center justify-center">
                        <input
                          type="file"
                          accept=".pdf"
                          id="pdf_file"
                          hidden
                          onChange={onChange}
                        />
                        <label htmlFor="pdf_file" className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-12 h-12 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                            />
                          </svg>
                        </label>
                      </div>
                    )}
                  </div>
                </Worker>
              </div>
            </div>
            {errorPicture && (
              <p className="text-red-600 text-sm">
                Adicione os itens PDF e Imagem
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Descriçao</label>
              <textarea
                {...register("description")}
                className="w-full h-24 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
                placeholder="Descriçao"
              />
            </div>
            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full  rounded-md flex items-center justify-center">
          <button
            className="w-40 py-2  bg-[#14b7a1] rounded-md  text-white "
            type="submit"
          >
            Editar Revista
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditMagazine;
