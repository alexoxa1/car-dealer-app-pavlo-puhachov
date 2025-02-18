"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

export default function Home() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
        );
        const data = await response.json();
        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching vehicle makes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMakes();
  }, []);

  const isNextDisabled = !selectedMake || !selectedYear;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Car Dealer
        </h1>

        <div className="space-y-12">
          <div>
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Vehicle Make
            </label>
            <select
              id="make"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a make</option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Select Model Year
            </label>
            <select
              id="year"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <Link
              href={
                isNextDisabled ? "#" : `/result/${selectedMake}/${selectedYear}`
              }
              className={`w-full text-center py-3 px-4 rounded-md ${
                isNextDisabled
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              }`}
              onClick={(e) => isNextDisabled && e.preventDefault()}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
