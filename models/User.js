import Adapters from "next-auth/adapters";

export default class Customer extends Adapters.TypeORM.Models.User.model {
  constructor(name, email, image, emailVerified, phoneNumber) {
    super(name, email, image, emailVerified);
    phoneNumber = "505-888-7777";
    console.log(1, name);
    console.log(2, phoneNumber);
    if (phoneNumber) {
      this.phoneNumber = "505-888-7777";
    }
  }
}

export const UserSchema = {
  name: "User",
  target: Customer,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    // Adds a phoneNumber to the User schema
    phoneNumber: {
      type: "varchar",
      nullable: true,
      default: "505-888-7777",
    },
  },
};
