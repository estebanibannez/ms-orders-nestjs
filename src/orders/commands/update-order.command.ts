import { CreateOrderDto } from '../dto/create-order.dto';

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly orderData: CreateOrderDto
  ) {}
} 