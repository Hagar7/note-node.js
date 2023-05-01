import Joi from "joi";



export const validationAddNotes = {
    body:Joi.object().required().keys({
        name: Joi.string().required().messages({
            "any.required": "name is required"
        }),
        desc:Joi.string().required().messages({
            "any.required": "desc is required"
        })
    })
}

export const validationDeleteNote = {
    params:Joi.object().required().keys({
        noteId:Joi.string().required().min(24).messages({
            "any.required": "noteId is required",
            "string.min":"id must be 24 characters"
        })
    })
}
export const validationUpdateOne = {
    params:Joi.object().required().keys({
        noteId:Joi.string().required().messages({
            "any.required": "noteId is required",
            "string.min":"id must be 24 characters"
        })
    })
}
export const updatestatus = {
    body:Joi.object().required().keys({
        noteId:Joi.array().required().messages({
            "any.required": "noteId is required",
            "string.min":"id must be 24 characters"
        })
    })
}

export const validationUpdateInfo = {
    body:Joi.object().required().keys({
        name:Joi.string().required().messages({
            "any.required": "name is required"
        }),
        desc:Joi.string().required().messages({
            "any.required": "desc is required"
        })
    })
}