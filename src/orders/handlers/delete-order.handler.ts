import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteOrderCommand } from '../commands/delete-order.command';
import { CreateOrderDto } from '../dto/create-order.dto';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  private orders: CreateOrderDto[] = [];

  async execute(command: DeleteOrderCommand): Promise<CreateOrderDto> {
    const index = this.orders.findIndex(order => order.id === command.id);
    if (index === -1) {
      throw new NotFoundException(`Orden con ID ${command.id} no encontrada`);
    }
    const [removedOrder] = this.orders.splice(index, 1);
    return removedOrder;
  }
} 