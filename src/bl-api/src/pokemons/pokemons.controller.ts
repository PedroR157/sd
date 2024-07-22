import { Controller, Get } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Get()
    async findAll() {
        return this.pokemonsService.findAll();
    }
}
 