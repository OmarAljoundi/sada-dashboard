"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return <></>;
}
