import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderCommand } from '../commands/update-order.command';
import { CreateOrderDto } from '../dto/create-order.dto';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  private orders: CreateOrderDto[] = [];

  async execute(command: UpdateOrderCommand): Promise<CreateOrderDto> {
    const index = this.orders.findIndex(order => order.id === command.id);
    if (index === -1) {
      throw new NotFoundException(`Orden con ID ${command.id} no encontrada`);
    }
    const updatedOrder = {
      ...this.orders[index],
      ...command.orderData,
      updatedAt: new Date(),
    };
    this.orders[index] = updatedOrder;
    return updatedOrder;
  }
} 