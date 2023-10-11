import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { Form } from "react-bootstrap";

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

  const config = {
    public_key: "FLWPUBK_TEST-8cb54c76502ce534e33756e2ec17c219-X",
    tx_ref: Date.now(),
    amount: 50 * formData.No_votes,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: formData.email,
      phone_number: formData.phoneNumber,
      name: formData.name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

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
          let currentVote = docSnapshot.data().votes || "0";
          const currentVoteCount = Number(currentVote);

          console.log("Current Votes:", currentVoteCount);

          updateDoc(candidateRef, {
            votes: currentVoteCount + numberOfVote,
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
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of votes</Form.Label>
          <Form.Control
            type="number"
            name="No_votes"
            value={formData.No_votes}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <div className="btns">
        <button
          onClick={() => {
            handleFlutterPayment({
              callback: handlePaymentCallback,
              onClose: () => {
                console.log("You close me ooo");
              },
              catch(error) {
                console.log(error);
              },
            });
          }}
        >
          Testing FW Payment
        </button>
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
// },
