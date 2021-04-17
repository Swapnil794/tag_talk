const express = require('express');
const router = express.Router();
const {createOrganization,getOrganizationById,updateOrganization,deleteOrganization,getOrganization} = require('../controller/organization')
router.param("orgId",getOrganization);
//create organization
router.post('/organization/create',createOrganization);
//get organization by id
router.get('/get/organization/:orgId',getOrganizationById);
// update organization
router.put('/organization/update/:orgId',updateOrganization);
// delete organization
router.delete('/organization/delete/:orgId',deleteOrganization);
module.exports = router;