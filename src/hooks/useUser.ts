import useSwr from 'swr';
import { useRef } from 'react';
export interface User {
  id: number;
  email: string;
  avatar: string;
  permissions: number;
}

interface UserHookResponse {
  user?: User;
  loading: boolean;
  error: string;
  revalidate: () => Promise<boolean>;
}

export const useUser = ({
  id,
  initialData,
}: { id?: number; initialData?: User } = {}): UserHookResponse => {
  const initialRef = useRef(initialData);
  const { data, error, revalidate } = useSwr<User>(
    id ? `/api/v1/user/${id}` : `/api/v1/auth/me`,
    {
      initialData: initialRef.current,
      refreshInterval: 30000,
      errorRetryInterval: 30000,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data,
    loading: !data && !error,
    error,
    revalidate,
  };
};