import useMutationPost from '@/base/hooks/useMutationPost';
import { queryKeys } from '../configs/queryKeys';

export const useUserMutation = () => {
  const mCreate = useMutationPost({
    queryKey: [queryKeys.createUser],
    endPoint: '/auth/register',
    options: {
      onSuccess: (data: any, variables: any, context: any) => {},
      onError: (error: any, variables: any, context: any) => {}
    }
  });

  // const mCheckId = useMutationPost({
  //   queryKey: [queryKeys.checkUserId],
  //   endPoint: '/auth/check-id',
  //   options: {
  //     onSuccess: (data: any, variables: any, context: any) => {},
  //     onError: (error: any, variables: any, context: any) => {}
  //   }
  // });

  //   const mCheckMobilePhone = useMutationPost({
  //   queryKey: [queryKeys.checkMobilePhone],
  //   endPoint: '/auth/check-mobilephone',
  //   options: {
  //     onSuccess: (data: any, variables: any, context: any) => {},
  //     onError: (error: any, variables: any, context: any) => {}
  //   }
  // });

  return {
    mCreate,
  };
};
