import {Document, Schema, model} from 'mongoose';

interface ProductInterface extends Document {
  name: string,
  description: string,
  fabricationDate: string,
  expirationDate: string,
  batchNumber: string,
  ingredients: string[],
  //nutritionalInfo: [{energy: number, proteins: number, carbs: number, fats: number}],
  weight: number,
  price: number,
  stock: number
}

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  fabricationDate: {
    type: Date,
    required: true,
  },
  
  expirationDate: {
    type: Date,
    required: true,
  },

  batchNumber: {
    type: String,
    required: true,
    trim: true,

    validate: (value: string) => {
      if (!value.match(/^[a-z0-9]+$/i)) {
          throw new Error('batch number must be alphanumeric');
        }
    }
  },

  ingredients: {
    type: [String],
    required: true,
  },

  //nutritionalInfo: {
  //  type: [{energy: Number, proteins: Number, carbs: Number, fats: Number}]
  //},
  
  weight: {
    type: Number,
    required: true,
    min: 0,
    validate : {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
    }
  },
  
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  
  stock: {
    type: Number,
    required: true,
    min: 0,
    validate : {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
    }
  },
});

export const Product = model<ProductInterface>('Product', ProductSchema);
