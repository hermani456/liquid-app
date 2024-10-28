import Template from "@/components/pdf/Template";
import Button from "@/components/pdf/Button";

const page = () => {
  return (
    <div className="flex justify-between">
      <Template />
      <div className="flex justify-center items-center">
        <Button />
      </div>
    </div>
  );
};

export default page;
