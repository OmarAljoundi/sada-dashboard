import axios from "axios";

const onRequest = async <T>(
  endPoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data: any
): Promise<T> => {
  try {
    const response = await axios(`/api/${endPoint}`, {
      data: data,
      method,
    });

    if (response.status != 200) {
      throw new Error(`Request failed with status: ${status}`);
    }

    return response.data as Promise<T>;
  } catch (ex) {
    console.log(ex);
    throw new Error("Error while fetching data: " + ex);
  }
};

export function http<T>(endPoint: string) {
  return {
    post: (data: any = "") => onRequest<T>(endPoint, "POST", data),
    get: () => onRequest<T>(endPoint, "GET", undefined),
    delete: () => onRequest<T>(endPoint, "DELETE", undefined),
    update: (data: any = "") => onRequest<T>(endPoint, "PUT", data),
  };
}
