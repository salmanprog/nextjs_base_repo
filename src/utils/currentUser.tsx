import { useEffect, useState, useRef } from "react";
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
  const hasFetchedRef = useRef(false);

  const { fetchApi } = useApi({
    url: "/api/currentuser",
    method: "GET",
    type: "manual",
    requiresAuth: true,
  });

  useEffect(() => {
    // Prevent multiple calls
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to call only once

  return { user, loadingUser, errorUser };
};
