import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import useYearRange from "../utils/useYearRange";

const useFetchMemebrs = ({ years }) => {
  const { communityId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createdAtStart, createdAtEnd] = useYearRange();

  useEffect(() => {
    setLoading(true);
    const fetchUsersWithinYear = async () => {
      try {
        const querySnapshot = await db
          .collection("users")
          .where("created_at", ">=", createdAtStart)
          .where("created_at", "<=", createdAtEnd)
          .get();
      } catch (err) {}
    };

    fetchUsersWithinYear();
  }, []);

  return { members, loading, error };
};
