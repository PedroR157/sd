// src/pokemons/pokemons.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { MoveInsert } from 'src/models/pokemons.model';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async findAll() {
    return this.pokemonsService.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pokemonsService.findUnique(+id);
  }

  @Post()
  async create(@Body() data : MoveInsert) {
    return this.pokemonsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: MoveInsert) {
    return this.pokemonsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.pokemonsService.remove(+id);
  }
}
