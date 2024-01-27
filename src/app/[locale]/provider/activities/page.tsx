import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";

const ActivitiesPage: React.FC = async () => {
  const activities = await api.activity.getAll.query({ name: " " });

  return (
    <main className=" mx-auto flex w-[80%] flex-col items-center pt-10">
      <h1 className=" text-pretty p-5 text-3xl font-bold">Activities</h1>
      <Link href="activities/activity-form" className="self-end p-2 px-4 font-bold bg-red-600 rounded-lg">
        Add activity
      </Link>
      <table className=" p-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className=" p-2">
              <td className=" p-2">{activity.id}</td>
              <td className=" p-2">{activity.label}</td>
              <td className=" p-2">{activity.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ActivitiesPage;
