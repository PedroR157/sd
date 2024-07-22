import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';

@Module({
  providers: [PokemonsService],
  controllers: [PokemonsController]
})
export class PokemonsModule {}
