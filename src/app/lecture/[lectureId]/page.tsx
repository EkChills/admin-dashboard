"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { query, getDocs, where, collection } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";

export default function SingleLecture({
  params,
}: {
  params: { lectureId: string };
}) {
  const [courseName, setCourseName] = useState<string>("");

  useEffect(() => {
    async function getLecture() {
      const q = query(
        collection(db, "classes"),
        where("cid", "==", params.lectureId)
      );

      const querySnapshot = await getDocs(q);
      const quer: { cid: string; courseTitle: string; lecturerName: string }[] | any  =
        querySnapshot.docs.map((doc) => doc.data());
      console.log(quer, params.lectureId);
      setCourseName(quer[0].courseTitle);
    }
    getLecture();
  }, [params.lectureId]);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-[100vh]">
        <div className="max-w-[20rem] mx-auto bg-white p-[3rem] rounded-lg shadow-lg">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={params.lectureId}
            viewBox={`0 0 256 256`}
          />
        </div>
        <h3 className="text-[3rem] leading-wider font-semibold mt-[1rem]">
          <span className="text-[3rem] font-bold tracking-wider">QR</span>Code
        </h3>
        <p className="text-[1.5rem] text-[#667085]">
          Scan the Qr code above to subscribe to this {courseName} lecture!
        </p>
      </div>
    </>
  );
}
