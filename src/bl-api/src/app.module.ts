import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TeachersModule } from './teachers/teachers.module';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
  imports: [PokemonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

