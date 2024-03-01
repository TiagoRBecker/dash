import Spinner from "@/components/Spinner";
import { baseURL } from "@/components/utils/api";
import { Suspense } from "react";

const getBanner = async () => {
  const request = await fetch(`${baseURL}/banners`, {
    method: "GET",
    cache: "no-cache",
  });
  const response = await request.json();
  return response;
};
const BannersList = async () => {
  const data = await getBanner();

  return (
    <Suspense fallback={<Spinner />}>
      <section className="w-[80%] min-h-screen flex flex-col  gap-3 mx-auto">
        <h1>Banners Cadastrados</h1>
        <div className="w-full grid grid-cols-1">
          {data.map(
            (
              banner: { id: number; name: string; cover: string },
              index: number
            ) => (
              <div className="w-full  flex flex-col gap-1 " key={index}>
                <img
                  src={banner.cover}
                  alt={banner.name}
                  className="w-full h-[250px] object-fill"
                />
                <span className="text-xl text-gray-400">{banner.name}</span>
              </div>
            )
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default BannersList;
