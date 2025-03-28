import { CreateUserRequest } from "@/services/users";
import { SchemaRegister } from "./schema";

export const sanitizeToRequest = (data: SchemaRegister): CreateUserRequest => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
  };
};
