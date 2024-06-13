"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TwitchBot() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  let session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === "authenticated") {
          const response = await axios.post("/api/bot", { session });
          setData(response.data);
        }
      } catch (error: any) {
        setError("no session");
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  return (
    <div>
      <h2>Data from TwitchBot API:</h2>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
