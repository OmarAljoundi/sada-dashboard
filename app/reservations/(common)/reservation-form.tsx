"use client";
import * as yup from "yup";
import { FC } from "react";
import { useFormik } from "formik";
import { useQuery } from "react-query";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { http } from "@/service/httpService";
import { BaseResponse } from "@/base-response";
import { useNotification } from "@/components/ui/notification";
import { SelectInput } from "@/components/ui/select-input";
import { supabaseClient } from "@/lib/supabaseClient";
import { Reservations } from "@/db_types";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateEditClient from "@/components/dialogs/create-edit-client";
import { COUNTRIES } from "@/constants";
import { useRouter } from "next/navigation";
import { SelectInputObject } from "@/components/ui/select-input-object";
import { cn, getProfit, getRemaining } from "@/lib/utils";

const ReservationForm: FC<{ data?: Reservations }> = ({ data }) => {
  const { error, success } = useNotification();
  const route = useRouter();
  const getClients = async () => {
    const { data: clients, error } = await supabaseClient
      .from("clients")
      .select("*");

    if (error) {
      throw new Error(error.details);
    }

    return clients;
  };

  const getUsers = async () => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("id,name");

    if (error) throw new Error(error.message);
    return data;
  };

  const { data: users } = useQuery("Users", async () => await getUsers(), {
    refetchInterval: false,
    onError(err) {
      error("There was an error getting the clients" + err);
    },
  });

  const { data: clinets, isLoading } = useQuery(
    "Clients",
    async () => await getClients(),
    {
      refetchInterval: false,
      onError(err) {
        error("There was an error getting the clients" + err);
      },
    }
  );

  const handleSubmitData = async (formData: Reservations) => {
    formData.client_id =
      clinets?.find((x) => x.name == String(formData.client_id))?.id ?? 1;
    const response = (await http("reservation").post(
      formData
    )) as BaseResponse<Reservations>;

    if (response.success) {
      if (formData.id) {
        success("Reservation has been updated");
      } else {
        success("Created successfully");
        route.replace(`/reservations/${response.result.id}`);
      }
    } else {
      error(`An error occured: ${response.message}`);
    }
  };

  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    handleBlur,
    isValid,
    isSubmitting,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: data ?? {},
    onSubmit: handleSubmitData,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    validationSchema: Schema,
  });

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="grid grid-cols-2  divide-x">
        <div className="pr-4">
          <h1 className="text-xl">Customer Information</h1>
          <Separator className="my-4" />
          <div className="w-full grid gap-y-4">
            <div className="flex gap-x-4 w-full">
              {values.id == undefined ? (
                <div className="flex w-full gap-8">
                  <div className="flex w-full gap-4 items-end">
                    <SelectInput
                      id={"client_id"}
                      name="client_id"
                      options={clinets?.map((i) => i.name!) ?? []}
                      label={"Client"}
                      className="w-full"
                      placeholder="Select a client"
                      error={touched.client_id && errors.client_id}
                      value={values.client_id ?? undefined}
                      disabled={isSubmitting || values.id != undefined}
                      onValueChange={setFieldValue}
                      field="client_id"
                    />

                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CreateEditClient mode="Add">
                            <Button size={"default"} variant={"outline"}>
                              <Plus />
                            </Button>
                          </CreateEditClient>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span className="text-black text-sm font-bold ">
                            Quickly add new client
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className=" w-1/3">
                    <SelectInput
                      id={"sold_by"}
                      include_label={true}
                      name="sold_by"
                      options={users?.map((i) => i.name!) ?? []}
                      label={"Sold by"}
                      placeholder="Select"
                      className="w-full"
                      value={values.sold_by ?? undefined}
                      disabled={isSubmitting}
                      onValueChange={setFieldValue}
                      field="sold_by"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 w-full gap-x-4">
                  <Input
                    div_className="grid gap-y-2 w-full relative"
                    disabled={true}
                    value={`${values.clients?.name} | ${values.clients?.phone_number} | ${values.clients?.currency?.symbol}  | ${values.clients?.type}`}
                    label="Client"
                    name="client_id"
                    id="client_id"
                  />
                  <Input
                    div_className="grid gap-y-2 w-full relative"
                    disabled={true}
                    value={`${values.sold_by} `}
                    label="Sold by"
                    name="sold_by"
                    id="sold_by"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-x-4">
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.number_of_adults ?? ""}
                label="Number of adults"
                name="number_of_adults"
                id="number_of_adults"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.number_of_adults && errors.number_of_adults}
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                name="number_of_kids"
                value={values.number_of_kids ?? ""}
                label="Number of kids"
                id="number_of_kids"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.number_of_kids && errors.number_of_kids}
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                name="notes"
                value={values.notes ?? ""}
                label="Notes"
                id="notes"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.notes && errors.notes}
              />
            </div>
          </div>
        </div>

        <div className="px-4">
          <h1 className="text-xl">Reservation Date & Destinations</h1>
          <Separator className="my-4" />
          <div className="w-full grid gap-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <DatePicker
                include_label={true}
                field="check_in"
                label="Check in"
                id={"check_in"}
                value={values.check_in as unknown as Date}
                onChange={setFieldValue}
                error={touched.check_in && errors.check_in}
              />
              <DatePicker
                include_label={true}
                label="Check out"
                id={"check_out"}
                field="check_out"
                value={values.check_out as unknown as Date}
                onChange={setFieldValue}
                error={touched.check_out && errors.check_out}
                disabled={(date) => {
                  if (values.check_in) {
                    return date <= (values?.check_in as unknown as Date);
                  }
                  return true;
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <MultiSelect
                field="countries"
                onChange={setFieldValue}
                options={COUNTRIES.map((x) => x.name)}
                value={values.countries || []}
                placeholder="Search destinations"
                error={touched.countries && errors.countries}
                label="Destinations"
              />
              <Input
                div_className="grid gap-y-2 w-full relative"
                disabled={isSubmitting}
                value={values.sales_price ?? ""}
                label="Sale Price"
                name="sales_price"
                id="sales_price"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sales_price && errors.sales_price}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4" />
      <div className="flex justify-between items-end pe-4">
        <Button className="" type="submit" disabled={isSubmitting || !isValid}>
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
          {values.id ? "Update Reservation" : "Create And Save"}
        </Button>
        <div className={cn(values.id ? "flex gap-x-4" : "hidden")}>
          <Input
            div_className="grid gap-y-2 w-fit relative"
            disabled={true}
            value={getProfit(values)}
            label="Total Profit"
            name="Total Profit"
            id="Total Profit"
          />
          <Input
            div_className="grid gap-y-2 w-fit relative"
            disabled={true}
            value={getRemaining(values)}
            label="Total Remaining"
            name="Total Remaining"
            id="Total Remaining"
          />
        </div>
      </div>
      <Separator className="my-4" />
    </form>
  );
};

const Schema = yup.object().shape({
  client_id: yup.string().required("Field is required"),
  number_of_adults: yup.number().required("Field is required"),
  number_of_kids: yup.number().required("Field is required"),
  check_in: yup
    .date()
    .required("Field is required")
    .test(
      "check-in-before-check-out",
      "Check-in date must be before check-out date",
      function (checkIn) {
        const checkOut = this.resolve(yup.ref("check_out")); // Get the value of check_out
        //@ts-ignore
        return checkIn < checkOut; // Return true if check-in is before check-out
      }
    ),
  check_out: yup
    .date()
    .required("Field is required")
    .test(
      "check-in-before-check-out",
      "Check-in date must be before check-out date",
      function (checkOut) {
        const checkIn = this.parent.check_in; // Get the value of check_in
        return checkIn < checkOut; // Return true if check-in is before check-out
      }
    ),
  countries: yup.array().required("Field is required"),
  sales_price: yup.number().required("Field is required"),
});

export default ReservationForm;
