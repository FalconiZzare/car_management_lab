import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth.js";
import { getCars, getMakes, getModels } from "@/api/car.js";

export const useUserQuery = (id) => {
  const { isSuccess, isError, isLoading, data } = useQuery({
    queryKey: ["getUser", id],
    queryFn: () => getUser(id)
  });

  return { isSuccess, isError, isLoading, data };
};

export const useMakeQuery = () => {
  const { data: makeData, isLoading: makeDataLoading } = useQuery({
    queryKey: ["getMakes"],
    queryFn: () => getMakes()
  });

  return { makeData, makeDataLoading };
};

export const useModelQuery = (partMakeId) => {
  const {
    data: modelData,
    isLoading: modelDataLoading,
    refetch: refetchModels
  } = useQuery({
    queryKey: ["getModels"],
    queryFn: () => {
      if (partMakeId) {
        const formData = new FormData();
        formData.append("makeId", partMakeId);

        return getModels(formData);
      }
      return null;
    },
    enabled: false
  });

  return { modelData, modelDataLoading, refetchModels };
};

export const useCarsMutation = (make, model, search) => {
  const {
    data: carsData,
    isError: carsError,
    isPending: carsLoading,
    mutate: carsMutate
  } = useMutation({
    mutationKey: ["getCars"],
    mutationFn: () => {
      const formData = new FormData();
      if (make) formData.append("make", make);
      if (model) formData.append("model", model);
      if (search) formData.append("search", search);

      return getCars(formData);
    }
  });

  return { carsData, carsError, carsLoading, carsMutate };
};
