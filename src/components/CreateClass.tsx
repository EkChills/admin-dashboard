"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getFirestore, collection, getDoc } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import { toast } from "./ui/use-toast";

export default function CreateClass() {
  const [courseTitle, setCourseTitle] = useState<string>('')
  const [loading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  async function addClass() {
    try {
      setIsLoading(true)
      console.log("ran");
      const randId = uuid()
      const docRef = await addDoc(collection(db, "classes"), {
        courseTitle: courseTitle,
        cid:randId,
        lecturerName: "Dr A.N Babatunde",
      });
      toast({
        description:'The lecture has been created'
      })
      router.push(`/lecture/${randId}`)
      console.log(docRef.id);
      
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Lecture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Lecture</DialogTitle>
          <DialogDescription>
            Create a new lecture to generate your Qr code.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Course Title
            </Label>
            <Input id="course" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} className="col-span-3 border outline-none" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={addClass}>{loading ? <Image width={25} height={25} alt="spinner" src="/spinner.svg" /> :  'Save changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
