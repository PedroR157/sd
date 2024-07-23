import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreatePokemonDto } from './DTO/create-pokemon.dto';
// import { UpdatePokemonDto } from './DTO/update-pokemon.dto';
import { PrismaService } from '../prisma.service';
import { MoveInsert, Move, MoveInfoInsertSchema } from '../models/pokemons.model'
import { Prisma } from '@prisma/client';

@Injectable()
export class PokemonsService {
  private pokemons = [];

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findMany(): Promise<Move[]> {
    const pokeDatas = await this.prisma.move.findMany({
      include: {
        move: true,
        move_learn_method: true,
        version_group: true
      },
    });
    return pokeDatas;
  }

  async findUnique(move_id: number): Promise<Move> {
    try {
      const pokeData = await this.prisma.move.findUnique({
        where: {
          move_id: move_id,
        },
        include: {
          move: true,
          move_learn_method: true,
          version_group: true
        },
      });
      if (!pokeData) {
        throw new NotFoundException(`Can't find move ID => ${move_id} `);
      }
      return pokeData;
    } catch (error) {
      throw new Error('An Error has occured trying to find Bulbassaur move');
    }
  }

  async create(move: MoveInsert): Promise<Move> {
    try {

      // Valida o input conforme o zod schema
      const moveValidation = MoveInfoInsertSchema.parse(move);

      // Verificar ou criar a geolocalização
      const createMove = await this.prisma.move.create({
        data: {
          move_id: moveValidation.move.move_id,
          move_name: moveValidation.move.move_name,
          move_url: moveValidation.move.move_url
        },
      });

       // Verificar ou criar a geolocalização
       const learn = await this.prisma.move_learn_method.create({
        data: {
          method_name: moveValidation.move_learn_method.method_name,
          method_url: moveValidation.move_learn_method.method_url
        },
      });
      
      const group = await this.prisma.version_group.create({
        data: {
          group_name: moveValidation.version_group.group_name,
          group_url: moveValidation.version_group.group_url
        },
      });


      const newMove = await this.prisma.move.create({
        data: {
          ...moveValidation,
          geolocation: {
            connect: {
              geo_id: geolocation.geo_id,
            },
          },
        } as Prisma.NasaCreateInput,
        include: {
          geolocation: true,
        },
      });

      return newMove;
    } catch (error) {
      console.error('Erro ao inserir o registro da NASA:', error); // Log do erro detalhado
      throw new Error('Erro ao inserir o registro da NASA: ' + error.message);
    }
  }

  async update(move_id: number, move: MoveInsert): Promise<Nasa> {
    try {
      // Convertendo o campo year para Date
      move.year = new Date(move.year);

      const validatedNasa = MoveInfoInsertSchema.parse(move);

      // Verificar ou criar a geolocalização
      const geolocation = await this.prisma.geolocation.update
      (
        {
          where: {
            geo_id: validatedNasa.geolocation.geo_id,
          },
          data: {
            type: validatedNasa.geolocation.type,
            coordinates: validatedNasa.geolocation.coordinates,
          },
        }
      );

      const updatedNasa = await this.prisma.move.update({
        where: { move_id: move_id },
        data: {
          ...validatedNasa,
          geolocation: {
            connect: {
              geo_id: geolocation.geo_id,
            },
          },
        } as Prisma.NasaUpdateInput,
        include: {
          geolocation: true,
        },
      });

      if (!updatedNasa) {
        throw new NotFoundException(`Move ID ${move_id} not found.`);
      }

      return updatedNasa;
    } catch (error) {
      console.error('Error updating the move:', error); // Log do erro detalhado
      throw new Error('Error updating the move: ' + error.message);
    }
  }

  async remove(move_id: number): Promise<void> {
    try {
      await this.prisma.move.delete({
        where: {
          move_id: move_id,
        },
      });
      console.log('Move was deleted succesfully!');
    } catch (error) {
      console.error('Error deleting the move:', error); // Log do erro detalhado
      throw new Error('Error deleting the move: ' + JSON.stringify(error));
    }
  }

}