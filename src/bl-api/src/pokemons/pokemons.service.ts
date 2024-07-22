import { Injectable } from '@nestjs/common';
// import { CreatePokemonDto } from './DTO/create-pokemon.dto';
// import { UpdatePokemonDto } from './DTO/update-pokemon.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PokemonsService {
  private pokemons = [];

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findMany(): Promise<PokemonMove[]> {
    const nasaRecords = await this.prisma.nasa.findMany({
      include: {
        geolocation: true,
      },
    });
    return nasaRecords;
  }

  async findUnique(nasa_id: number): Promise<PokemonMove> {
    try {
      const nasaRecord = await this.prisma.nasa.findUnique({
        where: {
          nasa_id: nasa_id,
        },
        include: {
          geolocation: true,
        },
      });
      if (!nasaRecord) {
        throw new NotFoundException(`Nasa record with id ${nasa_id} not found`);
      }
      return nasaRecord;
    } catch (error) {
      throw new Error('Ocorreu um erro ao tentar encontrar o registro da NASA');
    }
  }

  async create(nasa: MoveInsert): Promise<Nasa> {
    try {
      // Convertendo o campo year para Date
      nasa.year = new Date(nasa.year);

      // Valida o input conforme o zod schema
      const validatedNasa = MoveInfoInsertSchema.parse(nasa);

      // Verificar ou criar a geolocalização
      const geolocation = await this.prisma.geolocation.create({
        data: {
          type: validatedNasa.geolocation.type,
          coordinates: validatedNasa.geolocation.coordinates,
        },
      });


      const newNasa = await this.prisma.nasa.create({
        data: {
          ...validatedNasa,
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

      return newNasa;
    } catch (error) {
      console.error('Erro ao inserir o registro da NASA:', error); // Log do erro detalhado
      throw new Error('Erro ao inserir o registro da NASA: ' + error.message);
    }
  }

  async update(nasa_id: number, nasa: MoveInsert): Promise<Nasa> {
    try {
      // Convertendo o campo year para Date
      nasa.year = new Date(nasa.year);

      const validatedNasa = MoveInfoInsertSchema.parse(nasa);

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

      const updatedNasa = await this.prisma.nasa.update({
        where: { nasa_id: nasa_id },
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
        throw new NotFoundException(`Nasa with ID ${nasa_id} not found.`);
      }

      return updatedNasa;
    } catch (error) {
      console.error('Erro ao atualizar o registro da NASA:', error); // Log do erro detalhado
      throw new Error('Erro ao atualizar o registro da NASA: ' + error.message);
    }
  }

  async remove(nasa_id: number): Promise<void> {
    try {
      await this.prisma.nasa.delete({
        where: {
          nasa_id: nasa_id,
        },
      });
      console.log('Registro da NASA apagado com sucesso');
    } catch (error) {
      console.error('Erro ao apagar o registro da NASA:', error); // Log do erro detalhado
      throw new Error('Erro ao apagar o registro da NASA: ' + JSON.stringify(error));
    }
  }
}
