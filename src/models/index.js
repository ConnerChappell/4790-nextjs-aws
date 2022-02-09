// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TeamData } = initSchema(schema);

export {
  TeamData
};