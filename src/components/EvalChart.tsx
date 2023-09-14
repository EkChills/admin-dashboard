"use client"

import { db } from '@/lib/firebase';
import { ChartData } from 'chart.js';
import { DocumentData, collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2'

export interface Evaluations {
  courseCode:string;
  lecturerMaterial:string;
  lecturerName:string;
  lecturerPresence:string;
  lecturerPuntuality:string;
  lecturerRate:number ; 
  matricNumber:string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function EvalChart({evalData}:{evalData:Evaluations[]}) {

  // useEffect(() => {
  //  async function getEvaluations() {
  //     const evaluationsCol = await collection(db, 'evaluations');
  //     console.log(evaluationsCol);
      
  //     const evaluations = await getDocs(evaluationsCol);
    
  //     const evaluationsData:Evaluations[] | DocumentData[] = await evaluations.docs.map((doc) => doc.data());
  //     setEvalData(evaluationsData)
  //   }
  //   getEvaluations()
  // },[])
  
  const totalLecturerPresence = evalData?.reduce((total, item) => {
    if(item.lecturerPresence === 'yes'){
      return total + 1
    }
    return total
  },0 ) / evalData.length * 100
  
  const totalLecturerPunctuality = evalData?.reduce((total, item) => {
    if(item.lecturerPuntuality === 'yes'){
      return total + 1
    }
    return total
  },0 ) / evalData.length * 100

  const totalLecturerMaterial = evalData?.reduce((total, item) => {
    if(item.lecturerMaterial === 'yes'){
      return total + 1
    }
    return total
  },0 ) / evalData.length * 100

  const totalLecturerRate = evalData?.reduce((total, item) => {
 
    return total + item.lecturerRate! 

   
  },0 ) / (evalData.length * 5 * 100) 
  


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Lecturer Evaluation',
    },
  },
};
  

  const data:ChartData<"bar", (number | [number, number] | null)[], unknown> = {
    labels:['lecturer presence', 'lecturer rate','lecturer punctuality','lecturer material'],
    datasets:[
      {
        label:'',
         data:[totalLecturerPresence,totalLecturerRate,totalLecturerPunctuality,totalLecturerMaterial],
         backgroundColor: '#5C85FF',
      }
    ],
  }

  console.log(totalLecturerPunctuality,  totalLecturerRate, totalLecturerPresence);
  
  

  return (
    <div className=''>
      <div className='max-w-[50rem] mx-auto'>
      <Bar
      data={data}
      options={options}
       />

      </div>

    </div>
  )
}
