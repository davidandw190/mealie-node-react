import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className='bg-orange-500 py-10'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <span className='text-3x1 text-white font-bold tracking-tight'>Mealie.io</span>
        <span className='text-white font-bold tracking-tight flex gap-4'>
          <span>Privacy Politics</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
