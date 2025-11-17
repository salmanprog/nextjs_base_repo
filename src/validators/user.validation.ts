import * as yup from "yup";

export const storeUser = yup.object({
  name: yup.string().required("Name is required").min(2).max(20),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).max(100).required("Password is required"),
});

export const updateUser = yup.object({
  name: yup.string().min(2).max(20).optional(),
});

export const storeUserAddress = yup.object({
  addressLine1: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("postalCode is required"),
});

export const updateUserAddress = yup.object({
  addressLine1: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  postalCode: yup.string().required("postalCode is required"),
});

export const storeEventCategory = yup.object({
  name: yup.string().required("Category name is required"),
});

export const updateEventCategory = yup.object({
  name: yup.string().required("Category name is required"),
});

export const storeEvent = yup.object({
  name: yup.string().required("Event name is required"),
});

export const updateEvent = yup.object({
  name: yup.string().required("Event name is required"),
});