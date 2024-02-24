import Link from "next/link";
import React from "react";
import { cachableGetActivities } from "~/server/actions/cachable-get-activities";

const ActivitiesPage: React.FC = async () => {
  const activities = await cachableGetActivities({ name: " " });

  return (
    <main className=" mx-auto flex w-fit flex-col items-center pt-10">
      <div className="flex p-5 justify-between gap-2">
        <h1 className=" text-pretty text-3xl font-bold">Activities</h1>
        <Link
          href="activities/activity-form"
          className="self-end rounded-lg bg-red-600 p-2 px-4 font-bold"
        >
          Add activity
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
          {activities.map((activity) => (
            <tr key={activity.id} className=" p-2">
              <td className=" min-w-12 p-2">{activity.id}</td>
              <td className=" w-36 p-2">{activity.label}</td>
              <td className=" w-80 p-2 line-clamp-2">{activity.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ActivitiesPage;
