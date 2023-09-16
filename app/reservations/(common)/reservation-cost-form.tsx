"use client";

import { BaseResponse } from "@/base-response";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/components/ui/notification";
import { SelectInput } from "@/components/ui/select-input";
import { SelectWithSearch } from "@/components/ui/select-with-search";
import { Separator } from "@/components/ui/separator";
import { ReservationBills, ReservationCosts, Reservations } from "@/db_types";
import { supabaseClient } from "@/lib/supabaseClient";
import { http } from "@/service/httpService";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useQuery } from "react-query";
import * as yup from "yup";

const ReservationCostForm: FC<{
  data?: ReservationCosts[];
  reservation_id: number;
}> = ({ data, reservation_id }) => {
  const route = useRouter();
  const { error, success } = useNotification();

  const handleSubmitData = async (formData: ReservationCosts) => {
    const response = (await http("reservation/cost").post(
      formData
    )) as BaseResponse<ReservationCosts>;

    if (response.success) {
      success("A new cost has been added!");
      route.refresh();
      resetForm();
    } else {
      error(`An error occured: ${response.message}`);
    }
  };

  const getClients = async () => {
    const { data, error } = await supabaseClient
      .from("clients")
      .select("id,type,name,currency(id,symbol)")
      .eq("type", "Agency");

    if (error) throw new Error(error.message);

    return data ?? [];
  };

  const { data: clients } = useQuery(
    "Clients_agency",
    async () => await getClients(),
    {
      refetchInterval: false,
      onError(err) {
        error(err as string);
      },
    }
  );

  const {
    submitForm,
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
    resetForm,
    isValid,
    isSubmitting,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      reservation_id: reservation_id,
    },
    onSubmit: handleSubmitData,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema: Schema,
  });
  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="grid">
        <div className="pr-4">
          <h1 className="text-xl">Costs </h1>
          <Separator className="my-4" />
          <div className="w-full grid grid-cols-8 gap-y-4 gap-x-8">
            <div className="flex gap-x-4 w-full items-end col-span-6">
              <SelectWithSearch
                field="client_id"
                onChange={setFieldValue}
                options={clients?.map((x) => {
                  return {
                    label: `${x.name!} | ${x.currency?.symbol}`,
                    value: String(x.id!),
                  };
                })}
                value={String(values.client_id) ?? undefined}
                placeholder="Search agency"
                error={touched.client_id && errors.client_id}
                label="Agency"
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.invoice_number ?? ""}
                name="invoice_number"
                id="invoice_number"
                label="Invoice number"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.invoice_number && errors.invoice_number}
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.amount ?? ""}
                name="amount"
                id="amount"
                label={`Amount ${
                  values.client_id
                    ? "in " +
                      clients?.find((x) => x.id == values.client_id)?.currency
                        ?.symbol
                    : ""
                } `}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.amount && errors.amount}
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.amount_omr ?? ""}
                name="amount_omr"
                id="amount_omr"
                label="Amount OMR"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.amount_omr && errors.amount_omr}
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.notes ?? ""}
                name="notes"
                id="notes"
                label="Notes"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.notes && errors.notes}
              />
            </div>
            <div className="flex justify-between gap-x-8 col-span-2 items-end">
              <Button
                className="w-1/2 h-10"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                )}
                Add New
              </Button>
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={true}
                value={data?.reduce(
                  (accumulator, currentItem) =>
                    accumulator + (currentItem?.amount_omr ?? 0),
                  0
                )}
                label="Total Costs OMR"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4" />

      <Separator className="my-4" />
    </form>
  );
};

const Schema = yup.object().shape({
  invoice_number: yup.number().required("Field is required"),
  amount: yup.number().required("Field is required"),
  amount_omr: yup.number().required("Field is required"),
});

export default ReservationCostForm;
