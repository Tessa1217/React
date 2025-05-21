const Header = () => {
  return (
    <header className='bg-blue-600 text-white'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='text-xl font-bold'>MyLogo</div>
        <nav>
          <ul className='flex space-x-6 text-sm font-medium'></ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
