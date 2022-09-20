import toast from "react-hot-toast";
import { waitForTransaction } from "src/utils/starknet";
import { InvokeFunctionResponse, GetTransactionReceiptResponse, ProviderInterface } from "starknet";

import Toast from "./Toast";

type ToastPromiseOptions<D> = {
  pending?: () => JSX.Element | string | null;
  success?: (data: D) => JSX.Element | string | null;
  error?: (error: Error) => JSX.Element | string | null;
};

export const toastPromise = async <D,>(promise: Promise<D>, options?: ToastPromiseOptions<D>) => {
  const toastId = toast.custom(
    params => (
      <Toast {...params} type="pending">
        {options?.pending ? options?.pending() : "Your request is being processed"}
      </Toast>
    ),
    { duration: Infinity }
  );

  const closeToast = () => {
    toast.remove(toastId);
  };

  try {
    const promiseResult = await promise;

    toast.custom(
      params => (
        <Toast {...params} type="success" close={closeToast}>
          {options?.success ? options?.success(promiseResult) : "Your request successfully ended"}
        </Toast>
      ),
      { id: toastId, duration: 7500 }
    );
    return promiseResult;
  } catch (error) {
    console.error(error);
    toast.custom(
      params => (
        <Toast {...params} type="error" close={closeToast}>
          {options?.error
            ? options?.error(error as Error)
            : "An error occurred while processing your request. Please try again"}
        </Toast>
      ),
      { id: toastId, duration: 15000 }
    );
  }
};

export const toastTransaction = async (
  promise: Promise<InvokeFunctionResponse>,
  provider: ProviderInterface,
  options?: ToastPromiseOptions<GetTransactionReceiptResponse>
) => {
  const transactionPromise = async () => {
    const response = await promise;

    if (!response.transaction_hash) {
      throw new Error("Unable to start a transaction");
    }

    return await waitForTransaction(response.transaction_hash, provider);
  };

  return toastPromise(transactionPromise(), options);
};
