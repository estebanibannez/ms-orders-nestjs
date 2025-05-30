import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderHandler } from './create-order.handler';
import { CreateOrderCommand } from '../commands/create-order.command';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('CreateOrderHandler', () => {
  let handler: CreateOrderHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrderHandler],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should create an order successfully', async () => {
    const createOrderDto: CreateOrderDto = {
      customerId: '123',
      products: [
        {
          productId: '456',
          quantity: 2,
          price: 29.99
        }
      ],
      status: 'PENDING'
    };

    const command = new CreateOrderCommand(createOrderDto);
    const result = await handler.execute(command);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.customerId).toBe(createOrderDto.customerId);
    expect(result.products).toEqual(createOrderDto.products);
    expect(result.status).toBe(createOrderDto.status);
    expect(result.createdAt).toBeDefined();
  });
}); 