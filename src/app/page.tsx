import React from 'react'
import { Button } from '@/components/ui/button'
import Users from '@/components/Users'
import EvalChart, { Evaluations } from '@/components/EvalChart'
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '@/lib/firebase';
import CreateClass from '@/components/CreateClass';



export default async function page() {
  const evaluationsCol = collection(db, 'evaluations');
  
  const evaluations = await getDocs(evaluationsCol);

  const evaluationsData:Evaluations[] | any = await evaluations.docs.map((doc) => doc.data());
  return (
    <div className='p-[3rem]'>
      <div className='flex w-full items-center justify-between mb-[2rem]'>
        <p className='font-semibold text-[1.5rem] text-[#13161D]'>Admin Dashboard</p>
        <CreateClass />
      </div>
      <EvalChart evalData={evaluationsData} />
      <Users />
    </div>
  )
}
