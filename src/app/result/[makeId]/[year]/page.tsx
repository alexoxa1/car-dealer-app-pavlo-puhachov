import Link from "next/link";
import { Suspense } from "react";
import Loading from "../../../loading";

interface Vehicle {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

async function getVehicles(makeId: string, year: string): Promise<Vehicle[]> {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  const data = await res.json();
  return data.Results;
}

export async function generateStaticParams() {
  // This is a placeholder implementation since we can't predict all possible combinations
  // In a real app, you might want to limit this to popular makes/years
  return [];
}

function VehicleListLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 animate-pulse"
        >
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

async function VehicleList({ makeId, year }: { makeId: string; year: string }) {
  const vehicles = await getVehicles(makeId, year);

  if (!vehicles.length) {
    return (
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          No vehicles found for the selected criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.Model_ID}
          className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {vehicle.Model_Name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {vehicle.Make_Name}
          </p>
        </div>
      ))}
    </div>
  );
}

type PageProps = {
  params: Promise<{
    makeId: string;
    year: string;
  }>;
};

export default async function ResultPage({ params }: PageProps) {
  const { makeId, year } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Vehicles from {year}
            </h1>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Back to Search
            </Link>
          </div>

          <Suspense fallback={<VehicleListLoading />}>
            <VehicleList makeId={makeId} year={year} />
          </Suspense>
        </div>
      </main>
    </Suspense>
  );
}
