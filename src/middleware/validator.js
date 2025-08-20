import * as yup from "yup";

export const eventFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Event title is required"),
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400")
    .required("Description is required"),
  location: yup
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400")
    .required("Location is required"),
  imageFile: yup.mixed().required("Image is required"),

  startDateTime: yup.date().required("Start date is required"),
  endDateTime: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDateTime"), "End date must be after start date"),
  category: yup.string().required("Category is required"),
  price: yup.string().when("isFree", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required("Price is required"),
  }),

  isFree: yup.boolean(),
  url: yup
    .string()
    .url("Must be a valid URL")
    .required("Event URL is required"),
});
