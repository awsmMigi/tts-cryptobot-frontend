"use client";
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  AreaChart,
} from "@tremor/react";
import { Suspense, useEffect, useState } from "react";
import { set } from "react-hook-form";
import TTSPlay from "./tts-play";
import { toast } from "sonner";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const coinData = [
  {
    date: "Aug 01",
    BTC: 2100.2,
    ETH: 4434.1,
    WLD: 7943.2,
    XRP: 7943.2,
  },
  {
    date: "Aug 02",
    BTC: 2943.0,
    ETH: 4954.1,
    WLD: 8954.1,
    XRP: 8954.1,
  },
  {
    date: "Aug 03",
    BTC: 4889.5,
    ETH: 6100.2,
    WLD: 9123.7,
    XRP: 9123.7,
  },
  {
    date: "Aug 04",
    BTC: 3909.8,
    ETH: 4909.7,
    WLD: 7478.4,
    XRP: 7478.4,
  },
  {
    date: "Aug 05",
    BTC: 5778.7,
    ETH: 7103.1,
    WLD: 9504.3,
    XRP: 9504.3,
  },
  {
    date: "Aug 06",
    BTC: 5900.9,
    ETH: 7534.3,
    WLD: 9943.4,
    XRP: 9943.4,
  },
  {
    date: "Aug 07",
    BTC: 4129.4,
    ETH: 7412.1,
    WLD: 10112.2,
    XRP: 10112.2,
  },
  {
    date: "Aug 08",
    BTC: 6021.2,
    ETH: 7834.4,
    WLD: 10290.2,
    XRP: 10290.2,
  },
  {
    date: "Aug 09",
    BTC: 6279.8,
    ETH: 8159.1,
    WLD: 10349.6,
    XRP: 10349.6,
  },
  {
    date: "Aug 10",
    BTC: 6224.5,
    ETH: 8260.6,
    WLD: 10415.4,
    XRP: 10415.4,
  },
];
const valueFormatter = (number: any) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function PriceChartDash(priceData: { [key: string]: any }) {
  const [btcPlay, setBtcPlay] = useState(false);
  const [playInterval, setPlayInterval] = useState(false);
  const [fetchedData, setFetchedData] = useState(priceData);
  useEffect(() => {
    const rawdata = JSON.stringify(priceData);
    const finalData = JSON.parse(rawdata);
    setFetchedData(finalData);
  }, [priceData]);

  useEffect(() => {
    console.log(fetchedData.priceData, "fetchedData");
  }, [fetchedData]);

  useEffect(() => {
    if (Object.keys(fetchedData).length === 0) return;

    function playAlert() {
      if (btcPlay === true) {
        setBtcPlay(false);
      }

      if (fetchedData.priceData?.BTC?.price > 60000) {
        toast("BTC price is above high threshold!");
        if (btcPlay === false) {
          setBtcPlay(true);
        }
      }
      if (fetchedData.priceData?.BTC?.price < 50000) {
        toast("BTC price is below low threshold!");
      }
      if (fetchedData.priceData?.ETH?.price > 4000) {
        toast("ETH price is above high threshold!");
      }
      if (fetchedData.priceData?.ETH?.price < 2500) {
        toast("ETH price is below low threshold!");
      }
      if (fetchedData.priceData?.WLD?.price > 10) {
        toast("WLD price is above high threshold!");
      }
      if (fetchedData.priceData?.WLD?.price < 5) {
        toast("WLD price is below low threshold!");
      }
      if (fetchedData.priceData?.XRP?.price > 1) {
        toast("XRP price is above high threshold!");
      }
      if (fetchedData.priceData?.XRP?.price < 0.5) {
        toast("XRP price is below low threshold!");
      }
    }
    playAlert();
  }, [fetchedData]);

  useEffect(() => {
    if (playInterval === true) {
      setPlayInterval(false);
    }
    const interval = setInterval(() => {
      setPlayInterval(true);
      console.log("announcing price");
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const coinPriceSummary = [
    {
      name: "BTC",
      bgColor: "bg-yellow-500",
      upperThreshold: "$70,000",
      lowerThreshold: "$50,000",
      currentPrice: `$${(fetchedData.priceData?.BTC?.price as number)?.toFixed(
        2
      )}`,
    },
    {
      name: "ETH",
      bgColor: "bg-indigo-500",
      upperThreshold: "$4,000",
      lowerThreshold: "$2,500",
      currentPrice: `$${(fetchedData.priceData?.ETH?.price as number)?.toFixed(
        2
      )}`,
    },
    {
      name: "WLD",
      bgColor: "bg-green-500",
      upperThreshold: "$10",
      lowerThreshold: "$5",
      currentPrice: `$${(fetchedData.priceData?.WLD?.price as number)?.toFixed(
        2
      )}`,
    },
    {
      name: "XRP",
      bgColor: "bg-blue-500",
      upperThreshold: "$1",
      lowerThreshold: "$0.5",
      currentPrice: `$${(fetchedData.priceData?.XRP?.price as number)?.toFixed(
        2
      )}`,
    },
  ];
  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        It&lsquo;s just an poc, so don&lsquo;t take it too seriously
      </h3>
      <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        POC-Crypto Price Bot
      </p>

      <AreaChart
        data={coinData}
        index="date"
        categories={["BTC", "ETH", "WLD", "XRP"]}
        colors={["red", "teal", "cyan", "blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={100}
        onValueChange={(value) => {
          console.log(value);
        }}
        className="mt-6 h-96 sm:block"
      />

      <Table className="mt-8">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Current Price
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Upper Threshold
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Lower Threshold
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinPriceSummary.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <div className="flex space-x-3">
                  <span
                    className={classNames(item.bgColor, "w-1 shrink-0 rounded")}
                    aria-hidden={true}
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-bold text-black">
                {item.currentPrice}
              </TableCell>
              <TableCell className="text-right">
                {item.upperThreshold}
              </TableCell>
              <TableCell className="text-right">
                {item.lowerThreshold}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {summary.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                <div className="flex space-x-3">
                  <span
                    className={classNames(item.bgColor, "w-1 shrink-0 rounded")}
                    aria-hidden={true}
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">{item.value}</TableCell>
              <TableCell className="text-right">{item.invested}</TableCell>
              <TableCell className="text-right">{item.cashflow}</TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500"
                  )}
                >
                  {item.gain}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500"
                  )}
                >
                  {item.realized}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500"
                  )}
                >
                  {item.dividends}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
      <TTSPlay
        toSpeech={`Alert!!! B.T.C price is above high threshold!`}
        play={btcPlay}
      />
      <TTSPlay
        toSpeech={`Crurrent price of B.T.C is ${fetchedData.priceData?.BTC?.price}. Current price of Ethereum is ${fetchedData.priceData?.ETH?.price}. Current price of Worldcoin is ${fetchedData.priceData?.WLD?.price}. Current price of Ripple is ${fetchedData.priceData?.XRP?.price}.`}
        play={playInterval}
      />
    </>
  );
}
