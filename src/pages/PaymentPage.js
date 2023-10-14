import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../configs/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { closePaymentModal } from "flutterwave-react-v3";
import { PaymentForm } from "../components/PaymentForm";
import { PaymentConfig } from "../configs/PaymentConfig";

export const PaymentPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    No_votes: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchSingleData = async () => {
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
    fetchSingleData();
  }, [id]);

  const handlePaymentCallback = (response) => {
    console.log(response);

    const paymentSuccssfull = response?.status === "completed";

    if (paymentSuccssfull) {
      const candidateId = id;
      const numberOfVote = formData?.No_votes;

      console.log(candidateId);

      const candidateRef = doc(db, "data", candidateId);

      getDoc(candidateRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          let currentVote = docSnapshot.data().votes;
          const currentVoteCount = Number(currentVote);

          console.log("Current Votes:", currentVoteCount);
          const newVotes = Number((currentVote += numberOfVote));

          console.log(newVotes);

          updateDoc(candidateRef, {
            votes: Number(newVotes),
          })
            .then(() => {
              console.log("Votes Updated!");
            })
            .catch((error) => {
              console.log("error adding votes :", error);
            });
        }
      });
    }

    closePaymentModal();
  };

  return (
    <div className="single-data">
      <div className="img-container">
        <img src={data?.imgUrl} alt="" />
      </div>
      <p>{data?.name}</p>
      <PaymentForm formData={formData} handleChange={handleChange} />
      <div className="btns">
        <PaymentConfig
          formData={formData}
          handlePaymentCallback={handlePaymentCallback}
        />
        <button>
          <Link to={"/"}>Go Back.</Link>
        </button>
      </div>
    </div>
  );
};

// (response) => {
//   console.log(response);
//   closePaymentModal();
// }
