"use client";
import { useProgressStore, useLocationStore } from "~/store/location-form";
import "~/styles/activity-form.css";
import { Input } from "./ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { nextRevalidate } from "~/server/actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Image from "next/image";
const AddLocation = () => {
  return (
    <section>
      <form className="flex flex-col">
        <ProgressHeader />

        <div className="flex h-[60dvh] justify-around">
          <div
            className="mx-5 mt-8 flex max-h-max w-[80%] max-w-lg justify-center dark:text-white"
            role="main"
          >
            <Form />
          </div>
        </div>
        <ActivityButtons />
      </form>
    </section>
  );
};

function ProgressHeader() {
  const progress = useProgressStore((state) => state.progress);
  return (
    <>
      <div className="flex h-10v items-center justify-end bg-white px-5 dark:bg-slate-600">
        {/* <img src={WorldIcon} alt="world-icon" className="h-[28px]" /> */}
        <div className="min-h-10v flex scale-75 flex-row items-end justify-between gap-1 py-2 sm:scale-100 sm:items-center">
          <div
            className={`add_location_step ${
              progress == 1
                ? "border-r-4 border-primary pr-2 text-primary sm:border-none"
                : "text-secondary dark:text-white"
            } `}
          >
            <div
              className={`add_locaiton_step-number ${
                progress == 1 ? "step_selected" : "dark:bg-white"
              } `}
            >
              1
            </div>
            <span> Add Location </span>
          </div>
          <div
            className={`add_location_step ${
              progress == 2
                ? "border-r-4 border-primary pr-2 text-primary sm:border-none"
                : "text-secondary dark:text-white"
            } `}
          >
            <div
              className={`add_location_step-number ${
                progress == 2 ? "step_selected" : "dark:bg-white"
              } `}
            >
              2
            </div>
            <span> Add Activity to location </span>
          </div>
          <div
            className={`add_location_step ${
              progress == 3
                ? "border-r-4 border-primary pr-2 text-primary sm:border-none"
                : "text-secondary dark:text-white"
            } `}
          >
            <div
              className={`add_location_step-number ${
                progress == 3 ? "step_selected" : "dark:bg-white"
              } `}
            >
              3
            </div>
            <span> to be done </span>
          </div>
        </div>
      </div>
      <div className=" flex bg-white px-1 dark:bg-slate-600">
        {[1, 2, 3].map((item) => {
          return (
            <div
              key={item + Math.floor(Math.random() * 1000)}
              className={`w-1/3 rounded-md sm:h-[6px] ${
                item == progress ? "bg-red-700" : "bg-transparent"
              }`}
            ></div>
          );
        })}
      </div>
      <h1 className="w-[35%] min-w-[360px] self-center p-4 pt-12 text-center text-2xl font-bold text-secondary dark:text-primary">
        {progress == 3 ? "Add schedule" : "Add activity"}
      </h1>
    </>
  );
}

function ActivityButtons() {
  const progress = useProgressStore((state) => state.progress);
  const setProgress = useProgressStore((state) => state.setProgress);
  const router = useRouter();
  const addAct = api.location.create.useMutation({
    async onSuccess() {
      // refetches activities after a post is added
      nextRevalidate("getLocations");
      router.push("../locations");
    },
  });
  return (
    <div className=" flex w-[35%] min-w-[360px] justify-center gap-4 self-center p-2">
      <button
        className=" rounded-lg bg-white p-2 px-4 text-sm font-bold uppercase text-red-600 shadow-md hover:bg-gray-100 disabled:bg-slate-200 disabled:font-normal disabled:text-gray-400 disabled:shadow-none"
        onClick={(e) => {
          e.preventDefault();
          setProgress(progress - 1);
        }}
        disabled={progress == 1}
      >
        previous
      </button>
      {progress < 3 ? (
        <button
          className=" rounded-lg bg-red-600 p-2 px-6 text-sm font-bold uppercase text-white shadow-md hover:bg-red-700 disabled:bg-slate-200 disabled:font-normal disabled:text-gray-400 disabled:shadow-none"
          onClick={(e) => {
            e.preventDefault();
            setProgress(progress + 1);
          }}
        >
          save and continue
        </button>
      ) : (
        <button
          className=" rounded-lg bg-red-600 p-2 px-6 text-sm font-bold uppercase text-white shadow-md hover:bg-red-700 disabled:bg-slate-200 disabled:font-normal disabled:text-gray-400 disabled:shadow-none"
          onClick={(e) => {
            e.preventDefault();
            const form = useLocationStore.getState();
            const newAct = addAct.mutate({
              label: form.label,
              cover: form.cover,
              longitude: form.longitude ?? 0,
              latitude: form.latitude ?? 0,
              visible: 0,
            });
          }}
        >
          save
        </button>
      )}
    </div>
  );
}
function Form() {
  const progress = useProgressStore((state) => state.progress);
  return (
    <div className="custom-scroller flex w-full flex-col items-center gap-4 overflow-auto py-4">
      {progress == 1 && <AddLocationForm />}
      {progress == 2 && <>to be done</>}
      {progress == 3 && <>to be done</>}
    </div>
  );
}
// function SelectCategory() {
//   const { data: categories, isLoading } = api.category.getAll.useQuery(
//     undefined,
//     {
//       staleTime: 1000 * 60 * 60 * 2,
//     }
//   );
//   const catId = useLocationStore((state) => state.categoryId);
//   const setCategoryId = useLocationStore((state) => state.setCategoryId);

//   return (
//     <>
//       <Select
//         onValueChange={(value) => {
//           setCategoryId(Number(value));
//           console.log(value);
//         }}
//       >
//         <SelectTrigger className="w-[90%] max-w-sm rounded-xl border-2 border-transparent p-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500">
//           <SelectValue placeholder="Select a category" />
//         </SelectTrigger>
//         <SelectContent className=" rounded-xl ">
//           {isLoading && (
//             <SelectItem disabled value="disabled" className="rounded-lg ">
//               loading categories
//             </SelectItem>
//           )}
//           {categories &&
//             categories.map((cat) => {
//               return (
//                 <SelectItem
//                   key={cat.id}
//                   value={cat.id + ""}
//                   className="rounded-lg "
//                 >
//                   {cat.label}
//                 </SelectItem>
//               );
//             })}
//           {!isLoading && (!categories || categories.length == 0) && (
//             <SelectItem disabled value="disabled" className="rounded-lg ">
//               no categories
//             </SelectItem>
//           )}
//         </SelectContent>
//       </Select>
//       {catId && (
//         <Image
//           src={categories?.filter((cat) => cat.id == catId).pop()?.cover ?? ""}
//           alt=""
//           width={400}
//           height={400}
//           className=" mt-6 max-h-96 min-h-[200px] w-[90%] max-w-sm rounded-xl object-cover"
//         />
//       )}
//     </>
//   );
// }

 function AddLocationForm() {
//   const locations = [
//     { id: 1, label: "Tunis" },
//     { id: 2, label: "Sidi Bou" },
//     { id: 6, label: "Sousse" },
//     { id: 5, label: "Sfax" },
//     { id: 55, label: "Nabel" },
//     { id: 14, label: "Bizerte" },
//   ];


  const location = useLocationStore((state) => state);
  const setLabel = useLocationStore((state) => state.setLabel);
  // const setDescription = useLocationStore((state) => state.setDescription);
  const setLongitude = useLocationStore((state) => state.setLongitude);
  const setLatitude = useLocationStore((state) => state.setLatitude);
  const setCover = useLocationStore(
    (state) => state.setCover
  );

  return (
    <>
      <input
        type="text"
        name="label"
        defaultValue={location.label}
        onChange={(e) => setLabel(e.currentTarget.value)}
        placeholder="Label location"
        className="w-[90%] max-w-sm rounded-xl  border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
      />
      <textarea
        name="cover"
        defaultValue={location.cover}
        onChange={(e) => setCover(e.currentTarget.value)}
        placeholder="Cover location"
        className="min-h-[50px] w-[90%] max-w-sm resize-y rounded-xl border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
      />

      <label htmlFor="capacity" className="mx-auto w-[85%] max-w-sm">
       Location Latitude
      </label>
      <input
        type="number"
        name="Latitude"
        defaultValue={location.latitude}
        onChange={(e) => setLatitude(Number(e.currentTarget.value))}
        placeholder="location latitude"
        min={0}
        className="w-[90%] max-w-sm rounded-xl  border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
      />

<label htmlFor="capacity" className="mx-auto w-[85%] max-w-sm">
       Location longitude
      </label>
      <input
        type="number"
        name="longitude"
        defaultValue={location.longitude}
        onChange={(e) => setLongitude(Number(e.currentTarget.value))}
        placeholder="location longitude"
        min={0}
        className="w-[90%] max-w-sm rounded-xl  border-2 border-transparent py-2 pl-3 pr-2 shadow-md focus:border-primary focus:outline-none dark:bg-gray-500"
      />
      
    </>
  );
}
export default AddLocation;
