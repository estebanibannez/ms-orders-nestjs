import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrdersController } from './orders.controller';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const mockOrders = [
        {
          id: '1',
          customerId: '123',
          products: [{ productId: '456', quantity: 1, price: 29.99 }],
          status: 'PENDING',
          createdAt: new Date()
        }
      ];

      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockOrders);

      const result = await controller.findAll();
      expect(result).toEqual(mockOrders);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const mockOrder = {
        id: '1',
        customerId: '123',
        products: [{ productId: '456', quantity: 1, price: 29.99 }],
        status: 'PENDING',
        createdAt: new Date()
      };

      jest.spyOn(queryBus, 'execute').mockResolvedValue(mockOrder);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockOrder);
      expect(queryBus.execute).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        customerId: '123',
        products: [{ productId: '456', quantity: 1, price: 29.99 }],
        status: 'PENDING'
      };

      const mockCreatedOrder = {
        id: '1',
        ...createOrderDto,
        createdAt: new Date()
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockCreatedOrder);

      const result = await controller.create(createOrderDto);
      expect(result).toEqual(mockCreatedOrder);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing order', async () => {
      const updateOrderDto: CreateOrderDto = {
        customerId: '123',
        products: [{ productId: '456', quantity: 2, price: 29.99 }],
        status: 'COMPLETED'
      };

      const mockUpdatedOrder = {
        id: '1',
        ...updateOrderDto,
        updatedAt: new Date()
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockUpdatedOrder);

      const result = await controller.update('1', updateOrderDto);
      expect(result).toEqual(mockUpdatedOrder);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const mockDeletedOrder = {
        id: '1',
        customerId: '123',
        products: [{ productId: '456', quantity: 1, price: 29.99 }],
        status: 'PENDING',
        createdAt: new Date()
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(mockDeletedOrder);

      const result = await controller.remove('1');
      expect(result).toEqual(mockDeletedOrder);
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });
}); 