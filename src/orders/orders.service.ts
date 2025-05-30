import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders: any[] = [];

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    const order = this.orders.find(order => order.id === id);
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return order;
  }

  create(createOrderDto: any) {
    const order = {
      id: Date.now().toString(),
      ...createOrderDto,
      createdAt: new Date(),
    };
    this.orders.push(order);
    return order;
  }

  update(id: string, updateOrderDto: any) {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    const updatedOrder = {
      ...this.orders[index],
      ...updateOrderDto,
      updatedAt: new Date(),
    };
    this.orders[index] = updatedOrder;
    return updatedOrder;
  }

  remove(id: string) {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    const [removedOrder] = this.orders.splice(index, 1);
    return removedOrder;
  }
} 