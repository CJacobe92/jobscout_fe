import { Link } from "react-router-dom";

const HeaderWrapper = (Component, title) => {
  
  const Header = () => (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row items-center justify-between p-6 w-full h-[10vh] bg-primary text-white sticky top-0'>
        <h1 to={'/'} className='text-xl font-bold text-accent'>JobScout</h1>
        <h1 className='text-xl font-bold text-accent'>{title}</h1>
      </div>
      <Component />
    </div>
  )

  return Header
};

export default HeaderWrapper;
