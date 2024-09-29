import { db } from "./database/axios";
import { repository } from "./repositories";
import { companyServices } from "./use-cases";

export const organisations = {
  companyServices,
  repository,
  db,
};
