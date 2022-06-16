import express  from "express";
import nodemailer from "nodemailer";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {


    //   prisma.feedback.create({
    //       data: {
    //           type: req.body.type,
    //           comment: req.body.comment,
    //           screenshot: req.body.screenshot,
    //         }
    //   })
  
    // Abaixo a forma desestruturada da função de inserção no BD comentada acima:
  
  
    const { type, comment, screenshot } = req.body;
  

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
      );

    await submitFeedbackUseCase.execute({
        type, 
        comment, 
        screenshot,
    })
 
    return res.status(201).send();
  });