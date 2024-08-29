import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="absolute top-0 left-0 w-[250px] h-[95vh] m-4 p-4 bg-gradient-to-br from-[#53adef] to-[#0e7ecf] rounded-2xl">
      <h1 className="text-white font-bold text-3xl text-center">Tanya.ai</h1>

      <Sidebar.Menu>
        <Sidebar.Button href="#" icon="/icons/math.svg">
          Matematika
        </Sidebar.Button>
        <Sidebar.Button href="#" icon="/icons/math.svg">
          Sejarah
        </Sidebar.Button>
        <Sidebar.Button href="#" icon="/icons/math.svg">
          B.Indonesia
        </Sidebar.Button>
        <Sidebar.Button href="#" icon="/icons/math.svg">
          Ekonomi
        </Sidebar.Button>
        <Sidebar.Button href="#" icon="/icons/math.svg">
          Lainnya
        </Sidebar.Button>
      </Sidebar.Menu>
    </div>
  );
};

Sidebar.Menu = ({ children }: any) => {
  return <div className="grid grid-cols-1 grid-rows-5 mt-20">{children}</div>;
};

Sidebar.Button = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: string;
}) => {
  return (
    <Link
      to={href}
      className="px-4 py-4 flex flex-row gap-4 bg-white text-[#0E7ECF] rounded-xl font-semibold text-base mb-4">
      <img src={icon} alt="math icon" />
      <span>{children}</span>
    </Link>
  );
};

export default Sidebar;
