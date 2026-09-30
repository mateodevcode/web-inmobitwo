const Columna = ({ heading, links }) => {
  return (
    <div>
      <h4 className="text-sm font-semibold text-segundo mb-4 tracking-wide font-poppins">
        {heading}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[15px] text-decimo hover:text-decimo/80 hover:underline whitespace-nowrap"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Columna;
