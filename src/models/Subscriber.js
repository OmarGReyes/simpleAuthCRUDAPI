const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subscriberSchema = new Schema(
  {
    SystemId: String,
    Area: String,
    PublicId: Number,
    CountryCode: String,
    CountryName: String,
    Name: String,
    Email: String,
    JobTitle: String,
    PhoneNumber: String,
    PhoneCode: String,
    PhoneCodeAndNumber: String,
    LastActivityUtc: String,
    LastActivity: String,
    SubscriptionDate: String,
    SubscriptionMethod: Number,
    SubscriptionState: Number,
    SubscriptionStateDescription: String,
    Topics: [String],
    Activity: String,
    ConnectionState: Number,
    Id: Number,
  },
  {
    timestamps: String,
  }
);
subscriberSchema.plugin(mongoosePaginate);

module.exports = model("Subscriber", subscriberSchema, "subscriber");
