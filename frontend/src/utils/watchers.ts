import { FormikProps } from "formik";
import { toast } from "react-toastify";
import localApi from "../services/localApi";
import { Address } from "../@types/redux/address";

export async function postalCodeWatcher(
  this: FormikProps<Address>,
  e: React.FocusEvent<HTMLInputElement>,
  error: string | undefined
) {
  try {
    if (error) return;
    const postalCode = e.target.value;

    const { data } = await localApi.get(`/location/${postalCode}`);

    for (const property in data) this.setFieldValue(property, data[property]);
  } catch (err) {
    toast.error(`Error on getting location: Cep not found.`);
    this.setErrors({ postal_code: "Invalid postal code" });
    this.resetForm();
  }
}
