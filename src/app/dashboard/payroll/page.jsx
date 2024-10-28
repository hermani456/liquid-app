import Template from "@/components/pdf/Template";
import Button from "@/components/pdf/Button";

const page = () => {
  return (
    <div className="flex justify-between">
      <div className="p-10 bg-white flex justify-center items-center">
        <Template />
      </div>
      <div className="flex justify-center items-center">
        <Button />
      </div>
    </div>
  );
};

export default page;
