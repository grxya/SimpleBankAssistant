const Card = ({ title, icon, children, className = "" }) => (
  <div
    className={`rounded-xl shadow-md p-6 border border-surface-hover ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-full bg-lime-500/10 text-lime-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default Card;
