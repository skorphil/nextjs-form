// InstitutionHandlers
import { handleInstitutionDelete } from "./handleInstitutionDelete";
import { handleInstitutionCreate } from "./handleInstitutionCreate";
import { handleInstitutionRestore } from "./handleInstitutionRestore";

export const handleInstitution = {
  restore: handleInstitutionRestore,
  create: handleInstitutionCreate,
  delete: handleInstitutionDelete,
};
