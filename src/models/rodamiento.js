import mongoose from 'mongoose';
const { Schema,model,models, ObjectId } = mongoose;
const rodamientoSchema = new Schema({
  interior:{
    type:String,
    unique:true,
    trim:true,
    required:[true,"La medida interior es obligatoria"]
  },
  exterior:{
    type:String,
    trim:true,
    required:[true,"La medida exterior es obligatoria"]  
  },
  altura:{
    type:String,
    trim:true,
    required:[true,"La altura es obligatoria"]
  },
  marca:{
    type:String,
    trim:true,
    required:[true,"La marca del rodamiento exterior es obligatorio"]  
  },
  cantidad:{
    type:String,
    trim:true,
    required:[true,"La cantidad es obligatoria"]  
  },
},
{
    timestamps:true
}
);

export default models.Rodamiento || model('Rodamiento',rodamientoSchema);  