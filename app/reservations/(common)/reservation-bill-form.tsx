"use client";

import { BaseResponse } from "@/base-response";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/components/ui/notification";
import { SelectInput } from "@/components/ui/select-input";
import { Separator } from "@/components/ui/separator";
import { PAYMENT_METHODS } from "@/constants";
import { ReservationBills } from "@/db_types";
import { http } from "@/service/httpService";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { FC } from "react";
import * as yup from "yup";
const ReservationBillForm: FC<{
  data?: ReservationBills[];
  reservation_id: number;
}> = ({ data, reservation_id }) => {
  const route = useRouter();
  const { error, success } = useNotification();

  const handleSubmitData = async (formData: ReservationBills) => {
    const response = (await http("reservation/bill").post(
      formData
    )) as BaseResponse<ReservationBills>;

    if (response.success) {
      resetForm();
      success("A new invoice has been added!");
      route.refresh();
    } else {
      error(`An error occured: ${response.message}`);
    }
  };

  const {
    submitForm,
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
    isValid,
    isSubmitting,
    errors,
    touched,
    resetForm,
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
          <h1 className="text-xl">Invoices </h1>
          <Separator className="my-4" />
          <div className="w-full grid grid-cols-8 gap-y-4 gap-x-8">
            <div className="flex gap-x-4 w-full items-end col-span-6">
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.bill_amount ?? ""}
                name="bill_amount"
                id="bill_amount"
                label="Invoice amount"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.bill_amount && errors.bill_amount}
              />
              <DatePicker
                include_label={true}
                field="bill_date"
                label="Issued at"
                id={"bill_date"}
                value={values.bill_date as unknown as Date}
                onChange={setFieldValue}
                error={touched.bill_date && errors.bill_date}
              />

              <SelectInput
                id={"payment_method"}
                name="payment_method"
                options={PAYMENT_METHODS.map((x) => x.value)}
                label={"Payment method"}
                placeholder="Select a payment method"
                error={touched.payment_method && errors.payment_method}
                value={values.payment_method ?? ""}
                disabled={isSubmitting}
                onValueChange={setFieldValue}
                field="payment_method"
              />
            </div>
            <div className="flex justify-between gap-x-8 col-span-2 items-end">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
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
                    accumulator + (currentItem?.bill_amount ?? 0),
                  0
                )}
                label="Total Invoices"
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
  bill_amount: yup.number().required("Field is required"),
  bill_date: yup.date().required("Field is required"),
  payment_method: yup.string().required("Field is required"),
});

export default ReservationBillForm;
