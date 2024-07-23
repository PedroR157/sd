import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MoveInsert, Move, MoveInfoInsertSchema } from '../models/pokemons.model';

@Injectable()
export class PokemonsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findMany(): Promise<Move[]> {
    return this.prisma.move.findMany({
      include: {
        version_group_details: {
          include: {
            move_learn_method: true,
            version_group: true
          }
        }
      }
    });
  }

  async findUnique(move_id: number): Promise<Move> {
    const pokeData = await this.prisma.move.findUnique({
      where: { move_id },
      include: {
        version_group_details: {
          include: {
            move_learn_method: true,
            version_group: true
          }
        }
      }
    });

    if (!pokeData) {
      throw new NotFoundException(`Can't find move ID => ${move_id}`);
    }
    return pokeData;
  }

  async create(move: MoveInsert): Promise<Move> {
    const moveValidation = MoveInfoInsertSchema.parse(move);

    const moveLearnMethod = await this.prisma.moveLearnMethod.upsert({
      where: { method_name: moveValidation.move_learn_method.method_name },
      update: {},
      create: {
        method_name: moveValidation.move_learn_method.method_name,
        method_url: moveValidation.move_learn_method.method_url
      }
    });

    const versionGroup = await this.prisma.versionGroup.upsert({
      where: { group_name: moveValidation.version_group.group_name },
      update: {},
      create: {
        group_name: moveValidation.version_group.group_name,
        group_url: moveValidation.version_group.group_url
      }
    });

    return this.prisma.move.create({
      data: {
        move_name: moveValidation.move.move_name,
        move_url: moveValidation.move.move_url,
        version_group_details: {
          create: {
            level_learned_at: parseInt(moveValidation.level_learned_at, 10),
            move_learn_method: {
              connect: { method_id: moveLearnMethod.method_id }
            },
            version_group: {
              connect: { group_id: versionGroup.group_id }
            }
          }
        }
      },
      include: {
        version_group_details: {
          include: {
            move_learn_method: true,
            version_group: true
          }
        }
      }
    });
  }

  async update(move_id: number, move: MoveInsert): Promise<Move> {
    const moveValidation = MoveInfoInsertSchema.parse(move);

    const moveLearnMethod = await this.prisma.moveLearnMethod.upsert({
      where: { method_name: moveValidation.move_learn_method.method_name },
      update: { method_url: moveValidation.move_learn_method.method_url },
      create: {
        method_name: moveValidation.move_learn_method.method_name,
        method_url: moveValidation.move_learn_method.method_url
      }
    });

    const versionGroup = await this.prisma.versionGroup.upsert({
      where: { group_name: moveValidation.version_group.group_name },
      update: { group_url: moveValidation.version_group.group_url },
      create: {
        group_name: moveValidation.version_group.group_name,
        group_url: moveValidation.version_group.group_url
      }
    });

    const updatedMove = await this.prisma.move.update({
      where: { move_id },
      data: {
        move_name: moveValidation.move.move_name,
        move_url: moveValidation.move.move_url,
        version_group_details: {
          update: {
            data: {
              level_learned_at: parseInt(moveValidation.level_learned_at, 10),
              move_learn_method: {
                connect: { method_id: moveLearnMethod.method_id }
              },
              version_group: {
                connect: { group_id: versionGroup.group_id }
              }
            },
            where: {
              move_id_method_id_group_id: {
                move_id,
                method_id: moveLearnMethod.method_id,
                group_id: versionGroup.group_id
              }
            }
          }
        }
      },
      include: {
        version_group_details: {
          include: {
            move_learn_method: true,
            version_group: true
          }
        }
      }
    });

    if (!updatedMove) {
      throw new NotFoundException(`Move ID ${move_id} not found.`);
    }

    return updatedMove;
  }

  async remove(move_id: number): Promise<void> {
    await this.prisma.move.delete({
      where: { move_id },
    });
    console.log('Move was deleted successfully!');
  }
}
