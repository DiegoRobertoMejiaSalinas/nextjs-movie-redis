import { getSearchMovies } from "@/lib/searchMovies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query: any = req.query;

    const newMovies = await getSearchMovies({ ...query });

    return res.status(200).json(newMovies);
  } catch (e) {
    return res.status(500).json(e);
  }
}
