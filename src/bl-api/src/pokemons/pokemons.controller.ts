// src/pokemons/pokemons.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './DTO/create-pokemon.dto';
import { UpdatePokemonDto } from './DTO/update-pokemon.dto';

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
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.create(createPokemonDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonsService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.pokemonsService.remove(+id);
  }
}
