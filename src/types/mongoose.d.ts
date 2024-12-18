import * as mongoose from 'mongoose';

// Remove the export and export assignments
declare global {
  type MongooseDocument = mongoose.Document;
  type MongooseModel<T> = mongoose.Model<T>;
  type MongooseSchema<T> = mongoose.Schema<T>;
}