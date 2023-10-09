import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./config";
import { doc, getDoc } from "firebase/firestore";

export const PaymentPage = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "data", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          setData(docSnapshot.data());
        }
      } catch (error) {
        console.log("error getting data", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="single-data">
      <div className="img-container">
        <img src={data?.imgUrl} alt="" />
      </div>
      <p>{data?.name}</p>
      <Link to={"/"}>Go back</Link>
    </div>
  );
};
