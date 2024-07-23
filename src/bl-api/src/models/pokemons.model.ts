import { z } from 'zod';

export const MovesSchema = z.object({
  move_id: z.number().optional(),
  move_name: z.string(),
  move_url: z.string()
});

export const MoveLearnMethodSchema = z.object({
  method_name: z.string(),
  method_url: z.string()
});

export const VersionGroupsSchema = z.object({
  group_name: z.string(),
  group_url: z.string()
});

export const MoveInfoInsertSchema = z.object({
  move: MovesSchema,
  move_learn_method: MoveLearnMethodSchema,
  version_group: VersionGroupsSchema,
  level_learned_at: z.string()
});

export type MoveInsert = z.infer<typeof MoveInfoInsertSchema>;

export const PokeMoveSchema = MoveInfoInsertSchema.extend({
  move_id: z.number(),
});

export type Move = z.infer<typeof PokeMoveSchema>;

