import { useEffect, useState } from "react";
import useApi, { ApiResponse } from "@/utils/useApi";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const { fetchApi } = useApi({
    url: "/api/currentuser",
    method: "GET",
    type: "manual",
    requiresAuth: true,
  });

  useEffect(() => {
    let isMounted = true; // avoid state update if unmounted

    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const res: any = await fetchApi(); // get raw response

        if (res?.code === 200 && res?.data) {
          if (isMounted) setUser(res.data);
        } else {
          if (isMounted) setErrorUser(res?.message || "Failed to fetch user");
        }
      } catch (err: any) {
        if (isMounted) setErrorUser(err?.message || "Server error");
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [fetchApi]);

  return { user, loadingUser, errorUser };
};
