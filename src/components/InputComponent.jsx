const InputComponent = ({name, description, type="text"}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{name}</label>
      <input
        type={type}
        className="px-5 py-3 rounded-lg border text-sm w-64"
        placeholder={description}
      />
    </div>
  );
};

export default InputComponent;
