import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID de la orden',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  id?: string;

  @ApiProperty({
    description: 'ID del cliente',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  customerId: string;

  @ApiProperty({
    description: 'Lista de productos en la orden',
    example: [
      {
        productId: '123',
        quantity: 2,
        price: 29.99
      }
    ]
  })
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;

  @ApiProperty({
    description: 'Estado de la orden',
    example: 'PENDING',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']
  })
  status: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-03-20T12:00:00Z',
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Fecha de actualización',
    example: '2024-03-20T12:00:00Z',
    required: false
  })
  updatedAt?: Date;
} 