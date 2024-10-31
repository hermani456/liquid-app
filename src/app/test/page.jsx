"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkers } from "@/utils/fetchFuntions";

const Page = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["workers"],
    queryFn: fetchWorkers,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      {data?.map((worker) => (
        <div key={worker.id}>{worker.name}</div>
      ))}
    </div>
  );
};

export default Page;
