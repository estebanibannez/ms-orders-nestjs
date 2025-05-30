import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from '../queries/get-orders.query';
import { CreateOrderDto } from '../dto/create-order.dto';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  private orders: CreateOrderDto[] = [];

  async execute(): Promise<CreateOrderDto[]> {
    return this.orders;
  }
} 