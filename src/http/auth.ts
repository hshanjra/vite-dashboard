import api from "@/lib/api";
import {
  LoginSchema,
  LoginSchemaType,
  RegisterSchema,
  RegisterSchemaType,
} from "@/validators/auth-validator";

export const login = async (values: LoginSchemaType) => {
  // try {
  //   const { data } = await api.post("/auth/login", values);
  //   // TODO: set the cookie
  //   return data;
  // } catch (error: any) {
  //   // TODO: throw sentry error;

  //   if (error?.response?.status === 401) {
  //     throw new Error("Email or password is incorrect!");
  //   }

  //   if (error?.response?.status === 404) {
  //     throw new Error("Email or password is incorrect!");
  //   }

  //   return { data: null, error: error.message };
  // }

  // const { data, status } = await api.post("/auth/login", values);

  // // console.log(headers, status);

  // if (status === 404) {
  //   throw new Error("User does not exists");
  // }

  // if (status === 401) {
  //   throw new Error("Email or password is incorrect!");
  // }

  // return { accessToken: data.accessToken };

  const parsedValues = LoginSchema.parse(values);

  return await api.post("/auth/login", parsedValues);
};

export const register = async (values: RegisterSchemaType) => {
  // // TODO: implement register

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // console.log("Register values", values);

  // return { data: null, error: null };

  const parsedValues = RegisterSchema.parse(values);

  const registerValues = {
    firstName: parsedValues.firstName,
    lastName: parsedValues.lastName,
    email: parsedValues.email,
    password: parsedValues.password,
  };

  return await api.post("/auth/register", registerValues);
};
