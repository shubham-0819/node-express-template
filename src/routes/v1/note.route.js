import express from 'express';
import {noteController}  from './../../controllers/index.js';
import {noteValidation} from './../../validations/index.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router
  .route('/')
  .post(
    validate(noteValidation.createNote),
    noteController.createNote
  )

  .get(
    validate(noteValidation.getNotes),
    noteController.getNotes
  );

router
  .route('/:noteId')
  .get(
    validate(noteValidation.getNote),
    noteController.getNote
  )

  .patch(
    validate(noteValidation.updateNote),
    noteController.updateNote
  )
  
  .delete(
    validate(noteValidation.deleteNote),
    noteController.deleteNote
  );

export default router;

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management and retrieval
 */

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *             example:
 *               title: Sample Note
 *               body: This is a sample note.
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /notes/{noteId}:
 *   get:
 *     summary: Get a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "404":
 *         description: Note not found
 *   patch:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *             example:
 *               title: Updated Note
 *               body: This is an updated note.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "404":
 *         description: Note not found
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       "204":
 *         description: No Content
 *       "404":
 *         description: Note not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         title: Sample Note
 *         body: This is a sample note.
 *         created_at: 2023-10-01T00:00:00.000Z
 *         updated_at: 2023-10-01T00:00:00.000Z
 */
