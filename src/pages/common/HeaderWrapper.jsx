import { Link } from "react-router-dom";

const HeaderWrapper = (Component, title) => {
  
  const Header = () => (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row items-center justify-between p-6 w-full h-[10vh] text-gray-600 border-b border-gray-300 shadow-md'>
        <h1 className='text-xl font-bold'>{title}</h1>
      </div>
      <Component />
    </div>
  )

  return Header
};

export default HeaderWrapper;
