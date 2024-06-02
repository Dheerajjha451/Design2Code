const { Schema, models, model } = require("mongoose");

const TemplateSchema = new Schema({
  user: {
    type: Schema.Types.Mixed,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  css:{
    type: String
  },
  framework:{
    type: String
  },
  useCase:{
    type: String
  },
  deployedLink:{
    type: String
  },
  repositoryLink:{
    type: String
  },
  images: [
    {
      type: String
    }
  ]
})

export const Template = models.Template || model("Template", TemplateSchema);