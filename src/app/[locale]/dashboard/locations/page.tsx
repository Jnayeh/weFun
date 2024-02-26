import Link from "next/link";
import React from "react";
import { cachableGetLocations } from "~/server/actions/cachable-get-locations";

const LocationsPage: React.FC = async () => {
  const locations = await cachableGetLocations({ name: " " });

  return (
    <main className=" mx-auto flex w-fit flex-col items-center pt-10">
      <div className="flex p-5 justify-between gap-2">
        <h1 className=" text-pretty text-3xl font-bold">Locations</h1>
        <Link
          href="locations/location-form"
          className="self-end rounded-lg bg-red-600 p-2 px-4 font-bold"
        >
          Add location
        </Link>
      </div>
      <table className=" w-4/5 p-2">
        <thead>
          <tr className=" [&>*]:p-2 [&>*]:text-start">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id} className=" p-2">
              <td className=" min-w-12 p-2">{location.id}</td>
              <td className=" w-36 p-2">{location.label}</td>
             {/* add description later      <td className=" w-80 p-2 line-clamp-2">{location.description}</td>   // */}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LocationsPage;
