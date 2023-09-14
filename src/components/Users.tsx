import React from "react";
import { getDocs, collection, DocumentData } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Users {
  id: string;
  department: string;
  displayName: string;
  matricNumber: string;
  email: string;
}

export default async function Users() {
  const usersCol = collection(db, "users");
  const users = await getDocs(usersCol);

  const usersData:Users[] | any =  users.docs.map((doc) => doc.data());

  return (
    <Table className={cn('border rounded-lg p-[1.25rem] mt-[5rem]')}>
      <TableCaption>A list of registered students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Matric Number</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Student Id</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          usersData.map((user:Users) => {
            return (

        <TableRow key={user.id}>
          <TableCell>{user.displayName}</TableCell>
          <TableCell>{user.matricNumber}</TableCell>
          <TableCell>{user.department}</TableCell>
          <TableCell>{user.id}</TableCell>
        </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}
