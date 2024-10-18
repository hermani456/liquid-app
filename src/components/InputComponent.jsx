const InputComponent = ({name, description}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{name}</label>
      <input
        type="text"
        className="px-5 py-3 rounded-lg border text-sm max-w-[20rem] md:w-[20rem]"
        placeholder={description}
      />
    </div>
  );
};

export default InputComponent;
