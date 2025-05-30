import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from '@/orders/orders.controller';
import { CreateOrderHandler } from './handlers/create-order.handler';
import { UpdateOrderHandler } from './handlers/update-order.handler';
import { DeleteOrderHandler } from './handlers/delete-order.handler';
import { GetOrdersHandler } from './handlers/get-orders.handler';
import { GetOrderHandler } from './handlers/get-order.handler';

const CommandHandlers = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
];

const QueryHandlers = [
  GetOrdersHandler,
  GetOrderHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class OrdersModule {} 