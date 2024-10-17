const InfoCard = ({number, name, Icon, description}) => {
  return (
    <div className="w-[13rem] h-[8rem] rounded-md bg-white shadow-md p-4 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xl font-semibold">{number}</h6>
          <p>{name}</p>
        </div>
        <div>
          <Icon size={32} />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
