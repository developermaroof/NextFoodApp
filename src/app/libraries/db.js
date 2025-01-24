const { username, password } = process.env;
export const connectionStr =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.kvqvw.mongodb.net/FoodAppDB?retryWrites=true&w=majority&appName=Cluster0";
