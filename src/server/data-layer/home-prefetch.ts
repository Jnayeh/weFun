import {api} from "@/trpc/server";


  export const homePrefetch = () => {
   void api.post.getLatest.prefetch();
 }