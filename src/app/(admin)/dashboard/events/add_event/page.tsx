"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { baseURL } from "@/components/utils/api";
import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AddEvent = () => {
  const router = useRouter();
  useEffect(() => {
    getCovers();
  }, []);
  const [name, setName] = useState("");
  const [value, onChange] = useState<any>(new Date());
  const [covers, setCovers] = useState([]);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [loading ,setLoading] = useState(true)
  const handleCheckboxChange = (value: string) => {
    // Verifica se o valor já está presente no array de valores selecionados
    if (selectedValues.includes(value)) {
      // Se já estiver presente, remove o valor do array
      setSelectedValues(selectedValues.filter((val: any) => val !== value));
    } else {
      // Caso contrário, adiciona o valor ao array
      setSelectedValues([...selectedValues, value]);
    }
  };
  const handleDateChange = (date: Date | [Date, Date] | null) => {
    onChange(date);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Obter a data atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Obter a data selecionada
    const selectedDate = value || (new Date() as any); // Usar a data atual se nenhuma data foi selecionada
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    // Validar se a data selecionada é menor que a data atual
    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth) ||
      (selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        selectedDay < currentDay)
    ) {
      alert("A data escolhida e menor que a data atual");
      // Adicione sua lógica de tratamento de erro aqui, se necessário
      return;
    }
    if (selectedValues.length === 0) {
      alert("Necessário escolher ao menos 1 capa");
      return;
    }
    const date_event = value?.getTime();
    const addEvent = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Você deseja adicionar um novo  ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Adicionar",
      confirmButtonColor: "#00FF00",
    });
    if (addEvent.isConfirmed) {
      try {
        //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!

        const addArticle = await fetch(`${baseURL}/create-events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedValues, name, date_event }),
        });

        if (addArticle.status === 200) {
          await Swal.fire(
            "Evento criado com sucesso!!",
            "Clica no botão para continuar!",
            "success"
          );

          router.push("/dashboard/events");
          return;
        }
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao criar o evento!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };
  const getCovers = async () => {
    const request = await fetch(`${baseURL}/covers`, {
      method: "GET",
    });
    const response = await request.json();
   
    setCovers(response);
    setLoading(false)
    return;
  };
  if(loading)
  return(
 <section className="w-full h-screen flex items-center justify-center">
     <Spinner/>
 </section>
 )
  return (
    <section className="w-full h-screen mt-16">
      <form
        className="w-[80%] mx-auto flex flex-col gap-4   rounded-md  py-2 px-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] "
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl text-center text-gray-400 uppercase py-4">
          Cadastrar evento
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Evento Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm pl-2"
            placeholder="Nome evento"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Data Evento</label>
          <DatePicker
            onChange={handleDateChange as any}
            value={value}
            className="w-full h-7 outline-none border-[1px] border-gray-400 rounded-sm "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Capas do evento</label>
        <CheckboxGroup colorScheme="green">
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {covers.map((cover: any, index) => (
              <div
                key={cover.id}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={cover.cover}
                  alt={cover.name}
                  className="w-28 h-36 object-fill"
                />
                <Checkbox
                  position={"absolute"}
                  top={2}
                  right={2}
                  border={"green"}
                  value={String(cover.id)}
                  onChange={(e) => handleCheckboxChange(e.target.value)}
                >
                  {/* Ícone do checkbox */}
                </Checkbox>
              </div>
            ))}
          </Stack>
        </CheckboxGroup>
        </div>
        <div className="w-full  rounded-md flex items-center justify-center">
          <button
            className="w-40 py-2  bg-[#14b7a1] rounded-md  text-white "
            type="submit"
          >
            Criar Evento
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddEvent;
