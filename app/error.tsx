'use client';

import Nav from '@/components/Nav';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Nav/>
      <div className='h-[90vh] bg-black text-white flex justify-center items-center'>
        <h2 className='text-xl font-extrabold'>Oops. Something went wrong!</h2>
      </div>
    </>
  );
}
