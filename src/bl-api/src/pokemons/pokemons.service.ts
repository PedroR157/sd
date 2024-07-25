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
        VersionGroupDetails: {
          include: {
            MoveLearnMethod: true,
            VersionGroup: true
          }
        }
      }
    });
  }

  async findUnique(move_id: number): Promise<Move> {
    const moveData = await this.prisma.move.findUnique({
      where: { move_id },
      include: {
        versionGroupDetails: {
          include: {
            moveLearnMethod: true,
            versionGroup: true
          }
        }
      }
    });

    if (!moveData) {
      throw new NotFoundException(`Can't find move ID => ${move_id}`);
    }
    return moveData;
  }

  async create(move: MoveInsert): Promise<Move> {
    const moveValidation = MoveInfoInsertSchema.parse(move);

    const moveLearnMethod = await this.prisma.moveLearnMethod.upsert({
      where: { mlm_name: moveValidation.move_learn_method.mlm_name },
      update: {},
      create: {
        mlm_name: moveValidation.move_learn_method.mlm_name,
        url: moveValidation.move_learn_method.url
      }
    });

    const versionGroup = await this.prisma.versionGroup.upsert({
      where: { vg_name: moveValidation.version_group.vg_name },
      update: {},
      create: {
        vg_name: moveValidation.version_group.vg_name,
        url: moveValidation.version_group.url
      }
    });

    return this.prisma.move.create({
      data: {
        move_name: moveValidation.move.move_name,
        url: moveValidation.move.url,
        versionGroupDetails: {
          create: {
            level_learned_at: moveValidation.level_learned_at,
            moveLearnMethod: {
              connect: { mlm_id: moveLearnMethod.mlm_id }
            },
            versionGroup: {
              connect: { vg_id: versionGroup.vg_id }
            }
          }
        }
      },
      include: {
        versionGroupDetails: {
          include: {
            moveLearnMethod: true,
            versionGroup: true
          }
        }
      }
    });
  }

  async update(move_id: number, move: MoveInsert): Promise<Move> {
    const moveValidation = MoveInfoInsertSchema.parse(move);

    const moveLearnMethod = await this.prisma.moveLearnMethod.upsert({
      where: { mlm_name: moveValidation.move_learn_method.mlm_name },
      update: { url: moveValidation.move_learn_method.url },
      create: {
        mlm_name: moveValidation.move_learn_method.mlm_name,
        url: moveValidation.move_learn_method.url
      }
    });

    const versionGroup = await this.prisma.versionGroup.upsert({
      where: { vg_name: moveValidation.version_group.vg_name },
      update: { url: moveValidation.version_group.url },
      create: {
        vg_name: moveValidation.version_group.vg_name,
        url: moveValidation.version_group.url
      }
    });

    const updatedMove = await this.prisma.move.update({
      where: { move_id },
      data: {
        move_name: moveValidation.move.move_name,
        url: moveValidation.move.url,
        versionGroupDetails: {
          update: {
            data: {
              level_learned_at: moveValidation.level_learned_at,
              moveLearnMethod: {
                connect: { mlm_id: moveLearnMethod.mlm_id }
              },
              versionGroup: {
                connect: { vg_id: versionGroup.vg_id }
              }
            },
            where: {
              vgd_id: move_id // Atualização baseada no id único de VersionGroupDetail
            }
          }
        }
      },
      include: {
        versionGroupDetails: {
          include: {
            moveLearnMethod: true,
            versionGroup: true
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
