"use client";
import { Card } from "@tremor/react";
import GenerateSoundView from "./views/GenerateSoundView";
import PriceChartDash from "@/components/PriceChart";
import { useEffect, useState } from "react";
import { dynamicPrice } from "@/components/dynamic-price";
import TTSPlay from "@/components/tts-play";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [coinData, setCoinData] = useState({});
  const [toplay, setToPlay] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      dynamicPrice("BTC,ETH,WLD,XRP").then((res) => {
        setCoinData(res);
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col p-24">
        {/* <GenerateSoundView /> */}

        <PriceChartDash priceData={coinData} />
      </main>
      <Toaster />
    </>
  );
}
