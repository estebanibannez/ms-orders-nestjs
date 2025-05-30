import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { CreateOrderDto } from '../dto/create-order.dto';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  private orders: CreateOrderDto[] = [];

  async execute(command: CreateOrderCommand): Promise<CreateOrderDto> {
    const order = {
      id: Date.now().toString(),
      ...command.orderData,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order;
  }
} 