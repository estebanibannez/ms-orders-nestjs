import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderCommand } from './commands/create-order.command';
import { UpdateOrderCommand } from './commands/update-order.command';
import { DeleteOrderCommand } from './commands/delete-order.command';
import { GetOrdersQuery } from './queries/get-orders.query';
import { GetOrderQuery } from './queries/get-order.query';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de órdenes obtenida exitosamente',
    type: [CreateOrderDto]
  })
  findAll() {
    return this.queryBus.execute(new GetOrdersQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden encontrada exitosamente',
    type: CreateOrderDto
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderQuery(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiResponse({ 
    status: 201, 
    description: 'Orden creada exitosamente',
    type: CreateOrderDto
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.commandBus.execute(new CreateOrderCommand(createOrderDto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden actualizada exitosamente',
    type: CreateOrderDto
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.commandBus.execute(new UpdateOrderCommand(id, updateOrderDto));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden eliminada exitosamente',
    type: CreateOrderDto
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteOrderCommand(id));
  }
} 