import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetOrderQuery } from '../queries/get-order.query';
import { CreateOrderDto } from '../dto/create-order.dto';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  private orders: CreateOrderDto[] = [];

  async execute(query: GetOrderQuery): Promise<CreateOrderDto> {
    const order = this.orders.find(order => order.id === query.id);
    if (!order) {
      throw new NotFoundException(`Orden con ID ${query.id} no encontrada`);
    }
    return order;
  }
} 