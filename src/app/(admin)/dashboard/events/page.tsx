"use client";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ViewEvent = () => {
  useEffect(() => {
    getEvents();
  }, []);
  const [events, setEvents] = useState([]);
 const [loading ,setLoading] = useState(true)
  const currentDate: any = new Date();
  const getEvents = async () => {
    const request = await fetch(`${baseURL}/events`, { method: "GET" });
    const response = await request.json();
    setEvents(response);
    setLoading(false)
    return response;
  };
  const handleDeletEvent = async (id: number, name: string) => {

    const del = await Swal.fire({
      position: "center",
      title: "Tem certeza?",
      text: `Deseja deletar o  Evento ${name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d55",
      confirmButtonText: "Deletar",
      confirmButtonColor: "#00FF00",
    });

    if (del.isConfirmed) {
      try {
        const deletArticle = await fetch(`${baseURL}/events/delet/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        });

        await Swal.fire(
          `${name} deletado com sucesso!!`,
          "Clica no botão para continuar!",
          "success"
        );
        await getEvents();
      } catch (error) {
        console.log(error);
        //Exibe o modal de erro caso exista um
        await Swal.fire(
          "Erro ao deletar o evento!",
          "Clica no botão para continuar!",
          "error"
        );
      }
    }
  };
 if(loading)
 return(
<section className="w-full h-screen flex items-center justify-center">
    <Spinner/>
</section>
)
  return (
    <section className="w-[80%] mx-auto h-full">
      <h1>Exibir eventos</h1>
      {events.map((events: any, index: number) => (
        <div className="w-full  flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <h1 className="capitalize text-xl text-gray-500">{events.name}</h1>
            {currentDate.toLocaleDateString() ===
            new Date(Number(events.date_event)).toLocaleDateString() ? (
              <span>Encerrado</span>
            ) : (
              <span>
                Encerramento{" "}
                {new Date(Number(events.date_event)).toLocaleDateString()}
              </span>
            )}
            <Button onclick={() => handleDeletEvent(events.id, events.name)}>
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
            </Button>
          </div>

          <div className=" grid grid-cols-5 gap-4">
            {events.cover.map((cover: any, index: number) => (
              <div className="w-full flex flex-col gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
                <img src={cover.cover} alt={cover.name} />
                <p className=" px-2 py-1">{cover.name}</p>
                <span className="flex  px-2 py-1">
                  Votos: <span className="font-bold">{cover.countLike}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ViewEvent;
