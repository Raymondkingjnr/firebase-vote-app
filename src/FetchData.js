import { useEffect, useState } from "react";
import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export const FetchData = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState(null);
  //   const colRef = collection(db, "data");
  const colRef = collection(db, "data");

  const fetchdata = async () => {
    try {
      const snapShot = await getDocs(colRef);
      let fields = [];
      snapShot.docs.forEach((doc) => {
        fields.push({ ...doc.data(), id: doc.id });
      });
      setCandidates(fields);
      setLoading(false);
    } catch (error) {
      console.log("error fetching data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return { loading, candidates };
};
