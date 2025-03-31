import { useState } from "react";
import { IRestResponse, IRestResponseError } from "../interfaces";


export const useRequest = <T, U>(requestFn: (requestData?: U) => Promise<IRestResponse<T>>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<IRestResponseError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const sendRequest = async (requestData?: U) => {
    setLoading(true);
    setData(null);
    setError(null);
    setSuccess(false);
    try {
      const response = await requestFn(requestData);
      setData(response.data);
      setSuccess(true);
    } catch (error) {
      setError(error as IRestResponseError);
    }
  }

  return { data, error, loading, success, sendRequest };
}