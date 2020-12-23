const paging = require('../../helpers/pagination')
const responseStandard = require('../../helpers/response')
const joi = require('joi')
const rolesModel = require('../../models/rolesModel')

module.exports = {
  read: async (req, res) => {
    const count = await rolesModel.countRoles()
    const page = paging(req, count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo
    const results = await rolesModel.readRoles([limit, offset])
    return responseStandard(res, 'List of Roles', { results, pageInfo })
  },
  create: async (req, res) => {
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const data = await rolesModel.createRoles(results)
      if (data.affectedRows) {
        results = {
          id: data.insertId,
          ...results
        }
        return responseStandard(res, 'Create Roles Successfully', { results }, 200, true)
      } else {
        return responseStandard(res, 'Failed to create Roles', {}, 401, false)
      }
    }
  },
  updateRoles: async (req, res) => {
    let { id } = req.params
    const uid = id
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required()
    })

    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, description } = results
      id = Number(id)
      const update = await rolesModel.updateRoles({ name, description }, uid)
      // console.log(results)
      if (update.affectedRows) {
        return responseStandard(res, 'Roles Has been Updated', {})
      } else {
        return responseStandard(res, 'Roles Not found', {}, 401, false)
      }
    }
  },
  updateRolesPartial: async (req, res) => {
    let { id } = req.params
    id = Number(id)
    const schema = joi.object({
      name: joi.string(),
      description: joi.string()
    })
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, description } = results
      id = Number(id)
      if (name || description) {
        const update = await rolesModel.updateRolesPartial(results, id)
        // console.log(update)
        // console.log(results)
        if (update.affectedRows) {
          return responseStandard(res, 'Roles Has been Updated', {})
        } else {
          return responseStandard(res, 'Roles Not found', {}, 401, false)
        }
      } else {
        return responseStandard(res, 'At least fill one column!', '', 400, false)
      }
    }
  },
  getRolesId: async (req, res) => {
    const { id } = req.params
    const data = await rolesModel.getRolesByCondition({ id })
    if (data.length > 0) {
      return responseStandard(res, `Roles with Id ${id}`, { data })
    } else {
      return responseStandard(res, 'Roles Not found', {}, 401, false)
    }
  },
  deleteRoles: async (req, res) => {
    const { id } = req.params
    const uid = Number(id)
    // console.log(uid)
    const data = await rolesModel.deleteRoles({ id: uid })
    if (data.affectedRows) {
      return responseStandard(res, 'Roles Has been deleted', {})
    } else {
      return responseStandard(res, 'Roles Not found', {}, 401, false)
    }
  }
}
