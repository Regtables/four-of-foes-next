import axios from "axios";

import { IndemnityType, MiniIndemnityClauseType } from "@/types";

export const signIndemnity = async (indemnityClauses: IndemnityType[], miniIndemnityClauses: MiniIndemnityClauseType[]) => {
  const response = await axios.post('/api/portal/indemnity', { indemnityClauses, miniIndemnityClauses }, { withCredentials: true });
  return response;
};

export const revokeIndemnity = async () => {
  const response = await axios.delete('/api/portal/indemnity', { withCredentials: true });
  return response;
};