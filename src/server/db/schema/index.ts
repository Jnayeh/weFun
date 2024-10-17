import * as activities from "./activities";
import * as post from "./post";

/***
  * @description
  * This is the schema for the database.
  * It is a combination of all the tables in the database.
  *
  * @example
  * import { schema } from "@/server/db/schema";
  *
  * const { activities, post } = schema;
  *
  * @see
  * [Schema](https://drizzle-orm.github.io/docs/schema)
  */

const schema = { ...activities, ...post };
export default schema;