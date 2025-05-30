import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderHandler } from './get-order.handler';
import { GetOrderQuery } from '../queries/get-order.query';
import { CreateOrderDto } from '../dto/create-order.dto';
import { NotFoundException } from '@nestjs/common';

describe('GetOrderHandler', () => {
  let handler: GetOrderHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrderHandler],
    }).compile();

    handler = module.get<GetOrderHandler>(GetOrderHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should throw NotFoundException when order does not exist', async () => {
    const query = new GetOrderQuery('non-existent-id');
    
    await expect(handler.execute(query)).rejects.toThrow(NotFoundException);
  });

  it('should return an order when it exists', async () => {
    const mockOrder: CreateOrderDto = {
      id: '1',
      customerId: '123',
      products: [{ productId: '456', quantity: 1, price: 29.99 }],
      status: 'PENDING',
      createdAt: new Date()
    };

    // @ts-ignore - Accediendo a la propiedad privada para pruebas
    handler['orders'] = [mockOrder];

    const query = new GetOrderQuery('1');
    const result = await handler.execute(query);

    expect(result).toBeDefined();
    expect(result).toEqual(mockOrder);
  });
}); 