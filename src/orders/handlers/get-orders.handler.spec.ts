import { Test, TestingModule } from '@nestjs/testing';
import { GetOrdersHandler } from './get-orders.handler';
import { GetOrdersQuery } from '../queries/get-orders.query';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('GetOrdersHandler', () => {
  let handler: GetOrdersHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersHandler],
    }).compile();

    handler = module.get<GetOrdersHandler>(GetOrdersHandler);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should return an empty array when no orders exist', async () => {
    const result = await handler.execute();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('should return all orders', async () => {
    // Agregar algunas órdenes de prueba
    const mockOrders: CreateOrderDto[] = [
      {
        id: '1',
        customerId: '123',
        products: [{ productId: '456', quantity: 1, price: 29.99 }],
        status: 'PENDING',
        createdAt: new Date()
      },
      {
        id: '2',
        customerId: '124',
        products: [{ productId: '457', quantity: 2, price: 39.99 }],
        status: 'COMPLETED',
        createdAt: new Date()
      }
    ];

    // @ts-ignore - Accediendo a la propiedad privada para pruebas
    handler['orders'] = mockOrders;

    const result = await handler.execute();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result).toEqual(mockOrders);
  });
}); 