import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidAnswerException extends HttpException {
  constructor(optionId: number, questionId: number) {
    super(`Option with ID ${optionId} does not belong to Question with ID ${questionId}`, HttpStatus.BAD_REQUEST);
  }
}