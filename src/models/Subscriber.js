const {Schema, model} = require('mongoose');


 const subscriberSchema = new Schema({
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
    Id: Number
     
 },{
     timestamps: String,
 });

 module.exports = model('Subscriber', subscriberSchema,'subscribers')