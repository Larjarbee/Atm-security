import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from '@firebase/firestore';
import { db } from '../store/firebase-config';

export const useFetch = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountDeposit, setAmountDeposit] = useState(0);

  const customersCollection = collection(db, 'customers');

  useEffect(() => {
    setLoading(true);
    const fetchCustomer = async () => {
      const data = await getDocs(customersCollection);
      setCustomer(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    setLoading(false);
    fetchCustomer();
  }, []);

  const updateAmount = async (id, balance) => {
    const customerDoc = doc(db, 'customers', id);
    const newAmount = { balance: balance - +amount };
    await updateDoc(customerDoc, newAmount);
  };
  const updateAmountDeposit = async (id, balance) => {
    const customerDoc = doc(db, 'customers', id);
    const newAmount = { balance: balance + +amountDeposit };
    await updateDoc(customerDoc, newAmount);
  };

  return {
    customer,
    loading,
    updateAmount,
    updateAmountDeposit,
    amount,
    setAmount,
    amountDeposit,
    setAmountDeposit,
  };
};
