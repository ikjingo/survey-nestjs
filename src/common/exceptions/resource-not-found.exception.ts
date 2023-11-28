import { NotFoundException } from '@nestjs/common'

export class ResourceNotFoundException extends NotFoundException {
  constructor(resource: string, id: any) {
    super(`${resource} with ID ${id} not found`)
  }
}