const express = require('express');
const router = express.Router();
const {createUser} = require('../controller/user')
const {getOrganization} = require('../controller/organization')
// create user routes
router.param("orgId",getOrganization);
router.post('/create/user/:orgId',createUser);
module.exports = router;