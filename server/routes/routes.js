import express from 'express'

import { getUser, signin, signup, signinGoogle, signupGoogle } from '../controllers/users.js'
// import { createImage, searchImageByKeyword, favouriteImg, getImageById, followImgAuthor, makePrivate } from '../controllers/clients/image.js';
// import { getAllRoles } from '../controllers/clients/role.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router()

router.get('/users/', authMiddleware, getUser)
router.post('/users/signin', signin)
router.post('/users/signup', signup)
router.post('/users/signin_google', signinGoogle);
router.post('/users/signup_google', signupGoogle);
// router.post('/users/forgot', forgotPassword);
// router.post('/users/reset', resetPassword);

export default router