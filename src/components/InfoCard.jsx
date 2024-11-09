const InfoCard = ({ number, name, Icon, description, bgColor, textColor }) => {
  return (
    <div className="flex-1 min-w-[17rem] h-[9rem] rounded-md bg-secondary shadow-md p-4 space-y-5 cursor-pointer hover:scale-105  transition-all">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xl font-semibold">{number}</h6>
          <p>{name}</p>
        </div>
        <div className="flex justify-center items-center size-12 rounded-full"
        style={{backgroundColor: bgColor, color: textColor}}
        >
          <Icon size={32} />
        </div>
      </div>
      <div>
        <p className="text-xs text-chart-1">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
